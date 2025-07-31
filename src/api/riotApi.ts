const API_KEY = import.meta.env.VITE_RIOT_API_KEY;

const headers = {
  "X-Riot-Token": API_KEY,
};

const REGION = "europe";
const PLATFORM = "euw1";

export async function getRiotAccount(gameName: string, tagLine: string) {
  try {
    const res = await fetch(
      `https://${REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers }
    );

    console.log("get Riot Account:", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Error response:", errorData);
      throw new Error("Riot account not found");
    }

    const data = await res.json();
    console.log("Riot Account:", data);

    return data;
  } catch (error) {
    console.error("fetch failed");
    throw error;
  }
}

export async function getSummonerByPuuid(puuid: string) {
  try {
    const res = await fetch(
      `https://${PLATFORM}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers }
    );

    console.log("get Summoner By Puuid:", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Error response:", errorData);
      throw new Error("Summoner not found");
    }

    const data = await res.json();
    console.log("Summoner:", data);

    return data;
  } catch (error) {
    console.error("fetch failed");
    throw error;
  }
}

export async function getRankedInfo(puuid: string) {
  try {
    const res = await fetch(
      `https://${PLATFORM}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      { headers }
    );

    console.log("get Ranked info:", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Error response:", errorData);
      throw new Error("Rank info not found");
    }

    const data = await res.json();
    console.log("Ranked info:", data);

    return data;
  } catch (error) {
    console.error("fetch failed");
    throw error;
  }
}

export async function getRecentMatchIds(puuid: string, count = 5) {
  try {
    const res = await fetch(
      `https://${REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
      { headers }
    );

    console.log("get recent Match Ids:", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Error response:", errorData);
      throw new Error("Match IDs not found");
    }

    const data = await res.json();
    console.log("Match ids:", data);

    return data;
  } catch (error) {
    console.error("fetch failed");
    throw error;
  }
}

export async function getMatch(matchId: string) {
  try {
    const res = await fetch(
      `https://${REGION}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      { headers }
    );

    console.log("get Match", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Error response:", errorData);
      throw new Error("Match not found");
    }

    const data = await res.json();
    console.log("Match data:", data);

    return data;
  } catch (error) {
    console.error("fetch failed");
    throw error;
  }
}

export async function getFullSummonerProfile(
  gameName: string,
  tagLine: string
) {
  const riotAccount = await getRiotAccount(gameName, tagLine);
  const summoner = await getSummonerByPuuid(riotAccount.puuid);
  const ranked = await getRankedInfo(summoner.puuid);
  const matchIds = await getRecentMatchIds(riotAccount.puuid);
  const matches = await Promise.all(matchIds.map(getMatch));

  return {
    riotAccount,
    summoner,
    ranked,
    matches,
  };
}
