import {
  savePlayer,
  saveQuests,
  saveAchievements,
  saveTitles,
  saveInventory,
  saveLogs,
  saveStreak,
  saveWeeklyQuests,
  saveDailyCompleted,
} from "../utils/storage";


function Quests({
  player,
  setPlayer,
  quests,
  setQuests,
  achievements,
  setAchievements,
  titles,
  setTitles,
  inventory,
  setInventory,
  logs,
  setLogs,
  streak,
  setStreak,
  weekly,
  setWeekly,

  // DAILY COMPLETION COUNTER
  dailyCompleted,
  setDailyCompleted,
}) {
  const completeQuest = (index) => {
    if (quests[index].completed) return;

    const updatedQuests = [...quests];

    updatedQuests[index] = {
      ...updatedQuests[index],
      completed: true,
    };

    setQuests(updatedQuests);
    saveQuests(updatedQuests);

    // old streak system
    //setStreak(streak + 1);
    //saveStreak(streak + 1);

    // DAILY COMPLETION COUNTER
    setDailyCompleted(
        dailyCompleted + 1
    );

    saveDailyCompleted(
        dailyCompleted + 1
    );

    let newExp = player.exp + updatedQuests[index].exp;
    let newLevel = player.level;
    let newExpToNextLevel = player.expToNextLevel;
    let newAvailableStatPoints =
     player.availableStatPoints || 0;

    while (newExp >= newExpToNextLevel) {
  newExp -= newExpToNextLevel;
  newLevel += 1;
  newExpToNextLevel += 100;

  newAvailableStatPoints += 5;

  alert(
    `🎉 LEVEL UP! You are now Level ${newLevel}\n⭐ +5 Stat Points`
  );
}

    // RANK SYSTEM
    let newRank = player.rank;

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

    if (newRank !== player.rank) {
      alert(`🔥 RANK UP! You are now Rank ${newRank}`);
    }

    // TITLES
    let newTitle = player.currentTitle;

    const updatedTitles = [...titles];

    if (newLevel >= 20) {
      updatedTitles[3].unlocked = true;
      newTitle = "Elite Hunter";
    } else if (newLevel >= 10) {
      updatedTitles[2].unlocked = true;
      newTitle = "Rising Hunter";
    } else if (newLevel >= 5) {
      updatedTitles[1].unlocked = true;
      newTitle = "Novice Hunter";
    }

    setTitles(updatedTitles);
    saveTitles(updatedTitles);
    
    const updatedInventory = {
  ...inventory,
};

// LEVEL 5 REWARD
if (
  newLevel >= 5 &&
  inventory.expScroll === 0
) {
  updatedInventory.expScroll += 1;
}

    // LEVEL 10 REWARD
  if (
  newLevel >= 10 &&
  inventory.streakShield === 0
  )  {
  updatedInventory.streakShield += 1;
  }

      // LEVEL 20 REWARD
    if (
    newLevel >= 20 &&
    inventory.timeCrystal === 0
  )   {
    updatedInventory.timeCrystal += 1;
  }

    setInventory(updatedInventory);
    saveInventory(updatedInventory);

     const updatedWeekly = [...weekly];

     updatedWeekly.forEach((quest) => {
  if (!quest.completed) {
    quest.progress += 1;

    if (quest.progress >= quest.target) {
      quest.completed = true;

      if (quest.reward === "🛡️ Streak Shield") {
        updatedInventory.streakShield += 1;
      }

      if (quest.reward === "💎 Time Crystal") {
        updatedInventory.timeCrystal += 1;
      }

      alert(
        `🏆 Weekly Quest Complete!\n${quest.reward} awarded`
      );
      }
      }
      });

    setWeekly(updatedWeekly);
    saveWeeklyQuests(updatedWeekly);
    setInventory(updatedInventory);
    saveInventory(updatedInventory);

      const updatedPlayer = {
  ...player,
     level: newLevel,
     rank: newRank,
    exp: newExp,
    expToNextLevel: newExpToNextLevel,
    currentTitle: newTitle,
    availableStatPoints: newAvailableStatPoints,
    };

    setPlayer(updatedPlayer);
    savePlayer(updatedPlayer);


     const updatedLogs = [
        `✅ Completed: ${updatedQuests[index].name}`,
        ...logs,
      ];

      if (newLevel > player.level) {
        updatedLogs.unshift(
     `🎉 Reached Level ${newLevel}`
    );
      }

      if (newRank !== player.rank) {
      updatedLogs.unshift(
      `🔥 Promoted to Rank ${newRank}`
    );
      }

         // WEEKLY QUEST LOGS
      updatedWeekly.forEach((quest) => {
    if (
      quest.completed &&
      quest.progress === quest.target &&
      !logs.some(
      (log) =>
        log ===
        `🏆 Weekly Quest Complete: ${quest.name}`
    )
    ) {
    updatedLogs.unshift(
      `🎁 Reward Received: ${quest.reward}`
    );

    updatedLogs.unshift(
      `🏆 Weekly Quest Complete: ${quest.name}`
    );
    }
    });
      setLogs(updatedLogs);
      saveLogs(updatedLogs);

    // ACHIEVEMENTS
    const updatedAchievements = [...achievements];

    updatedAchievements[0] = {
      ...updatedAchievements[0],
      unlocked: true,
    };

    if (newLevel >= 5) {
      updatedAchievements[1] = {
        ...updatedAchievements[1],
        unlocked: true,
      };
    }

    if (newLevel >= 10) {
      updatedAchievements[2] = {
        ...updatedAchievements[2],
        unlocked: true,
      };
    }

    setAchievements(updatedAchievements);
    saveAchievements(updatedAchievements);
  };

  
  const resetQuests = () => {
    const reset = quests.map((quest) => ({
      ...quest,
      completed: false,
    }));

    setQuests(reset);
    saveQuests(reset);
  };

  return (
    <div>
      <h2>Daily Quests</h2>

      <button onClick={resetQuests}>
        🔄 Reset Daily Quests
      </button>

      <hr />

      {quests.map((quest, index) => (
        <div key={index}>
          <p>{quest.name}</p>
          <p>Target: {quest.target}</p>
          <p>Reward: {quest.exp} EXP</p>

          <p>
            Status: {quest.completed ? "✅ Completed" : "❌ Incomplete"}
          </p>

          {!quest.completed && (
            <button onClick={() => completeQuest(index)}>
              Complete Quest
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Quests;