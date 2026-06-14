function WeeklyQuests({ weekly }) {
  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "30px auto",
        padding: "25px",
        background:
          "linear-gradient(180deg,#030712,#081425)",
        border: "2px solid rgba(0,229,255,0.5)",
        borderRadius: "12px",
        boxShadow:
          "0 0 15px rgba(0,229,255,0.3), 0 0 40px rgba(0,229,255,0.1)",
      }}
    >
      {/* HEADER */}

      <h1
        style={{
          textAlign: "center",
          color: "#00e5ff",
          letterSpacing: "5px",
          textShadow:
            "0 0 10px #00e5ff, 0 0 20px #00e5ff",
          marginBottom: "40px",
        }}
      >
        WEEKLY QUESTS
      </h1>

      {weekly.map((quest, index) => (
        <div
          key={index}
          style={{
            background:
              "rgba(255,255,255,0.03)",
            border:
              "1px solid rgba(0,229,255,0.4)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "25px",
            boxShadow:
              "0 0 10px rgba(0,229,255,0.15)",
          }}
        >
          {/* QUEST NAME */}

          <h2
            style={{
              color: "#ffffff",
              marginBottom: "15px",
            }}
          >
            {quest.name}
          </h2>

          {/* PROGRESS */}

          <p
            style={{
              color: "#bdefff",
            }}
          >
            Progress: {quest.progress} / {quest.target}
          </p>

          {/* PROGRESS BAR */}

          <div
            style={{
              width: "100%",
              height: "14px",
              background: "#111827",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: `${
                  (quest.progress / quest.target) * 100
                }%`,
                height: "100%",
                background:
                  "linear-gradient(to right,#00e5ff,#38bdf8)",
                boxShadow:
                  "0 0 15px #00e5ff",
              }}
            />
          </div>

          {/* REWARD */}

          <div
            style={{
              color: "#7ddfff",
              marginBottom: "15px",
            }}
          >
            🎁 Reward: {quest.reward}
          </div>

          {/* STATUS */}

          <div
            style={{
              fontWeight: "bold",
              color: quest.completed
                ? "#22c55e"
                : "#facc15",
              textShadow: quest.completed
                ? "0 0 10px #22c55e"
                : "0 0 10px #facc15",
            }}
          >
            {quest.completed
              ? "✓ COMPLETED"
              : "IN PROGRESS"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyQuests;