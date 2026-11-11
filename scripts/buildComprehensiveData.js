// scripts/buildComprehensiveData.js
const fs = require('fs');
const path = require('path');
const mcData = require('minecraft-data')('1.20.1');

console.log('Building enhanced Minecraft database with rock-solid misode/mcmeta & official textures...');

const BASE_MCMETA_ITEM = 'https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item';
const BASE_MCMETA_BLOCK = 'https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block';

// Mob drop specifications
const KNOWN_MOB_DROPS = {
  warden: [
    { name: 'Sculk Catalyst', texture: `${BASE_MCMETA_BLOCK}/sculk_catalyst.png`, chance: '100%', amount: '1' },
    { name: 'Echo Shard', texture: `${BASE_MCMETA_ITEM}/echo_shard.png`, chance: 'Rare', amount: '1' },
    { name: 'Experience Orbs', texture: `${BASE_MCMETA_ITEM}/experience_bottle.png`, chance: '100%', amount: '5 XP' }
  ],
  ender_dragon: [
    { name: 'Dragon Egg', texture: `${BASE_MCMETA_BLOCK}/dragon_egg.png`, chance: '100%', amount: '1' },
    { name: 'Experience Orbs', texture: `${BASE_MCMETA_ITEM}/experience_bottle.png`, chance: '100%', amount: '12,000 XP' }
  ],
  wither: [
    { name: 'Nether Star', texture: `${BASE_MCMETA_ITEM}/nether_star.png`, chance: '100%', amount: '1' },
    { name: 'Wither Rose', texture: `${BASE_MCMETA_BLOCK}/wither_rose.png`, chance: 'On Mob Kill', amount: '1' }
  ],
  creeper: [
    { name: 'Gunpowder', texture: `${BASE_MCMETA_ITEM}/gunpowder.png`, chance: '100%', amount: '0-2' },
    { name: 'Music Disc', texture: `${BASE_MCMETA_ITEM}/music_disc_cat.png`, chance: 'Killed by Skeleton', amount: '1' },
    { name: 'Creeper Head', texture: `${BASE_MCMETA_ITEM}/creeper_head.png`, chance: 'Charged Creeper Kill', amount: '1' }
  ],
  zombie: [
    { name: 'Rotten Flesh', texture: `${BASE_MCMETA_ITEM}/rotten_flesh.png`, chance: '100%', amount: '0-2' },
    { name: 'Iron Ingot', texture: `${BASE_MCMETA_ITEM}/iron_ingot.png`, chance: '2.5%', amount: '1' },
    { name: 'Carrot', texture: `${BASE_MCMETA_ITEM}/carrot.png`, chance: '2.5%', amount: '1' },
    { name: 'Potato', texture: `${BASE_MCMETA_ITEM}/potato.png`, chance: '2.5%', amount: '1' }
  ],
  skeleton: [
    { name: 'Bone', texture: `${BASE_MCMETA_ITEM}/bone.png`, chance: '100%', amount: '0-2' },
    { name: 'Arrow', texture: `${BASE_MCMETA_ITEM}/arrow.png`, chance: '100%', amount: '0-2' },
    { name: 'Bow', texture: `${BASE_MCMETA_ITEM}/bow.png`, chance: '8.5%', amount: '1' }
  ],
  enderman: [
    { name: 'Ender Pearl', texture: `${BASE_MCMETA_ITEM}/ender_pearl.png`, chance: '50%', amount: '0-1' }
  ],
  blaze: [
    { name: 'Blaze Rod', texture: `${BASE_MCMETA_ITEM}/blaze_rod.png`, chance: '50%', amount: '0-1' },
    { name: 'Blaze Powder', texture: `${BASE_MCMETA_ITEM}/blaze_powder.png`, chance: 'Craftable', amount: '2' }
  ],
  drowned: [
    { name: 'Trident', texture: `${BASE_MCMETA_ITEM}/trident.png`, chance: '15% if holding', amount: '1' },
    { name: 'Nautilus Shell', texture: `${BASE_MCMETA_ITEM}/nautilus_shell.png`, chance: '8% if holding', amount: '1' },
    { name: 'Copper Ingot', texture: `${BASE_MCMETA_ITEM}/copper_ingot.png`, chance: '11%', amount: '1' }
  ],
  shulker: [
    { name: 'Shulker Shell', texture: `${BASE_MCMETA_ITEM}/shulker_shell.png`, chance: '50%', amount: '0-1' }
  ],
  evoker: [
    { name: 'Totem of Undying', texture: `${BASE_MCMETA_ITEM}/totem_of_undying.png`, chance: '100%', amount: '1' },
    { name: 'Emerald', texture: `${BASE_MCMETA_ITEM}/emerald.png`, chance: '100%', amount: '0-1' }
  ],
  ghast: [
    { name: 'Ghast Tear', texture: `${BASE_MCMETA_ITEM}/ghast_tear.png`, chance: '50%', amount: '0-1' },
    { name: 'Gunpowder', texture: `${BASE_MCMETA_ITEM}/gunpowder.png`, chance: '100%', amount: '0-2' }
  ],
  phantom: [
    { name: 'Phantom Membrane', texture: `${BASE_MCMETA_ITEM}/phantom_membrane.png`, chance: '70%', amount: '0-1' }
  ],
  witch: [
    { name: 'Glass Bottle', texture: `${BASE_MCMETA_ITEM}/glass_bottle.png`, chance: '12.5%', amount: '0-2' },
    { name: 'Glowstone Dust', texture: `${BASE_MCMETA_ITEM}/glowstone_dust.png`, chance: '12.5%', amount: '0-2' },
    { name: 'Gunpowder', texture: `${BASE_MCMETA_ITEM}/gunpowder.png`, chance: '12.5%', amount: '0-2' },
    { name: 'Redstone', texture: `${BASE_MCMETA_ITEM}/redstone.png`, chance: '12.5%', amount: '0-2' },
    { name: 'Sugar', texture: `${BASE_MCMETA_ITEM}/sugar.png`, chance: '12.5%', amount: '0-2' }
  ]
};

