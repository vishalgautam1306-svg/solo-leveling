// ======================================================
// IMPORTS
// Local Storage Save Functions
// ======================================================

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

import {
  getExpRequired,
} from "../utils/levelSystem";


// ======================================================
// QUESTS COMPONENT
// ======================================================

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



  // ======================================================
  // COMPLETE QUEST FUNCTION
  // Main progression logic runs here
  // ======================================================

  const completeQuest = (index) => {



    // ======================================================
    // PREVENT RE-COMPLETING QUEST
    // ======================================================

    if (quests[index].completed) return;



    // ======================================================
    // MARK QUEST AS COMPLETED
    // ======================================================

    const updatedQuests = [...quests];

    updatedQuests[index] = {
      ...updatedQuests[index],
      completed: true,
    };

    setQuests(updatedQuests);
    saveQuests(updatedQuests);



    // ======================================================
    // OLD STREAK SYSTEM (DISABLED)
    // ======================================================

    //setStreak(streak + 1);
    //saveStreak(streak + 1);



    // ======================================================
    // DAILY COMPLETION COUNTER
    // Used for dashboard progress tracking
    // ======================================================

    setDailyCompleted(
      dailyCompleted + 1
    );

    saveDailyCompleted(
      dailyCompleted + 1
    );



    // ======================================================
    // EXP / LEVEL VARIABLES
    // ======================================================

    let newExp =
      player.exp + updatedQuests[index].exp;

    let newLevel = player.level;

    let newExpToNextLevel =
      player.expToNextLevel;

    let newAvailableStatPoints =
      player.availableStatPoints || 0;



    // ======================================================
    // LEVEL UP LOOP
    // Handles multiple level ups from one reward
    // ======================================================

    while (newExp >= newExpToNextLevel) {

      newExp -= newExpToNextLevel;

      newLevel += 1;

      newExpToNextLevel =
      getExpRequired(newLevel);

      newAvailableStatPoints += 5;

      alert(
        `🎉 LEVEL UP! You are now Level ${newLevel}\n⭐ +5 Stat Points`
      );
    }



    // ======================================================
    // RANK SYSTEM
    // ======================================================

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



    // ======================================================
    // RANK UP ALERT
    // ======================================================

    if (newRank !== player.rank) {
      alert(
        `🔥 RANK UP! You are now Rank ${newRank}`
      );
    }



    // ======================================================
    // TITLE SYSTEM
    // Unlock titles based on level
    // ======================================================

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



    // ======================================================
    // SAVE TITLE DATA
    // ======================================================

    setTitles(updatedTitles);
    saveTitles(updatedTitles);



    // ======================================================
    // INVENTORY REWARD DATA
    // ======================================================

    const updatedInventory = {
      ...inventory,
    };



    // ======================================================
    // LEVEL REWARDS
    // (Current Version)
    // ======================================================

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
    ) {
      updatedInventory.streakShield += 1;
    }



    // LEVEL 20 REWARD

    if (
      newLevel >= 20 &&
      inventory.timeCrystal === 0
    ) {
      updatedInventory.timeCrystal += 1;
    }



    // ======================================================
    // SAVE INVENTORY DATA
    // ======================================================

    setInventory(updatedInventory);
    saveInventory(updatedInventory);

    // ======================================================
    // WEEKLY QUEST PROGRESSION
    // Increases progress whenever a daily quest is completed
    // ======================================================

    const updatedWeekly = [...weekly];

    updatedWeekly.forEach((quest) => {
      if (!quest.completed) {
        quest.progress += 1;

        if (quest.progress >= quest.target) {
          quest.completed = true;

          // ======================================================
          // WEEKLY QUEST REWARDS
          // ======================================================

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

    // ======================================================
    // SAVE WEEKLY QUEST DATA
    // ======================================================

    setWeekly(updatedWeekly);
    saveWeeklyQuests(updatedWeekly);

    setInventory(updatedInventory);
    saveInventory(updatedInventory);


    // ======================================================
    // LIFETIME PROGRESSION TRACKING
    // ======================================================

    const updatedProgression = {
        ...player.progression,
    };

      if (updatedQuests[index].name === "Pushups") {
        updatedProgression.totalPushups +=
          updatedQuests[index].target;
      }

      if (updatedQuests[index].name === "Squats") {
        updatedProgression.totalSquats +=
          updatedQuests[index].target;
      }

      if (updatedQuests[index].name === "Walk") {
        updatedProgression.totalWalk +=
          updatedQuests[index].target;
      }

      if (updatedQuests[index].name === "Theory Study") {
        updatedProgression.totalTheory +=
          updatedQuests[index].target;
      }

      if (updatedQuests[index].name === "Practical Study") {
        updatedProgression.totalPractical +=
          updatedQuests[index].target;
      }


    // ======================================================
    // UPDATE PLAYER DATA
    // Saves level, rank, title and stat changes
    // ======================================================

   const updatedPlayer = {
      ...player,
      level: newLevel,
      rank: newRank,
      exp: newExp,
      expToNextLevel: newExpToNextLevel,
      currentTitle: newTitle,
      availableStatPoints: newAvailableStatPoints,

  // ========================================
  // LIFETIME PROGRESSION DATA
  // ========================================
      progression: updatedProgression,
  };

    setPlayer(updatedPlayer);
    savePlayer(updatedPlayer);



    // ======================================================
    // SYSTEM LOGS
    // ======================================================

    const updatedLogs = [
      `✅ Completed: ${updatedQuests[index].name}`,
      ...logs,
    ];



    // ======================================================
    // LEVEL UP LOGS
    // ======================================================

    if (newLevel > player.level) {
      updatedLogs.unshift(
        `🎉 Reached Level ${newLevel}`
      );
    }



    // ======================================================
    // RANK UP LOGS
    // ======================================================

    if (newRank !== player.rank) {
      updatedLogs.unshift(
        `🔥 Promoted to Rank ${newRank}`
      );
    }



    // ======================================================
    // WEEKLY QUEST LOGS
    // Prevents duplicate weekly completion logs
    // ======================================================

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



    // ======================================================
    // ACHIEVEMENT SYSTEM
    // Unlock achievements based on player progress
    // ======================================================

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



  // ======================================================
  // RESET DAILY QUESTS
  // Testing / debug button
  // ======================================================

  const resetQuests = () => {
    const reset = quests.map((quest) => ({
      ...quest,
      completed: false,
    }));

    setQuests(reset);
    saveQuests(reset);
  };



  // ======================================================
  // UI / RENDER
  // ======================================================

  return (
    <div>

      {/* ==================================================
          DAILY QUEST HEADER
      ================================================== */}

      <h2>Daily Quests</h2>

      <button onClick={resetQuests}>
        🔄 Reset Daily Quests
      </button>

      <hr />



      {/* ==================================================
          DAILY QUEST LIST
      ================================================== */}

      {quests.map((quest, index) => (
        <div key={index}>

          {/* QUEST INFO */}
          <p>{quest.name}</p>
          <p>
          Target: {quest.target} {quest.unit || ""}
          </p>
          <p>Reward: {quest.exp} EXP</p>

          {/* QUEST STATUS */}
          <p>
            Status: {quest.completed
              ? "✅ Completed"
              : "❌ Incomplete"}
          </p>

          {/* COMPLETE BUTTON */}
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