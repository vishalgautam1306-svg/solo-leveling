function WeeklyQuests({ weekly }) {
  return (
    <div>
      <h2>📅 Weekly Quests</h2>

      {weekly.map((quest, index) => (
        <div key={index}>
          <p>{quest.name}</p>

          <p>
            Progress: {quest.progress} / {quest.target}
          </p>

          <p>Reward: {quest.reward}</p>

          <p>
            Status: {quest.completed
              ? "✅ Completed"
              : "❌ In Progress"}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default WeeklyQuests;