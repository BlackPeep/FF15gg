import { useEffect, useState } from "react";

export function useLatestDDragonVersion() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVersion() {
      try {
        const res = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setVersion(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch Data Dragon version:", error);
      }
    }

    fetchVersion();
  }, []);

  return version;
}
