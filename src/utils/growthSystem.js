import { growthStages } from "../data/growthStages";

export const getCurrentGrowthStage = (
  daysSinceStart
) => {
  let currentStage = growthStages[0];

  for (const stage of growthStages) {
    if (daysSinceStart >= stage.days) {
      currentStage = stage;
    }
  }

  return currentStage;
};


// ========================================
// DAYS SINCE START
// ========================================
export const getDaysSinceStart = (
  startDate
) => {
  const start = new Date(startDate);

  const today = new Date();

  return Math.floor(
    (today - start) /
      (1000 * 60 * 60 * 24)
  );
};