// Mob health registry
const MOB_HEALTH = {
  warden: 500,
  ender_dragon: 200,
  wither: 300,
  iron_golem: 100,
  ravager: 100,
  elder_guardian: 80,
  creeper: 20,
  zombie: 20,
  skeleton: 20,
  spider: 16,
  enderman: 40,
  blaze: 20,
  witch: 26,
  shulker: 30,
  drowned: 20,
  husk: 20,
  stray: 20,
  phantom: 20,
  piglin_brute: 50,
  piglin: 16,
  zombified_piglin: 20,
  ghast: 10,
  slime: 16,
  magma_cube: 16,
  cow: 10,
  sheep: 8,
  pig: 10,
  chicken: 4,
  horse: 30,
  wolf: 20,
  allay: 20,
  axolotl: 14,
  camel: 32,
  sniffer: 28
};

const MOB_HEAD_MAP = {
  zombie: `${BASE_MCMETA_ITEM}/zombie_head.png`,
  creeper: `${BASE_MCMETA_ITEM}/creeper_head.png`,
  skeleton: `${BASE_MCMETA_ITEM}/skeleton_skull.png`,
  wither_skeleton: `${BASE_MCMETA_ITEM}/wither_skeleton_skull.png`,
  ender_dragon: `${BASE_MCMETA_ITEM}/dragon_head.png`,
  piglin: `${BASE_MCMETA_ITEM}/piglin_head.png`,
};

function getMobTexture(cleanId) {
  if (MOB_HEAD_MAP[cleanId]) return MOB_HEAD_MAP[cleanId];
  return `${BASE_MCMETA_ITEM}/${cleanId}_spawn_egg.png`;
}

