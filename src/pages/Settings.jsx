import { savePlayer } from "../utils/storage";

function Settings({ player }) {
 const handleSave = () => {
  localStorage.setItem("player", JSON.stringify(player));

  console.log(localStorage.getItem("player"));

  alert("Progress Saved!");
};
  return (
    <div>
      <h2>Settings</h2>

      <button onClick={handleSave}>
        Save Progress
      </button>
    </div>
  );
}

export default Settings;