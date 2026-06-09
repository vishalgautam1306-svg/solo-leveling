import { useState } from "react";


// ========================================
// INVENTORY COMPONENT
// ========================================

function Inventory({
  inventory,
  setInventory,
  player,
  setPlayer,
  quests,
  setQuests,
}) {

  // ========================================
  // UI STATES
  // ========================================

  const [showQuestSkip, setShowQuestSkip] =
    useState(false);


  // ========================================
  // INVENTORY ITEMS DATA
  // ========================================

  const items = [
    {
      name: "🛡️ Streak Shield",
      quantity: inventory.streakShield,
      description:
        "Protects your streak if you miss one day.",
    },
    {
      name: "⏭️ Quest Skip",
      quantity: inventory.questSkip,
      description:
        "Skip one daily quest.",
      usable: true,
      action: "skip",
    },
    {
      name: "💎 Time Crystal",
      quantity: inventory.timeCrystal,
      description:
        "Refresh all daily quests.",
      usable: true,
      action: "crystal",
    },
    {
      name: "📜 EXP Scroll",
      quantity: inventory.expScroll,
      description:
        "Grants bonus EXP when used.",
      usable: true,
      action: "scroll",
    },
  ];


  // ========================================
  // DEV TEST LOOT
  // ========================================

  const addTestLoot = () => {
    inventory.timeCrystal += 1;
    inventory.expScroll += 1;
    inventory.questSkip += 1;

    localStorage.setItem(
      "inventory",
      JSON.stringify(inventory)
    );

    alert(
      "🎁 Received:\n+1 Time Crystal\n+1 EXP Scroll"
    );

    window.location.reload();
  };


  // ========================================
  // EXP SCROLL SYSTEM
  // ========================================

  const useExpScroll = () => {
    if (inventory.expScroll <= 0) {
      alert("❌ No EXP Scrolls Available");
      return;
    }

    const expGain = 50;

    const updatedInventory = {
      ...inventory,
      expScroll: inventory.expScroll - 1,
    };

    const updatedPlayer = {
      ...player,
      exp: player.exp + expGain,
    };

    setInventory(updatedInventory);

    localStorage.setItem(
      "inventory",
      JSON.stringify(updatedInventory)
    );

    setPlayer(updatedPlayer);

    localStorage.setItem(
      "player",
      JSON.stringify(updatedPlayer)
    );

    alert(
      `📜 EXP SCROLL USED\n\n+${expGain} EXP`
    );
  };


  // ========================================
  // TIME CRYSTAL SYSTEM
  // ========================================

  const useTimeCrystal = () => {
    if (inventory.timeCrystal <= 0) {
      alert("❌ No Time Crystals Available");
      return;
    }

    const updatedInventory = {
      ...inventory,
      timeCrystal: inventory.timeCrystal - 1,
    };

    const refreshedQuests = quests.map((quest) => ({
      ...quest,
      completed: false,
    }));

    setInventory(updatedInventory);

    localStorage.setItem(
      "inventory",
      JSON.stringify(updatedInventory)
    );

    setQuests(refreshedQuests);

    localStorage.setItem(
      "quests",
      JSON.stringify(refreshedQuests)
    );

    alert(
      "💎 TIME CRYSTAL USED\n\nDaily Quests Refreshed"
    );
  };


  // ========================================
  // INVENTORY PAGE UI
  // ========================================

  return (
    <div>

      {/* ========================================
          INVENTORY HEADER
      ======================================== */}

      <h2>🎒 Inventory</h2>


      {/* ========================================
          DEV TEST BUTTON
      ======================================== */}

      <button onClick={addTestLoot}>
        🎁 Add Test Loot
      </button>

      <hr />


      {/* ========================================
          INVENTORY ITEM LIST
      ======================================== */}

      {items.map((item, index) => (
        <div key={index}>

          <p>
            <strong>{item.name}</strong>
          </p>

          <p>Quantity: {item.quantity}</p>

          <p>{item.description}</p>


          {/* ========================================
              EXP SCROLL BUTTON
          ======================================== */}

          {item.usable &&
            item.quantity > 0 &&
            item.action === "scroll" && (
              <button onClick={useExpScroll}>
                Use Item
              </button>
          )}


          {/* ========================================
              TIME CRYSTAL BUTTON
          ======================================== */}

          {item.usable &&
            item.quantity > 0 &&
            item.action === "crystal" && (
              <button onClick={useTimeCrystal}>
                Use Item
              </button>
          )}


          {/* ========================================
              QUEST SKIP BUTTON
          ======================================== */}

          {item.usable &&
            item.quantity > 0 &&
            item.action === "skip" && (
              <button
                onClick={() => setShowQuestSkip(true)}
              >
                Use Item
              </button>
          )}

          <hr />

        </div>
      ))}


      {/* ========================================
          QUEST SKIP POPUP
      ======================================== */}

      {showQuestSkip && (
        <div>

          <hr />

          <h3>⏭️ Select Quest To Skip</h3>


          {/* ========================================
              INCOMPLETE QUEST LIST
          ======================================== */}

          {quests
            .filter((quest) => !quest.completed)
            .map((quest, index) => (
              <div key={index}>
                <button>
                  {quest.name}
                </button>
              </div>
          ))}

          <br />


          {/* ========================================
              CLOSE POPUP BUTTON
          ======================================== */}

          <button
            onClick={() => setShowQuestSkip(false)}
          >
            Close
          </button>

          <hr />

        </div>
      )}

    </div>
  );
}

export default Inventory;