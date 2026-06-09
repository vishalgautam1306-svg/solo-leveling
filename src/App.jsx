import { useState, useEffect } from "react";

// Storage block
import {
  loadPlayer,
  loadQuests,
  saveQuests,
  loadAchievements,
  loadTitles,
  loadInventory,
  saveInventory,
  loadLogs,
  loadStreak,
  saveStreak,
  loadWeeklyQuests,
  loadWeeklyResetDate,
  saveWeeklyResetDate,
  loadDailyResetDate,
  saveDailyResetDate,
  loadDailyCompleted,
  saveDailyCompleted,
} from "./utils/storage";


import { weeklyQuests } from "./data/weeklyQuests";
import { dailyQuests } from "./data/quests";
import { achievementsList } from "./data/achievements";
import { titlesList } from "./data/titles";
import { inventoryData } from "./data/inventory";

import WeeklyQuests from "./pages/WeeklyQuests";
import Dashboard from "./pages/Dashboard";
import Status from "./pages/Status";
import Quests from "./pages/Quests";
import Achievements from "./pages/Achievements";
import Titles from "./pages/Titles";
import Inventory from "./pages/Inventory";
import SystemLog from "./pages/SystemLog";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState("dashboard");

  const [achievements, setAchievements] = useState(
    loadAchievements() || achievementsList
  );

  const [titles, setTitles] = useState(
    loadTitles() || titlesList
  );

  const [inventory, setInventory] = useState(
    loadInventory() || inventoryData
  );

  const [player, setPlayer] = useState(
    loadPlayer() || {
      name: "Vishal",
      level: 1,
      rank: "E",
      exp: 0,
      expToNextLevel: 100,
      currentTitle: "The Beginner",

      stats: {
        strength: 10,
        endurance: 10,
        discipline: 10,
        knowledge: 10,
        confidence: 10,
      },
    }
  );

  

  const [logs, setLogs] = useState(
    loadLogs() || ["🚀 System Initialized"]
  );

  const [streak, setStreak] = useState(
    loadStreak()
  );
      // DAILY COMPLETION COUNTER
  const [dailyCompleted, setDailyCompleted] =
  useState(loadDailyCompleted());


  const [quests, setQuests] = useState(
    loadQuests() || dailyQuests
  );

  const [weekly, setWeekly] = useState(
    loadWeeklyQuests() || weeklyQuests
    );

    // DAILY RESET SYSTEM

useEffect(() => {
  const lastReset =
    loadDailyResetDate();

  const today = new Date();

  // FIRST TIME APP RUNS
  if (!lastReset) {
    saveDailyResetDate(today);
    return;
  }

  const lastResetDate =
    new Date(lastReset);

  const diffDays = Math.floor(
    (today - lastResetDate) /
      (1000 * 60 * 60 * 24)
  );

  // RESET EVERY DAY
  if (diffDays >= 1) {
          // STREAK CHECK
      if (dailyCompleted >= 3) {
      setStreak((prev) => prev + 1);

      saveStreak(streak + 1);

      console.log(
    "🔥 Streak Increased"
    );
  // 🛡️ STREAK SHIELD CHECK
} else {
  if (inventory.streakShield > 0) {
    const updatedInventory = {
      ...inventory,
      streakShield:
        inventory.streakShield - 1,
    };

    setInventory(updatedInventory);
    saveInventory(updatedInventory);

    console.log(
      "🛡️ Streak Shield Used"
    );
  } else {
    setStreak(0);

    saveStreak(0);

    console.log(
      "💀 Streak Broken"
    );
  }
}


    const resetDaily =
      dailyQuests.map((quest) => ({
        ...quest,
        completed: false,
      }));

    setQuests(resetDaily);

    localStorage.setItem(
      "quests",
      JSON.stringify(resetDaily)
    );

      // RESET DAILY COMPLETION COUNTER
    setDailyCompleted(0);
    saveDailyCompleted(0);
    saveDailyResetDate(today);

    console.log(
      "🔄 Daily Quests Reset"
    );
  }
}, []);



     // WEEKLY RESET SYSTEM

    useEffect(() => {
      
  const lastReset =
    loadWeeklyResetDate();

   const today = new Date();

      // FIRST TIME APP RUNS
      if (!lastReset) {
        saveWeeklyResetDate(today);
        return;
      }

    const lastResetDate =
    new Date(lastReset);

    const diffDays = Math.floor(
        (today - lastResetDate) /
          (1000 * 60 * 60 * 24)
      );

      // RESET EVERY 7 DAYS
      if (diffDays >= 7) {
      // LEVEL-BASED WEEKLY DIFFICULTY

      let target1 = 10;
      let target2 = 25;

        if (player.level >= 30) {
        target1 = 25;
        target2 = 35;
        } else if (player.level >= 20) {
        target1 = 20;
        target2 = 30;
        } else if (player.level >= 10) {
        target1 = 15;
        target2 = 25;
        }

   const resetWeekly = [
        {
        ...weeklyQuests[0],
        progress: 0,
        completed: false,
        target: target1,
        },
        {
        ...weeklyQuests[1],
        progress: 0,
        completed: false,
        target: target2,
        },
        ];

      setWeekly(resetWeekly);

        localStorage.setItem(
          "weeklyQuests",
          JSON.stringify(resetWeekly)
        );

      saveWeeklyResetDate(today);

        console.log(
          "🔄 Weekly Quests Reset"
        );
        }
      }, []);

      // 🧪 DEV RESET BUTTON
