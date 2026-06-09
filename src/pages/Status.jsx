import { savePlayer } from "../utils/storage";


// ========================================
// STATUS COMPONENT
// ========================================

function Status({ player, setPlayer }) {

  // ========================================
  // EXP BAR CALCULATION
  // ========================================

  const expPercentage =
    (player.exp / player.expToNextLevel) * 100;


  // ========================================
  // STAT POINT ALLOCATION SYSTEM
  // ========================================

  const addStat = (statName) => {

    // Prevent spending points if none available
    if ((player.availableStatPoints || 0) <= 0)
      return;

    const updatedPlayer = {
      ...player,

      availableStatPoints:
        player.availableStatPoints - 1,

      stats: {
        ...player.stats,
        [statName]:
          player.stats[statName] + 1,
      },
    };

    setPlayer(updatedPlayer);
    savePlayer(updatedPlayer);
  };


  // ========================================
  // DEV TEST LEVEL UP BUTTON
  // ========================================

  const testLevelUp = () => {

    let newLevel = player.level + 1;
    let newRank = player.rank;
    let newTitle = player.currentTitle;


    // ========================================
    // RANK SYSTEM
    // ========================================

    if (newLevel >= 50) {
      newRank = "S";
    } else if (newLevel >= 35) {
      newRank = "A";
    } else if (newLevel >= 20) {
      newRank = "B";
    } else if (newLevel >= 10) {
      newRank = "C";
    } else if (newLevel >= 5) {
      newRank = "D";
    } else {
      newRank = "E";
    }


    // ========================================
    // TITLE SYSTEM
    // ========================================

    if (newLevel >= 20) {
      newTitle = "Elite Hunter";
    } else if (newLevel >= 10) {
      newTitle = "Rising Hunter";
    } else if (newLevel >= 5) {
      newTitle = "Novice Hunter";
    }


    // ========================================
    // SAVE UPDATED PLAYER DATA
    // ========================================

    const updatedPlayer = {
      ...player,
      level: newLevel,
      rank: newRank,
      currentTitle: newTitle,

      availableStatPoints:
        (player.availableStatPoints || 0) + 5,
    };

    setPlayer(updatedPlayer);
    savePlayer(updatedPlayer);


    // ========================================
    // DEV POPUP
    // ========================================

    alert(
      `🧪 TEST LEVEL UP\nLevel ${newLevel}\n+5 Stat Points`
    );
  };


  // ========================================
  // STATUS PAGE UI
  // ========================================

  return (
    <div>

      {/* ========================================
          STATUS HEADER
      ======================================== */}

      <h2>Status</h2>


      {/* ========================================
          PLAYER INFORMATION
      ======================================== */}

      <p>Name: {player.name}</p>
      <p>Rank: {player.rank}</p>
      <p>Level: {player.level}</p>


      {/* ========================================
          EXP DISPLAY
      ======================================== */}

      <p>
        EXP: {player.exp} / {player.expToNextLevel}
      </p>


      {/* ========================================
          EXP BAR
      ======================================== */}

      <div
        style={{
          width: "300px",
          height: "20px",
          border: "1px solid black",
          backgroundColor: "#ddd",
        }}
      >
        <div
          style={{
            width: `${expPercentage}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        ></div>
      </div>

      <br />


      {/* ========================================
          DEV TEST BUTTON
      ======================================== */}

      <button onClick={testLevelUp}>
        🧪 Test Level Up
      </button>

      <hr />


      {/* ========================================
          STAT POINT SECTION
      ======================================== */}

      <h3>Stat Points</h3>

      <p>
        Available Points:{" "}
        {player.availableStatPoints || 0}
      </p>

      <hr />


      {/* ========================================
          STRENGTH STAT
      ======================================== */}

      <p>
        Strength: {player.stats.strength}
        <button
          onClick={() => addStat("strength")}
        >
          +
        </button>
      </p>


      {/* ========================================
          ENDURANCE STAT
      ======================================== */}

      <p>
        Endurance: {player.stats.endurance}
        <button
          onClick={() => addStat("endurance")}
        >
          +
        </button>
      </p>


      {/* ========================================
          DISCIPLINE STAT
      ======================================== */}

      <p>
        Discipline: {player.stats.discipline}
        <button
          onClick={() => addStat("discipline")}
        >
          +
        </button>
      </p>


      {/* ========================================
          KNOWLEDGE STAT
      ======================================== */}

      <p>
        Knowledge: {player.stats.knowledge}
        <button
          onClick={() => addStat("knowledge")}
        >
          +
        </button>
      </p>


      {/* ========================================
          CONFIDENCE STAT
      ======================================== */}

      <p>
        Confidence: {player.stats.confidence}
        <button
          onClick={() => addStat("confidence")}
        >
          +
        </button>
      </p>

      <hr />


      {/* ========================================
          CURRENT TITLE
      ======================================== */}

      <p>Title: {player.currentTitle}</p>

    </div>
  );
}

export default Status;