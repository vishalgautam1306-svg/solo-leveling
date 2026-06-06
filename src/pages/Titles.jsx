import { titles } from "../data/titles";

function Titles() {
  return (
    <div>
      <h2>Owned Titles</h2>

      {titles.map((title, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  );
}

export default Titles;