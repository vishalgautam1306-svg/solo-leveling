// ========================================
// PROGRESSION PAGE
// ========================================

function Progression({ player }) {
  const progression = player.progression;

  return (
    <div>
      <h2>Lifetime Progression</h2>

      <p>
        💪 Total Pushups:
        {progression.totalPushups}
      </p>

      <p>
        🦵 Total Squats:
        {progression.totalSquats}
      </p>

      <p>
        🚶 Total Walk:
        {(progression.totalWalk / 1000).toFixed(2)} km
      </p>

      <p>
        📚 Theory Study:
        {Math.floor(
          progression.totalTheory / 60
        )} hrs
      </p>

      <p>
        💻 Practical Study:
        {Math.floor(
          progression.totalPractical / 60
        )} hrs
      </p>
    </div>
  );
}

export default Progression;