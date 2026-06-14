import { useState, useEffect } from "react";

import {
  getDaysSinceStart,
} from "./utils/growthSystem";

import { generateDailyQuests }
from "./utils/generateDailyQuests";

// =====================================
// STORAGE IMPORTS
// =====================================

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


// =====================================
// GAME DATA IMPORTS
// =====================================

import { monthlyQuests } from "./data/monthlyQuests";
import { weeklyQuests } from "./data/weeklyQuests";
import { dailyQuests } from "./data/quests";
import { achievementsList } from "./data/achievements";
import { titlesList } from "./data/titles";
import { inventoryData } from "./data/inventory";


// =====================================
// PAGE COMPONENT IMPORTS
// =====================================

import MonthlyQuests from "./pages/MonthlyQuests";
import WeeklyQuests from "./pages/WeeklyQuests";
import Dashboard from "./pages/Dashboard";
import Status from "./pages/Status";
import Quests from "./pages/Quests";
import Achievements from "./pages/Achievements";
import Titles from "./pages/Titles";
import Inventory from "./pages/Inventory";
import Progression from "./pages/Progression";
import SystemLog from "./pages/SystemLog";
import Settings from "./pages/Settings";


// =====================================
// MAIN APP COMPONENT
// =====================================

function App() {

  // =====================================
  // PAGE NAVIGATION STATE
  // =====================================

  const [page, setPage] = useState("dashboard");


  // =====================================
  // ACHIEVEMENTS STATE
  // =====================================

  const [achievements, setAchievements] = useState(
    loadAchievements() || achievementsList
  );


  // =====================================
  // TITLES STATE
  // =====================================

  const [titles, setTitles] = useState(
    loadTitles() || titlesList
  );


  // =====================================
  // INVENTORY STATE
  // =====================================

  const [inventory, setInventory] = useState(
    loadInventory() || inventoryData
  );


 // =====================================
// PLAYER DATA STATE
// =====================================

const [player, setPlayer] = useState(
  loadPlayer() || {
   
name: "Vishal",
level: 1,
rank: "E",
exp: 0,
expToNextLevel: 110,
currentTitle: "The Beginner",

monthlyUnlocked: false,

// ========================================
// MONTHLY GATE EVENT SYSTEM
// ========================================
monthlyGateNotification: false,

monthlyGateKey: {
  unlocked: false,
  quantity: 0,
},

    // ========================================
    // ACCOUNT START DATE
    // ========================================
       startDate: new Date().toISOString(),

    // ========================================
    // LIFETIME PROGRESSION DATA
    // ========================================
      progression: {
      totalPushups: 0,
      totalSquats: 0,
      totalWalk: 0,
      totalTheory: 0,
      totalPractical: 0,
    },

    // ========================================
    // PLAYER STATS
    // ========================================
      stats: {
      strength: 10,
      endurance: 10,
      discipline: 10,
      knowledge: 10,
      confidence: 10,
    },
  }
);

  // =====================================
  // SYSTEM LOG STATE
  // =====================================

  const [logs, setLogs] = useState(
    loadLogs() || ["🚀 System Initialized"]
  );


  // =====================================
  // STREAK SYSTEM STATE
  // =====================================

  const [streak, setStreak] = useState(
    loadStreak()
  );


  // =====================================
  // DAILY COMPLETION COUNTER
  // =====================================

  const [dailyCompleted, setDailyCompleted] =
    useState(loadDailyCompleted());


  // =====================================
  // DAILY QUESTS STATE
  // =====================================

 const [quests, setQuests] = useState(
  loadQuests() ||
  generateDailyQuests(
    loadPlayer() || {
      startDate:
        new Date().toISOString(),
    }
  )
);

  // =====================================
  // WEEKLY QUESTS STATE
  // =====================================

  const [weekly, setWeekly] = useState(
    loadWeeklyQuests() || weeklyQuests
  );

  // monthly quest state
  const [monthly, setMonthly] = useState(
     monthlyQuests
  );

  // =====================================
  // DAYS PLAYED
  // =====================================
  const daysPlayed =
  getDaysSinceStart(player.startDate);
  console.log(player);
console.log(daysPlayed);


  // =====================================
  // DAILY RESET SYSTEM
  // =====================================

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


    // DAILY RESET TRIGGER
    if (diffDays >= 1) {

      // =====================================
      // STREAK CHECK
      // =====================================

      if (dailyCompleted >= 3) {

        setStreak((prev) => prev + 1);

        saveStreak(streak + 1);

        console.log(
          "🔥 Streak Increased"
        );

      // =====================================
      // STREAK SHIELD CHECK
      // =====================================

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


      // =====================================
      // RESET DAILY QUESTS
      // =====================================

    const resetDaily =
      generateDailyQuests(player);


      setQuests(resetDaily);

      localStorage.setItem(
        "quests",
        JSON.stringify(resetDaily)
      );


      // =====================================
      // RESET DAILY COMPLETION COUNTER
      // =====================================

      setDailyCompleted(0);
      saveDailyCompleted(0);


      // SAVE NEW RESET DATE

      saveDailyResetDate(today);


      console.log(
        "🔄 Daily Quests Reset"
      );
    }

  }, []);


  // =====================================
  // WEEKLY RESET SYSTEM
  // =====================================

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


    // =====================================
    // RESET EVERY 7 DAYS
    // =====================================

    if (diffDays >= 7) {

      // =====================================
      // LEVEL-BASED WEEKLY DIFFICULTY
      // =====================================

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

      // ======================================================
      // GENERATE NEW WEEKLY QUESTS
      // Resets progress and assigns new random targets
      // ======================================================

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



      // ======================================================
      // SAVE NEW WEEKLY QUESTS
      // ======================================================

      setWeekly(resetWeekly);

      localStorage.setItem(
        "weeklyQuests",
        JSON.stringify(resetWeekly)
      );



      // ======================================================
      // SAVE WEEKLY RESET DATE
      // Prevents multiple weekly resets
      // ======================================================

      saveWeeklyResetDate(today);



      // ======================================================
      // DEV LOG
      // ======================================================

      console.log(
        "🔄 Weekly Quests Reset"
      );

    }
  }, []);

  // =====================================
