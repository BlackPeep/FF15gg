import { useState } from "react";
import { getFullSummonerProfile } from "../api/riotApi";
import Spinner from "./Spinner";
import ProfileCard from "./ProfileCard";
import MatchHistory from "./MatchHistory";

export default function SummonerSearch() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setError("");
      setData(null);
      setIsLoading(true);

      const [name, tag] = input.split("#");

      if (!name || !tag) {
        setError("Please enter a valid Riot ID");
        return;
      }

      const result = await getFullSummonerProfile(name, tag);
      setData(result);
      console.log(data);
    } catch (err: any) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Riot ID"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>

      {isLoading && <Spinner />}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {data && (
        <div>
          <ProfileCard data={data} />
          <MatchHistory data={data} puuid={data.riotAccount.puuid} />
        </div>
      )}
    </div>
  );
}
