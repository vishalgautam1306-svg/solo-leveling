import { player } from "../data/player";
import { progress } from "../data/progress";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <p>Hunter: {player.name}</p>
      <p>Rank: {player.rank}</p>
      <p>Level: {player.level}</p>

      <hr />

      <p>Current Title: {player.currentTitle}</p>

      <hr />

      <p>Current Streak: {progress.currentStreak}</p>

      <p>Total Pushups: {progress.totalPushups}</p>
      <p>Total Squats: {progress.totalSquats}</p>
    </div>
  );
}

export default Dashboard;