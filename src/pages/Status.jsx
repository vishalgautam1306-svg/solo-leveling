import { player } from "../data/player";

function Status() {
  return (
    <div>
      <h2>Status</h2>

      <p>Name: {player.name}</p>
      <p>Rank: {player.rank}</p>
      <p>Level: {player.level}</p>
      <p>EXP: {player.exp}</p>

      <hr />

      <p>Strength: {player.stats.strength}</p>
      <p>Endurance: {player.stats.endurance}</p>
      <p>Discipline: {player.stats.discipline}</p>
      <p>Knowledge: {player.stats.knowledge}</p>
      <p>Confidence: {player.stats.confidence}</p>

      <hr />

      <p>Title: {player.currentTitle}</p>
    </div>
  );
}

export default Status;