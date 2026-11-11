"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  SUPPORTED_VERSIONS,
  SUPPORTED_EDITIONS,
  DEFAULT_VERSION,
  DEFAULT_EDITION,
  VersionInfo,
  EditionInfo,
  EditionType,
  isItemInVersion as checkItemInVersion,
  getEditionForVersion,
} from "@/data/versionRegistry";
import { CraftingRecipe } from "@/data/items";

interface VersionContextType {
  selectedVersion: string;
  selectedEdition: EditionType;
  setVersion: (version: string) => void;
  setEdition: (edition: EditionType) => void;
  supportedVersions: VersionInfo[];
  supportedEditions: EditionInfo[];
  currentVersionInfo: VersionInfo;
  currentEditionInfo: EditionInfo;
  versionsByEdition: Record<EditionType, VersionInfo[]>;
  isItemInVersion: (itemId: string) => boolean;
  getItemCountForVersion: (version?: string) => number;
  fetchRecipeForVersion: (itemId: string, fallbackRecipe?: CraftingRecipe) => Promise<CraftingRecipe | null>;
  cachedRecipes: Record<string, CraftingRecipe>;
  isLoadingRecipe: boolean;
}

const defaultVersionInfo = SUPPORTED_VERSIONS[0];
const defaultEditionInfo = SUPPORTED_EDITIONS[0];

const defaultContext: VersionContextType = {
  selectedVersion: DEFAULT_VERSION,
  selectedEdition: DEFAULT_EDITION,
  setVersion: () => {},
  setEdition: () => {},
  supportedVersions: SUPPORTED_VERSIONS,
  supportedEditions: SUPPORTED_EDITIONS,
  currentVersionInfo: defaultVersionInfo,
  currentEditionInfo: defaultEditionInfo,
  versionsByEdition: {
    java: [],
    bedrock: [],
    mcpe: [],
    classic: [],
  },
  isItemInVersion: () => true,
  getItemCountForVersion: () => 1326,
  fetchRecipeForVersion: async () => null,
  cachedRecipes: {},
  isLoadingRecipe: false,
};

const VersionContext = createContext<VersionContextType>(defaultContext);

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [selectedVersion, setSelectedVersionState] = useState<string>(DEFAULT_VERSION);
  const [selectedEdition, setSelectedEditionState] = useState<EditionType>(DEFAULT_EDITION);
  const [cachedRecipes, setCachedRecipes] = useState<Record<string, CraftingRecipe>>({});
  const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false);

  // Group versions by edition
  const versionsByEdition = useMemo(() => {
    const map: Record<EditionType, VersionInfo[]> = {
      java: [],
      bedrock: [],
      mcpe: [],
      classic: [],
    };
    for (const v of SUPPORTED_VERSIONS) {
      if (map[v.edition]) {
        map[v.edition].push(v);
      }
    }
    return map;
  }, []);

  // Restore saved version and edition from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc_app_version");
      if (saved && SUPPORTED_VERSIONS.some((v) => v.id === saved)) {
        setSelectedVersionState(saved);
        setSelectedEditionState(getEditionForVersion(saved));
      }
    } catch {}
  }, []);

  const setVersion = (v: string) => {
    setSelectedVersionState(v);
    const edition = getEditionForVersion(v);
    setSelectedEditionState(edition);
    try {
      localStorage.setItem("mc_app_version", v);
    } catch {}
  };

  const setEdition = (edition: EditionType) => {
    setSelectedEditionState(edition);
    // If current selected version doesn't belong to this edition, switch to the first version of the edition
    const currentMatches = SUPPORTED_VERSIONS.find((v) => v.id === selectedVersion && v.edition === edition);
    if (!currentMatches) {
      const firstInEdition = versionsByEdition[edition]?.[0];
      if (firstInEdition) {
        setVersion(firstInEdition.id);
      }
    }
  };

  const currentVersionInfo = useMemo(() => {
    return SUPPORTED_VERSIONS.find((v) => v.id === selectedVersion) || defaultVersionInfo;
  }, [selectedVersion]);

  const currentEditionInfo = useMemo(() => {
    return SUPPORTED_EDITIONS.find((e) => e.id === selectedEdition) || defaultEditionInfo;
  }, [selectedEdition]);

  const isItemInVersion = useCallback(
    (itemId: string): boolean => {
      return checkItemInVersion(itemId, selectedVersion);
    },
    [selectedVersion]
  );

  const getItemCountForVersion = useCallback(
    (version: string = selectedVersion): number => {
      const info = SUPPORTED_VERSIONS.find((v) => v.id === version);
      return info ? info.itemCount : 1326;
    },
    [selectedVersion]
  );

  // Dynamic fetcher for version-specific recipe
  const fetchRecipeForVersion = useCallback(
    async (itemId: string, fallbackRecipe?: CraftingRecipe): Promise<CraftingRecipe | null> => {
      const cacheKey = `${selectedVersion}:${itemId}`;
      if (cachedRecipes[cacheKey]) {
        return cachedRecipes[cacheKey];
      }

      try {
        setIsLoadingRecipe(true);
        const res = await fetch(`/api/version-recipe?v=${encodeURIComponent(selectedVersion)}&item=${encodeURIComponent(itemId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.recipe) {
            setCachedRecipes((prev) => ({
              ...prev,
              [cacheKey]: data.recipe,
            }));
            setIsLoadingRecipe(false);
            return data.recipe;
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch version recipe for ${itemId}:`, err);
      } finally {
        setIsLoadingRecipe(false);
      }

      return fallbackRecipe || null;
    },
    [selectedVersion, cachedRecipes]
  );

  const value = useMemo(
    () => ({
      selectedVersion,
      selectedEdition,
      setVersion,
      setEdition,
      supportedVersions: SUPPORTED_VERSIONS,
      supportedEditions: SUPPORTED_EDITIONS,
      currentVersionInfo,
      currentEditionInfo,
      versionsByEdition,
      isItemInVersion,
      getItemCountForVersion,
      fetchRecipeForVersion,
      cachedRecipes,
      isLoadingRecipe,
    }),
    [
      selectedVersion,
      selectedEdition,
      currentVersionInfo,
      currentEditionInfo,
      versionsByEdition,
      isItemInVersion,
      getItemCountForVersion,
      fetchRecipeForVersion,
      cachedRecipes,
      isLoadingRecipe,
    ]
  );

  return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>;
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
}
