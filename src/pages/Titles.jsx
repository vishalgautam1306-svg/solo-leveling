function Titles({ titles }) {
  return (
    <div>
      <h2>Titles</h2>

      {titles.map((title, index) => (
        <div key={index}>
          <p>
            {title.unlocked ? "👑" : "🔒"} {title.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Titles;