function determineThemeColor(name, cat) {
  if (name.includes('diamond')) return { theme: '#3fb8c0', glow: 'rgba(63, 184, 192, 0.4)', rarity: 'rare' };
  if (name.includes('netherite')) return { theme: '#433242', glow: 'rgba(153, 102, 204, 0.4)', rarity: 'legendary' };
  if (name.includes('gold')) return { theme: '#f5d442', glow: 'rgba(245, 212, 66, 0.4)', rarity: 'uncommon' };
  if (name.includes('emerald')) return { theme: '#17dd62', glow: 'rgba(23, 221, 98, 0.4)', rarity: 'rare' };
  if (name.includes('copper')) return { theme: '#e0734c', glow: 'rgba(224, 115, 76, 0.4)', rarity: 'common' };
  if (name.includes('redstone')) return { theme: '#cc0000', glow: 'rgba(204, 0, 0, 0.4)', rarity: 'common' };
  if (name.includes('beacon') || name.includes('star')) return { theme: '#a6ffec', glow: 'rgba(166, 255, 236, 0.5)', rarity: 'legendary' };
  if (name.includes('elytra') || name.includes('totem') || name.includes('trident')) return { theme: '#ffaa00', glow: 'rgba(255, 170, 0, 0.4)', rarity: 'epic' };
  if (cat === 'mobs') return { theme: '#ff5555', glow: 'rgba(255, 85, 85, 0.4)', rarity: 'rare' };
  if (cat === 'potions') return { theme: '#ff55ff', glow: 'rgba(255, 85, 255, 0.4)', rarity: 'uncommon' };
  if (cat === 'weapons_tools') return { theme: '#00ffff', glow: 'rgba(0, 255, 255, 0.3)', rarity: 'common' };
  return { theme: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)', rarity: 'common' };
}

function normalizeBlockTexture(cleanId) {
  let name = cleanId;
  if (name.startsWith('waxed_')) name = name.replace('waxed_', '');
  if (name.endsWith('_stairs')) name = name.replace('_stairs', '');
  if (name.endsWith('_slab')) name = name.replace('_slab', '');
  if (name.endsWith('_wall')) name = name.replace('_wall', '');
  if (name.startsWith('potted_')) name = name.replace('potted_', '');
  if (name === 'grass_block') return `${BASE_MCMETA_BLOCK}/grass_block_side.png`;
  if (name === 'furnace') return `${BASE_MCMETA_BLOCK}/furnace_front.png`;
  if (name === 'blast_furnace') return `${BASE_MCMETA_BLOCK}/blast_furnace_front.png`;
  if (name === 'smoker') return `${BASE_MCMETA_BLOCK}/smoker_front.png`;
  if (name === 'crafting_table') return `${BASE_MCMETA_BLOCK}/crafting_table_top.png`;
  return `${BASE_MCMETA_BLOCK}/${name}.png`;
}

function getItemTexture(cleanId, isBlock = false) {
  if (isBlock) return normalizeBlockTexture(cleanId);
  return `${BASE_MCMETA_ITEM}/${cleanId}.png`;
}

// 1. Process all items
const itemsList = [];
const seenIds = new Set();

// A. Mobs
const mobEntities = mcData.entitiesArray.filter(e =>
  ['Hostile mobs', 'Passive mobs'].includes(e.category) ||
  ['hostile', 'animal', 'mob', 'water_creature', 'ambient', 'passive'].includes(e.type)
);