// MONTHLY GATE UNLOCK SYSTEM V2
// Hidden until Day 90
// Gives Gate Key + Triggers Unlock Event
// =====================================

useEffect(() => {

  if (
    daysPlayed >= 90 &&
    !player.monthlyGateKey?.unlocked
  ) {

    const updatedPlayer = {
      ...player,

      monthlyGateKey: {
        unlocked: true,
        quantity: 1,
      },

      monthlyGateNotification: true,
    };

    setPlayer(updatedPlayer);

    localStorage.setItem(
      "player",
      JSON.stringify(updatedPlayer)
    );

    console.log(
      "🗝️ Monthly Gate Key Granted"
    );
  }

}, [daysPlayed]);


  // ======================================================
  // TEST DAILY RESET BUTTON
  // Developer Tool
  // Simulates a new day
  // ======================================================

  const testDailyReset = () => {



    // ======================================================
    // STREAK SYSTEM
    // Requires minimum daily completions
    // ======================================================

    if (dailyCompleted >= 3) {

      setStreak(streak + 1);
      saveStreak(streak + 1);



      // ======================================================
      // STREAK SHIELD SYSTEM
      // Uses shield before breaking streak
      // ======================================================

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



    // ======================================================
    // RESET DAILY COMPLETION COUNTER
    // ======================================================

    setDailyCompleted(0);
    saveDailyCompleted(0);



    // ======================================================
    // RESET DAILY QUESTS
    // ======================================================

   const resetDaily =
  generateDailyQuests(player);

    setQuests(resetDaily);
    saveQuests(resetDaily);



    // ======================================================
    // DEV CONFIRMATION
    // ======================================================

    alert("🧪 Daily Reset Triggered");
  };

  //=====   MENU BUTTON STYLE   ============//
  const menuButtonStyle = (currentPage) => ({
  width: "100%",
  marginBottom: "12px",
  padding: "14px",

  background:
    page === currentPage
      ? "linear-gradient(90deg,#20123d,#32225d)"
      : "#0b1528",

  color: "white",

  border:
    page === currentPage
      ? "1px solid #8a63ff"
      : "1px solid #1a2742",

  borderRadius: "15px",

  boxShadow:
    page === currentPage
      ? "0 0 15px rgba(138,99,255,0.6)"
      : "none",

  cursor: "pointer",

  transition: "0.3s",
});

  // ======================================================
  // MAIN APP UI / PAGE RENDER
  // ======================================================

return (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      background: "#050816",
      color: "white",
    }}
  >

      {/* ==================================================
          APP HEADER
      ================================================== */}

     

