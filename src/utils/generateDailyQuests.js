// ========================================
// IMPORTS
// ========================================

import {
  getDaysSinceStart,
  getCurrentGrowthStage,
} from "./growthSystem";

// ========================================
// GENERATE DAILY QUESTS
// ========================================

export const generateDailyQuests = (
  player
) => {
  const days =
    getDaysSinceStart(player.startDate);

  const stage =
    getCurrentGrowthStage(days);


const pushupExp =
  Math.floor(stage.pushups * 2);

const squatExp =
  Math.floor(stage.squats * 1.5);

const walkExp =
  Math.floor(stage.walk / 50);

const studyExp =
  Math.floor(stage.theory);

  return [
    {
      name: "Pushups",
      target: stage.pushups,
      completed: false,
      exp: pushupExp,
    },

    {
      name: "Squats",
      target: stage.squats,
      completed: false,
      exp: squatExp,
    },

    {
      name: "Walk",
      target: stage.walk,
      unit: "m",
      completed: false,
      exp: walkExp,
    },

    {
      name: "Theory Study",
      target: stage.theory,
      unit: "min",
      completed: false,
      exp: studyExp,
    },

    {
      name: "Practical Study",
      target: stage.practical,
      unit: "min",
      completed: false,
      exp: studyExp,
    },
  ];
};