mobEntities.forEach(mob => {
  const cleanId = mob.name;
  if (seenIds.has(cleanId)) return;
  seenIds.add(cleanId);

  const drops = KNOWN_MOB_DROPS[cleanId] || [
    { name: 'Experience Orbs', texture: `${BASE_MCMETA_ITEM}/experience_bottle.png`, chance: '100%', amount: '1-5 XP' }
  ];

  const hp = MOB_HEALTH[cleanId] || 20;
  const isHostile = mob.type === 'hostile' || mob.category === 'Hostile mobs';
  const mobTexture = getMobTexture(cleanId);

  itemsList.push({
    id: cleanId,
    name: mob.displayName,
    texture: mobTexture,
    category: 'mobs',
    rarity: isHostile ? (hp > 100 ? 'legendary' : 'rare') : 'common',
    isCraftable: false,
    description: `${mob.displayName} is an authentic Minecraft entity. Height: ${mob.height || 1.8}m, Width: ${mob.width || 0.6}m. Max Health: ${hp} HP (${Math.ceil(hp/2)} hearts).`,
    tags: ['mob', mob.type || 'entity', isHostile ? 'hostile' : 'passive'],
    themeColor: isHostile ? '#ff5555' : '#55ff55',
    glowColor: isHostile ? 'rgba(255, 85, 85, 0.4)' : 'rgba(85, 255, 85, 0.3)',
    stats: [
      { label: 'Health', value: `${hp} HP` },
      { label: 'Type', value: mob.type || 'Entity' },
      { label: 'Height', value: `${mob.height || 1.8}m` },
      { label: 'Width', value: `${mob.width || 0.6}m` }
    ],
    recipe: { type: 'uncraftable' },
    obtain: [
      {
        category: 'Spawn Condition',
        title: `Natural ${mob.displayName} Spawn`,
        location: isHostile ? 'Dark caves, night time surface, or specific biomes' : 'Overworld biomes',
        chance: 'Varies by light level',
        details: `${mob.displayName} spawns naturally in Minecraft when local generation and lighting criteria are met.`
      }
    ],
    mobDetails: {
      type: isHostile ? (hp >= 100 ? 'Boss' : 'Hostile') : 'Passive',
      health: hp,
      behavior: isHostile
        ? `Aggressively tracks and attacks players within sight. Deals damage and seeks closest target.`
        : `Peaceful wandering creature. Flees when attacked or follows players holding food.`,
      drops: drops
    }
  });
});

// B. Minecraft Items & Blocks
const allItems = mcData.itemsArray;

