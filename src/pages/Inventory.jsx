import { inventory } from "../data/inventory";

function Inventory() {
  return (
    <div>
      <h2>Inventory</h2>

      <p>Streak Shield: {inventory.streakShield}</p>
      <p>Quest Skip: {inventory.questSkip}</p>
      <p>Time Crystal: {inventory.timeCrystal}</p>
      <p>EXP Scroll: {inventory.expScroll}</p>
    </div>
  );
}

export default Inventory;