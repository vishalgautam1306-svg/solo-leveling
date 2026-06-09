function Achievements({ achievements }) {
  return (
    <div>
      <h2>Achievements</h2>

      {achievements.map((achievement, index) => (
        <div key={index}>
          <p>
            {achievement.unlocked ? "🏆" : "🔒"}{" "}
            {achievement.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Achievements;