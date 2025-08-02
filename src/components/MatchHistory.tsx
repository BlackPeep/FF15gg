import { formatTimeAgo } from "../helper/formatTimeAgo";
import { useLatestDDragonVersion } from "../hooks/useLatestDDragonVersion";

export default function MatchHistory({ data, puuid }: any) {
  const patchVersion = useLatestDDragonVersion();

  if (!patchVersion) {
    return <div className="text-gray-400">Loading patch info...</div>;
  }

  return (
    <ul className="space-y-4">
      {data.matches.map((match: any, index: number) => {
        const player = match.info.participants.find(
          (p: any) => p.puuid === puuid
        );

        if (!player) return null;

        const isWin = player.win;
        const kda = `${player.kills}/${player.deaths}/${player.assists}`;
        const champion = player.championName;
        const gameMode = match.info.gameMode;
        const timeStamp = match.info.gameStartTimestamp;

        const timeAgo = formatTimeAgo(timeStamp);
        const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champion}.png`;

        return (
          <li
            key={index}
            className={`p-4 rounded-xl border ${
              isWin
                ? "bg-blue-900 border-blue-700"
                : "bg-red-900 border-red-700"
            }`}
          >
            <img
              src={champImgUrl}
              alt={champion}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex justify-between items-center">
              <span className="text-white text-xl font-blod">{champion}</span>
              <span className="text-gray-300">{gameMode}</span>
            </div>
            <div className="text-white">KDA: {kda}</div>
            <div className="text-gray-400 text-sm">{timeAgo}</div>
          </li>
        );
      })}
    </ul>
  );
}