{/* =====================================
    MONTHLY QUEST UNLOCK EVENT
===================================== */}
{player.monthlyGateNotification && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      backdropFilter: "blur(4px)",
    }}
  >
    <div
      style={{
        width: "500px",
        maxWidth: "90%",
        padding: "40px",
        background:
          "linear-gradient(180deg,#030712,#081425)",
        border: "2px solid rgba(0,229,255,0.6)",
        borderRadius: "12px",
        color: "#fff",
        textAlign: "center",
        boxShadow:
          "0 0 15px rgba(0,229,255,0.35), 0 0 50px rgba(0,229,255,0.15)",
      }}
    >
      {/* SYSTEM */}
      <h1
        style={{
          fontSize: "48px",
          letterSpacing: "8px",
          color: "#00e5ff",
          textShadow:
            "0 0 10px #00e5ff, 0 0 25px #00e5ff",
          margin: "0 0 25px 0",
        }}
      >
        SYSTEM
      </h1>

      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #00e5ff, transparent)",
          marginBottom: "25px",
        }}
      />

      {/* MESSAGE */}
      <div
        style={{
          color: "#8fdcff",
          fontSize: "16px",
          letterSpacing: "2px",
          marginBottom: "15px",
        }}
      >
        SYSTEM MESSAGE
      </div>

      <p
        style={{
          color: "#e6f8ff",
          fontSize: "15px",
          lineHeight: "1.8",
          marginBottom: "40px",
        }}
      >
        Your consistency has attracted the attention
        of the System.
        <br />
        A higher-tier quest category has been
        unlocked.
      </p>

      {/* UNLOCK */}
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#00e5ff",
          textShadow:
            "0 0 10px #00e5ff, 0 0 20px #00e5ff",
          marginBottom: "8px",
        }}
      >
        MONTHLY QUESTS
      </div>

      <div
        style={{
          color: "#7ddfff",
          fontSize: "14px",
          letterSpacing: "1px",
          marginBottom: "30px",
        }}
      >
        New Quest Category Unlocked
      </div>

      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #00e5ff, transparent)",
          marginBottom: "30px",
        }}
      />

      {/* ACCESS */}
      <div
        style={{
          color: "#a8eaff",
          fontSize: "13px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Authorization Complete
      </div>

      <div
        style={{
          color: "#00e5ff",
          fontSize: "26px",
          fontWeight: "bold",
          textShadow:
            "0 0 10px #00e5ff, 0 0 25px #00e5ff",
          marginBottom: "15px",
        }}
      >
        [ HIDDEN GATE OPENED ]
      </div>

      <div
        style={{
          color: "#cdefff",
          fontSize: "14px",
          lineHeight: "1.7",
          marginBottom: "35px",
        }}
      >
        Monthly-class missions are now available.
      </div>

      {/* BUTTON */}
      <button
        style={{
          padding: "12px 34px",
          background:
            "linear-gradient(180deg,#00e5ff,#00b8d4)",
          color: "#001018",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
          boxShadow:
            "0 0 12px #00e5ff, 0 0 25px rgba(0,229,255,0.4)",
        }}
        onClick={() => {
          const updatedPlayer = {
            ...player,
            monthlyUnlocked: true,
            monthlyGateNotification: false,
            monthlyGateKey: {
              unlocked: false,
              quantity: 0,
            },
            hiddenGatesCompleted:
              (player.hiddenGatesCompleted || 0) + 1,
            firstMonthlyVisit: true,
          };

          setPlayer(updatedPlayer);

          localStorage.setItem(
            "player",
            JSON.stringify(updatedPlayer)
          );

          setPage("monthly");
        }}
      >
        ENTER
      </button>
    </div>
  </div>
)}


