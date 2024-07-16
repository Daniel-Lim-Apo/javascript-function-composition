// Function to calculate total points scored by a player
function calculatePoints(stats) {
  const { kills, blocks, aces } = stats;
  return kills * 1 + blocks * 1 + aces * 1; // Each action counts as 1 point
}

// Function to calculate player's efficiency rating
function calculateEfficiency(stats) {
  const points = calculatePoints(stats);
  const { attempts, errors } = stats;
  return {
    ...stats,
    points,
    efficiency: (points - errors) / attempts, // Simple efficiency formula
  };
}

// Function to generate a performance summary
function generateSummary(stats) {
  const { points, efficiency } = stats;
  return {
    points,
    efficiency,
    summary: `Player scored ${points} points with an efficiency rating of ${efficiency.toFixed(
      2
    )}`,
  };
}

// Higher-order function to compose functions
function compose(...fns) {
  return (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

// Example player stats
const playerStats = {
  kills: 20,
  blocks: 5,
  aces: 3,
  attempts: 40,
  errors: 7,
};

// Composed function to process player stats
const analyzePerformance = compose(generateSummary, calculateEfficiency);

// Generate performance summary
const performanceSummary = analyzePerformance(playerStats);

console.log(performanceSummary.summary);
