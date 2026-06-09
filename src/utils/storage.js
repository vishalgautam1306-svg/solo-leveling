// ========================================
// PLAYER DATA
// ========================================
export const savePlayer = (player) => {
  localStorage.setItem("player", JSON.stringify(player));
};

export const loadPlayer = () => {
  const savedPlayer = localStorage.getItem("player");

  if (savedPlayer) {
    return JSON.parse(savedPlayer);
  }

  return null;
};


// ========================================
// DAILY QUEST DATA
// ========================================
export const saveQuests = (quests) => {
  localStorage.setItem("quests", JSON.stringify(quests));
};

export const loadQuests = () => {
  const savedQuests = localStorage.getItem("quests");

  if (savedQuests) {
    return JSON.parse(savedQuests);
  }

  return null;
};


// ========================================
// ACHIEVEMENTS DATA
// ========================================
export const saveAchievements = (achievements) => {
  localStorage.setItem(
    "achievements",
    JSON.stringify(achievements)
  );
};

export const loadAchievements = () => {
  const savedAchievements =
    localStorage.getItem("achievements");

  if (savedAchievements) {
    return JSON.parse(savedAchievements);
  }

  return null;
};


// ========================================
// TITLES DATA
// ========================================
export const saveTitles = (titles) => {
  localStorage.setItem(
    "titles",
    JSON.stringify(titles)
  );
};

export const loadTitles = () => {
  const savedTitles =
    localStorage.getItem("titles");

  if (savedTitles) {
    return JSON.parse(savedTitles);
  }

  return null;
};


// ========================================
// INVENTORY DATA
// ========================================
export const saveInventory = (inventory) => {
  localStorage.setItem(
    "inventory",
    JSON.stringify(inventory)
  );
};

export const loadInventory = () => {
  const savedInventory =
    localStorage.getItem("inventory");

  if (savedInventory) {
    return JSON.parse(savedInventory);
  }

  return null;
};


// ========================================
// SYSTEM LOG DATA
// ========================================
export const saveLogs = (logs) => {
  localStorage.setItem(
    "systemLogs",
    JSON.stringify(logs)
  );
};

export const loadLogs = () => {
  const savedLogs =
    localStorage.getItem("systemLogs");

  if (savedLogs) {
    return JSON.parse(savedLogs);
  }

  return null;
};


// ========================================
// STREAK DATA
// ========================================
export const saveStreak = (streak) => {
  localStorage.setItem(
    "streak",
    JSON.stringify(streak)
  );
};

export const loadStreak = () => {
  const savedStreak =
    localStorage.getItem("streak");

  if (savedStreak) {
    return JSON.parse(savedStreak);
  }

  return 0;
};


// ========================================
// WEEKLY QUEST DATA
// ========================================
export const saveWeeklyQuests = (weekly) => {
  localStorage.setItem(
    "weeklyQuests",
    JSON.stringify(weekly)
  );
};

export const loadWeeklyQuests = () => {
  const savedWeekly =
    localStorage.getItem("weeklyQuests");

  if (savedWeekly) {
    return JSON.parse(savedWeekly);
  }

  return null;
};


// ========================================
// WEEKLY RESET DATE
// ========================================
export const saveWeeklyResetDate = (date) => {
  localStorage.setItem(
    "weeklyResetDate",
    JSON.stringify(date)
  );
};

export const loadWeeklyResetDate = () => {
  const savedDate =
    localStorage.getItem("weeklyResetDate");

  if (savedDate) {
    return JSON.parse(savedDate);
  }

  return null;
};


// ========================================
// DAILY RESET DATE
// ========================================
export const saveDailyResetDate = (date) => {
  localStorage.setItem(
    "dailyResetDate",
    JSON.stringify(date)
  );
};

export const loadDailyResetDate = () => {
  const savedDate =
    localStorage.getItem("dailyResetDate");

  if (savedDate) {
    return JSON.parse(savedDate);
  }

  return null;
};


// ========================================
// DAILY COMPLETION COUNTER
// ========================================
export const saveDailyCompleted = (
  dailyCompleted
) => {
  localStorage.setItem(
    "dailyCompleted",
    JSON.stringify(dailyCompleted)
  );
};

export const loadDailyCompleted = () => {
  const savedDailyCompleted =
    localStorage.getItem("dailyCompleted");

  if (savedDailyCompleted) {
    return JSON.parse(savedDailyCompleted);
  }

  return 0;
};