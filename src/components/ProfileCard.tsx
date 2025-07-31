export default function ProfileCard({ data }: any) {
  return (
    <div className="mt-4 text-sm bg-gray-100 text-black p-4 rounded">
      <p>
        <strong>Name:</strong> {data.riotAccount.gameName}
      </p>
      <p>
        <strong>Level:</strong> {data.summoner.summonerLevel}
      </p>
      <p>
        <strong>Rank:</strong> {data.ranked[0]?.tier} {data.ranked[0]?.rank} -{" "}
        {data.ranked[0]?.leaguePoints} LP
      </p>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/13.14.1/img/profileicon/${data.summoner.profileIconId}.png`}
        className="w-16 h-16 mt-2"
      />
    </div>
  );
}
