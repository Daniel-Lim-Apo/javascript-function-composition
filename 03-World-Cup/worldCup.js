// Filter matches by a specific team.
// Calculate the total goals scored by that team.
// Determine the average goals per match for that team.

const matches = [
  { team1: "Brazil", team2: "Germany", goals1: 2, goals2: 0 },
  { team1: "Germany", team2: "Argentina", goals1: 1, goals2: 1 },
  { team1: "Brazil", team2: "Argentina", goals1: 1, goals2: 3 },
  { team1: "France", team2: "Brazil", goals1: 1, goals2: 3 },
  { team1: "France", team2: "Germany", goals1: 0, goals2: 2 },
];

// Function to filter matches by team
const filterMatchesByTeam = (team) => (matches) =>
  matches.filter((match) => match.team1 === team || match.team2 === team);

// Function to calculate total goals by team
const calculateTotalGoals = (team) => (matches) =>
  matches.reduce((total, match) => {
    if (match.team1 === team) {
      return total + match.goals1;
    } else if (match.team2 === team) {
      return total + match.goals2;
    }
    return total;
  }, 0);

// Function to calculate average goals per match
const calculateAverageGoals = (totalGoals, matches) =>
  totalGoals / matches.length;

// Compose function to chain the previous functions
const compose =
  (...functions) =>
  (initialValue) =>
    functions.reduceRight((value, func) => func(value), initialValue);

// Function to get average goals per match for a team
const getAverageGoalsForTeam = (team) => {
  const filteredMatches = filterMatchesByTeam(team)(matches);
  const totalGoals = calculateTotalGoals(team)(filteredMatches);
  return calculateAverageGoals(totalGoals, filteredMatches);
};

// Example usage
const team = "Brazil";
const averageGoals = getAverageGoalsForTeam(team);
console.log(`Average goals per match for ${team}: ${averageGoals}`);
