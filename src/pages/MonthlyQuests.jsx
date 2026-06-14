import { useState } from "react";

// ========================================
// MONTHLY QUESTS PAGE
// ========================================

function MonthlyQuests({
  monthly,
  setMonthly,
}) {
  const [amounts, setAmounts] = useState({});

  const addProgress = (index) => {
    const amount = Number(amounts[index]);

    if (!amount || amount <= 0) return;

    const updatedMonthly = [...monthly];

    updatedMonthly[index].progress += amount;

    if (
      updatedMonthly[index].progress >=
      updatedMonthly[index].target
    ) {
      updatedMonthly[index].progress =
        updatedMonthly[index].target;

      updatedMonthly[index].completed = true;
    }

    setMonthly(updatedMonthly);

    setAmounts({
      ...amounts,
      [index]: "",
    });
  };

  return (
    <div>
      <h2>Monthly Quests</h2>

      {monthly
        .filter((quest) => quest.unlocked !== false)
        .map((quest, index) => (
        <div key={index}>
          <p>{quest.name}</p>

          <p>
            Progress:
            {quest.progress} / {quest.target}{" "}
            {quest.unit || ""}
          </p>

          <p>
            Reward: {quest.reward}
          </p>

          {!quest.completed && (
            <>
              <input
                type="number"
                placeholder={`Add ${quest.unit || "amount"}`}
                value={amounts[index] || ""}
                onChange={(e) =>
                  setAmounts({
                    ...amounts,
                    [index]: e.target.value,
                  })
                }
              />

              <button
                onClick={() =>
                  addProgress(index)
                }
              >
                Add Progress
              </button>
            </>
          )}

          <p>
            Status:
            {quest.completed
              ? "✅ Completed"
              : "❌ In Progress"}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default MonthlyQuests;