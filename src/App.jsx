import { useState } from "react";

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

  return (
    <div>
      <h1>Solo Leveling System</h1>

      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("status")}>Status</button>
      <button onClick={() => setPage("quests")}>Quests</button>
      <button onClick={() => setPage("achievements")}>Achievements</button>
      <button onClick={() => setPage("titles")}>Titles</button>
      <button onClick={() => setPage("inventory")}>Inventory</button>
      <button onClick={() => setPage("systemlog")}>System Log</button>
      <button onClick={() => setPage("settings")}>Settings</button>

      <hr />

      {page === "dashboard" && <Dashboard />}
      {page === "status" && <Status />}
      {page === "quests" && <Quests />}
      {page === "achievements" && <Achievements />}
      {page === "titles" && <Titles />}
      {page === "inventory" && <Inventory />}
      {page === "systemlog" && <SystemLog />}
      {page === "settings" && <Settings />}
    </div>
  );
}

export default App;