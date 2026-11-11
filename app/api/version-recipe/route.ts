import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import mcData from "minecraft-data";

interface RecipeIngredient {
  id: string;
  name: string;
  texture: string;
}

interface ParsedCraftingRecipe {
  type: "crafting_table";
  grid: (RecipeIngredient | null)[];
  resultCount: number;
}

function resolveIngredient(raw: any, d: any): RecipeIngredient | null {
  if (raw === null || raw === undefined) return null;
  let id = raw;
  if (typeof raw === "object") {
    if (Array.isArray(raw)) id = raw[0];
    else if ("id" in raw) id = raw.id;
  }
  const itemOrBlock = d.items[id] || d.blocks[id];
  if (!itemOrBlock) return null;
  const name = itemOrBlock.name;
  const isItem = Boolean(d.items[id]);
  return {
    id: name,
    name: itemOrBlock.displayName || name,
    texture: `https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/${isItem ? "item/" : "block/"}${name}.png`,
  };
}

function parseRecipe(r: any, d: any): ParsedCraftingRecipe | null {
  if (!r) return null;
  const grid: (RecipeIngredient | null)[] = Array(9).fill(null);
  const resultCount = r.result?.count || 1;

  if (r.inShape && Array.isArray(r.inShape)) {
    const R = r.inShape.length;
    const C = Math.max(...r.inShape.map((row: any[]) => (Array.isArray(row) ? row.length : 0)));
    const rowOffset = R === 1 ? 1 : 0;
    const colOffset = C === 1 ? 1 : 0;

    for (let row = 0; row < R; row++) {
      const rowArr = r.inShape[row];
      if (Array.isArray(rowArr)) {
        for (let col = 0; col < rowArr.length; col++) {
          const raw = rowArr[col];
          if (raw !== null && raw !== undefined) {
            const ing = resolveIngredient(raw, d);
            const slotIndex = (row + rowOffset) * 3 + (col + colOffset);
            if (slotIndex >= 0 && slotIndex < 9) {
              grid[slotIndex] = ing;
            }
          }
        }
      }
    }
  } else if (r.ingredients && Array.isArray(r.ingredients)) {
    for (let i = 0; i < Math.min(r.ingredients.length, 9); i++) {
      grid[i] = resolveIngredient(r.ingredients[i], d);
    }
  }

  return {
    type: "crafting_table",
    grid,
    resultCount,
  };
}

// Map any platform/historical version ID to a valid mcData PC version with recipes
function normalizeVersionForRecipes(version: string): string {
  if (version === "1.21.11" || version === "bedrock_1.21" || version === "mcpe_1.21" || version.startsWith("1.21")) {
    return "1.21.1";
  }
  if (version === "bedrock_1.20" || version === "mcpe_1.20") {
    return "1.20.4";
  }
  if (version === "bedrock_1.19") {
    return "1.19.4";
  }
  if (version === "bedrock_1.18") {
    return "1.18.2";
  }
  if (version === "bedrock_1.16" || version === "mcpe_1.16") {
    return "1.16.5";
  }
  if (version === "mcpe_1.0" || version === "1.8.9") {
    return "1.8.8";
  }
  if (
    version === "mcpe_0.15" ||
    version === "mcpe_0.14" ||
    version.startsWith("beta_") ||
    version.startsWith("alpha_") ||
    version.startsWith("classic_") ||
    version === "1.7.10"
  ) {
    return "1.7.10";
  }
  return version;
}

// In-memory cache across requests
const RECIPES_CACHE: Record<string, Record<string, ParsedCraftingRecipe>> = {};

function getVersionRecipes(version: string): Record<string, ParsedCraftingRecipe> {
  const normVersion = normalizeVersionForRecipes(version);
  if (RECIPES_CACHE[normVersion]) {
    return RECIPES_CACHE[normVersion];
  }

  try {
    const d = mcData(normVersion);
    if (!d || !d.recipes) {
      RECIPES_CACHE[normVersion] = {};
      return {};
    }

    const versionRecipes: Record<string, ParsedCraftingRecipe> = {};
    for (const [recipeKey, recipesList] of Object.entries(d.recipes)) {
      const targetId = Number(recipeKey);
      const itemOrBlock = d.items[targetId] || d.blocks[targetId];
      if (itemOrBlock && Array.isArray(recipesList) && recipesList.length > 0) {
        const parsed = parseRecipe(recipesList[0], d);
        if (parsed) {
          versionRecipes[itemOrBlock.name] = parsed;
        }
      }
    }

    RECIPES_CACHE[normVersion] = versionRecipes;
    return versionRecipes;
  } catch (err) {
    console.error(`Error loading minecraft-data for version ${version} (norm: ${normVersion}):`, err);
    return {};
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get("v") || "1.21.1";
  const itemId = searchParams.get("item");

  const recipes = getVersionRecipes(version);

  if (itemId) {
    const recipe = recipes[itemId] || null;
    return NextResponse.json(
      { version, item: itemId, recipe },
      {
        headers: {
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      }
    );
  }

  return NextResponse.json(
    { version, recipeCount: Object.keys(recipes).length, recipes },
    {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
