"use client";

import { useCallback, useEffect, useState } from "react";
import type { UnitSystem } from "@/lib/unit-system";

export function usePersistentUnitSystem(storageKey: string, defaultValue: UnitSystem = "metric") {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(defaultValue);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw === "metric" || raw === "imperial") setUnitSystem(raw);
    } catch {
      // ignore
    }
  }, [storageKey]);

  const update = useCallback(
    (next: UnitSystem) => {
      setUnitSystem(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // ignore
      }
    },
    [storageKey]
  );

  return { unitSystem, setUnitSystem: update };
}