{/* ======================================
    LEFT SIDEBAR
====================================== */}

<div
  style={{
    width: "150px",
    background: "#081425",
    padding: "20px",
    borderRight: "1px solid #1f2c47",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
  }}
>
  <h2
    style={{
      color: "#8a63ff",
      textShadow: "0 0 10px rgba(138,99,255,0.7)",
      marginBottom: "30px",
      textAlign: "center",
    }}
  >
    SYSTEM
  </h2>


  <button
    style={menuButtonStyle("dashboard")}
    onClick={() => setPage("dashboard")}
  >
    Dashboard
  </button>


  <button
    style={menuButtonStyle("status")}
    onClick={() => setPage("status")}
  >
    Status
  </button>


  <button
    style={menuButtonStyle("quests")}
    onClick={() => setPage("quests")}
  >
    Quests
  </button>


  <button
    style={menuButtonStyle("achievements")}
    onClick={() => setPage("achievements")}
  >
    Achievements
  </button>


  <button
    style={menuButtonStyle("titles")}
    onClick={() => setPage("titles")}
  >
    Titles
  </button>


  <button
    style={menuButtonStyle("inventory")}
    onClick={() => setPage("inventory")}
  >
    Inventory
  </button>


  <button
    style={menuButtonStyle("progression")}
    onClick={() => setPage("progression")}
  >
    Progression
  </button>


  <button
    style={menuButtonStyle("systemlog")}
    onClick={() => setPage("systemlog")}
  >
    Archives
  </button>


  <button
    style={menuButtonStyle("settings")}
    onClick={() => setPage("settings")}
  >
    Settings
  </button>


  {/* ========================
          TEST BUTTON
     ======================== */}

  <button
    style={menuButtonStyle("test")}
    onClick={testDailyReset}
  >
    🧪 Test
  </button>

</div>


<div
  style={{
    flex: 1,
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>

  


      {/* ==================================================
          DASHBOARD PAGE
      ================================================== */}

      {page === "dashboard" && (
        <Dashboard
          player={player}
          streak={streak}
          dailyCompleted={dailyCompleted}
        />
      )}



      {/* ==================================================
          STATUS PAGE
      ================================================== */}

      {page === "status" && (
        <Status
          player={player}
          setPlayer={setPlayer}
        />
      )}



      {/* ==================================================
          QUESTS PAGE
      ================================================== */}

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



      {/* ==================================================
          WEEKLY QUESTS PAGE
      ================================================== */}

      {page === "weekly" && (
        <WeeklyQuests
          weekly={weekly}
        />
      )}


      {page === "monthly" && (
        <MonthlyQuests
          monthly={monthly}
          setMonthly={setMonthly}
        />
      )}


      {/* ==================================================
          ACHIEVEMENTS PAGE
      ================================================== */}

      {page === "achievements" && (
        <Achievements
          achievements={achievements}
        />
      )}



      {/* ==================================================
          TITLES PAGE
      ================================================== */}

      {page === "titles" && (
        <Titles titles={titles} />
      )}



      {/* ==================================================
          INVENTORY PAGE
      ================================================== */}

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

        {/* ==================================================
            PROGRESSION PAGE
            ================================================== */}

          {page === "progression" && (
            <Progression player={player} />
          )}


      {/* ==================================================
          SYSTEM LOG PAGE
      ================================================== */}

      {page === "systemlog" && (
        <SystemLog logs={logs} />
      )}



      {/* ==================================================
          SETTINGS PAGE
      ================================================== */}

      {page === "settings" && (
        <Settings player={player} />
      )}


    </div>

    </div>
  );
}

export default App;