allItems.forEach(item => {
  const cleanId = item.name;
  if (seenIds.has(cleanId)) return;
  // Strict filter: REMOVE Air block entirely
  if (cleanId === 'air' || cleanId === 'cave_air' || cleanId === 'void_air' || item.displayName.toLowerCase() === 'air') return;
  seenIds.add(cleanId);

  const isBlock = !!mcData.blocksByName[cleanId];
  let category = 'materials';

  if (cleanId.includes('sword') || cleanId.includes('pickaxe') || cleanId.includes('axe') ||
      cleanId.includes('shovel') || cleanId.includes('hoe') || cleanId.includes('bow') ||
      cleanId.includes('crossbow') || cleanId.includes('trident') || cleanId.includes('shield') ||
      cleanId.includes('helmet') || cleanId.includes('chestplate') || cleanId.includes('leggings') ||
      cleanId.includes('boots')) {
    category = 'weapons_tools';
  } else if (cleanId.includes('potion') || cleanId.includes('bottle')) {
    category = 'potions';
  } else if (isBlock) {
    category = 'blocks';
  }

  // Check recipes
  const rawRecipes = mcData.recipes[item.id];
  let isCraftable = false;
  let craftingRecipe = { type: 'uncraftable' };

  if (rawRecipes && rawRecipes.length > 0) {
    const r = rawRecipes[0];
    isCraftable = true;

    const grid = [null, null, null, null, null, null, null, null, null];

    if (r.inShape) {
      for (let row = 0; row < r.inShape.length && row < 3; row++) {
        for (let col = 0; col < r.inShape[row].length && col < 3; col++) {
          const ingId = r.inShape[row][col];
          if (ingId !== null && ingId !== undefined) {
            const ingItem = mcData.items[ingId] || mcData.blocks[ingId];
            if (ingItem) {
              const ingIsBlock = !!mcData.blocksByName[ingItem.name];
              grid[row * 3 + col] = {
                id: ingItem.name,
                name: ingItem.displayName,
                texture: getItemTexture(ingItem.name, ingIsBlock)
              };
            }
          }
        }
      }
    } else if (r.ingredients) {
      for (let i = 0; i < r.ingredients.length && i < 9; i++) {
        const ingId = r.ingredients[i];
        if (ingId !== null && ingId !== undefined) {
          const ingItem = mcData.items[ingId] || mcData.blocks[ingId];
          if (ingItem) {
            const ingIsBlock = !!mcData.blocksByName[ingItem.name];
            grid[i] = {
              id: ingItem.name,
              name: ingItem.displayName,
              texture: getItemTexture(ingItem.name, ingIsBlock)
            };
          }
        }
      }
    }

    craftingRecipe = {
      type: 'crafting_table',
      grid: grid,
      resultCount: r.result ? r.result.count : 1
    };
  } else if (category !== 'weapons_tools' && category !== 'potions' && !isBlock) {
    category = 'uncraftable';
  }

  const { theme, glow, rarity } = determineThemeColor(cleanId, category);

  // Auto-populate obtain section
  const obtain = [];
  if (isCraftable) {
    obtain.push({
      category: 'Crafting',
      title: '3x3 Crafting Table',
      chance: '100% Guaranteed',
      details: `Crafted by arranging ingredients in the exact crafting table pattern shown in the recipe grid.`
    });
  } else if (cleanId === 'elytra') {
    obtain.push({
      category: 'Structure / Chest',
      title: 'End City Ships',
      location: 'The End Dimension (Y: 60 - 100)',
      chance: 'Guaranteed in Item Frame',
      details: 'Found mounted in an item frame inside the treasure room of floating End Ships in outer End Islands.'
    });
  } else if (cleanId === 'totem_of_undying') {
    obtain.push({
      category: 'Mob Drop',
      title: 'Evoker Drop',
      location: 'Woodland Mansions & Raids',
      chance: '100%',
      details: 'Guaranteed drop from defeating an Evoker in Woodland Mansions or village raid waves.'
    });
  } else if (cleanId === 'beacon') {
    obtain.push({
      category: 'Crafting',
      title: 'Crafted with Nether Star',
      chance: '100%',
      details: 'Crafted using 1 Nether Star (from the Wither boss), 3 Obsidian blocks, and 5 Glass blocks.'
    });
  } else if (cleanId.includes('ore') || cleanId.includes('raw_') || cleanId === 'diamond' || cleanId === 'ancient_debris' || cleanId.includes('copper')) {
    obtain.push({
      category: 'Mining',
      title: 'Subterranean Mining',
      location: cleanId === 'ancient_debris' ? 'Nether Y: 15' : 'Overworld Subsurface',
      chance: 'Abundant at peak levels',
      details: 'Extracted with an appropriate Pickaxe. Fortune enchantment boosts raw yield.'
    });
  } else if (cleanId.includes('nether')) {
    obtain.push({
      category: 'Structure / Chest',
      title: 'Nether Dimension Loot',
      location: 'Nether Fortresses & Bastion Remnants',
      chance: 'Varies by structure',
      details: 'Found inside treasure chests or harvested directly from the Nether dimension.'
    });
  } else {
    obtain.push({
      category: isBlock ? 'Mining' : 'Structure / Chest',
      title: isBlock ? 'Harvested from World' : 'Dungeon & Chest Exploration',
      chance: 'Common exploration find',
      details: `Obtained naturally during survival gameplay, exploring structures, or gathering resources in Minecraft.`
    });
  }

  itemsList.push({
    id: cleanId,
    name: item.displayName,
    texture: getItemTexture(cleanId, isBlock),
    category: category,
    rarity: rarity,
    isCraftable: isCraftable,
    description: `${item.displayName} is an authentic Minecraft ${category.replace('_', ' ')} asset. Stack Size: ${item.stackSize || 64}.`,
    tags: [category, isBlock ? 'block' : 'item', cleanId.split('_')[0]],
    themeColor: theme,
    glowColor: glow,
    stats: [
      { label: 'Stack Size', value: `${item.stackSize || 64}` },
      { label: 'Item ID', value: `${item.id}` },
      { label: 'Craftable', value: isCraftable ? 'Yes (3x3)' : 'No' }
    ],
    recipe: craftingRecipe,
    obtain: obtain
  });
});

console.log(`Generated ${itemsList.length} total Minecraft items, blocks, and mobs!`);

const outputPath = path.join(__dirname, '..', 'data', 'generatedItems.json');
fs.writeFileSync(outputPath, JSON.stringify(itemsList, null, 2), 'utf-8');
console.log(`Successfully saved to ${outputPath}`);