const testDailyReset = () => {
  if (dailyCompleted >= 3) {
    setStreak(streak + 1);
    saveStreak(streak + 1);
// 🛡️ STREAK SHIELD CHECK
} else {
  if (inventory.streakShield > 0) {
    const updatedInventory = {
      ...inventory,
      streakShield:
        inventory.streakShield - 1,
    };

    setInventory(updatedInventory);
    saveInventory(updatedInventory);

    alert(
      "🛡️ Streak Shield Used!"
    );
  } else {
    setStreak(0);
    saveStreak(0);
  }
}

  setDailyCompleted(0);
  saveDailyCompleted(0);

  const resetDaily = dailyQuests.map(
    (quest) => ({
      ...quest,
      completed: false,
    })
  );

  setQuests(resetDaily);
  saveQuests(resetDaily);

  alert("🧪 Daily Reset Triggered");
  };



    return (
    <div>
      <h1>Solo Leveling System</h1>

      <button onClick={() => setPage("dashboard")}>
        Dashboard
      </button>

      <button onClick={() => setPage("status")}>
        Status
      </button>

      <button onClick={() => setPage("quests")}>
        Quests
      </button>

      <button onClick={() => setPage("weekly")}>
        Weekly Quests
      </button>


      <button onClick={() => setPage("achievements")}>
        Achievements
      </button>

      <button onClick={() => setPage("titles")}>
        Titles
      </button>

      <button onClick={() => setPage("inventory")}>
        Inventory
      </button>

      <button onClick={() => setPage("systemlog")}>
        System Log
      </button>

      <button onClick={() => setPage("settings")}>
        Settings
      </button>
      
            {/*button for daily streak test*/}
        <button onClick={testDailyReset}>
  🧪      Test Daily Reset
        </button>
      <hr />

      {page === "dashboard" && (
        <Dashboard player={player}
         streak={streak}
          dailyCompleted={dailyCompleted}
          />
      )}

      {page === "status" && (
        <Status
          player={player}
          setPlayer={setPlayer}
        />
      )}

      {page === "quests" && (
        <Quests
          player={player}
          setPlayer={setPlayer}
          quests={quests}
          setQuests={setQuests}
          achievements={achievements}
          setAchievements={setAchievements}
          titles={titles}
          setTitles={setTitles}
          inventory={inventory}
          setInventory={setInventory}
          logs={logs}
          setLogs={setLogs}
          streak={streak}
          setStreak={setStreak}
          weekly={weekly}
          setWeekly={setWeekly}
          dailyCompleted={dailyCompleted}
          setDailyCompleted={setDailyCompleted}

        />
      )}

      {page === "weekly" && (
       <WeeklyQuests
          weekly={weekly}
       />
      )}

      {page === "achievements" && (
        <Achievements achievements={achievements} />
      )}

      {page === "titles" && (
        <Titles titles={titles} />
      )}

        {/*INVENTORY COMPONENT RENDER */}
     {page === "inventory" && (
      <Inventory
         inventory={inventory}
         setInventory={setInventory}
         player={player}
         setPlayer={setPlayer}
         quests={quests}
         setQuests={setQuests}
        />
      )}

      {page === "systemlog" && (
        <SystemLog logs={logs} />
      )}

      {page === "settings" && (
        <Settings player={player} />
      )}
    </div>
  );
}

export default App;