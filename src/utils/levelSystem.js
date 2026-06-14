// ========================================
// EXP REQUIRED FOR NEXT LEVEL
// ========================================

export const getExpRequired = (level) => {
  // Early Game
  if (level <= 50) {
    return 100 + level * 10;
  }

  // Mid Game
  if (level <= 150) {
    return 600 + (level - 50) * 15;
  }

  // Late Game
  if (level <= 300) {
    return 2100 + (level - 150) * 20;
  }

  // End Game
  return 5100 + (level - 300) * 25;
};