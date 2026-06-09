import { progress } from "../data/progress";


function Dashboard({
  player,
  streak,

  // DAILY COMPLETION COUNTER
  dailyCompleted,
}) {
  return (
    <div>
      <h2>Dashboard</h2>

      <p>Hunter: {player.name}</p>
      <p>Rank: {player.rank}</p>
      <p>Level: {player.level}</p>

      <hr />

      <p>Current Title: {player.currentTitle}</p>

      <hr />

      <p>🔥 Daily Streak: {streak} Days</p>
          {/* DAILY QUEST PROGRESS */}
      <p>
  📋      Today's Progress:
          {dailyCompleted} / 5
      </p>
      
      <hr />

      <p>🔥 Current Streak: {streak}</p>

      <p>Total Pushups: {progress.totalPushups}</p>
      <p>Total Squats: {progress.totalSquats}</p>
    </div>
  );
}

export default Dashboard;