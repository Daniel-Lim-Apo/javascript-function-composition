// fuelSpaceship: Adds fuel to the spaceship.
// launchSpaceship: Launches the spaceship.
// navigateSpaceship: Navigates the spaceship to a destination.
// landSpaceship: Lands the spaceship.

// Function to fuel the spaceship
function fuelSpaceship(spaceship) {
  return {
    ...spaceship,
    fuel: spaceship.fuel + 100,
    status: "Fueled",
  };
}

// Function to launch the spaceship
function launchSpaceship(spaceship) {
  if (spaceship.fuel > 0) {
    return {
      ...spaceship,
      status: "Launched",
    };
  } else {
    throw new Error("Not enough fuel to launch");
  }
}

// Function to navigate the spaceship
function navigateSpaceship(destination) {
  return function (spaceship) {
    if (spaceship.status === "Launched") {
      return {
        ...spaceship,
        destination: destination,
        status: "Navigating",
      };
    } else {
      throw new Error("Spaceship must be launched before navigating");
    }
  };
}

// Function to land the spaceship
function landSpaceship(spaceship) {
  if (spaceship.status === "Navigating") {
    return {
      ...spaceship,
      status: "Landed",
    };
  } else {
    throw new Error("Spaceship must be navigating to land");
  }
}

// Function composition utility
function compose(...functions) {
  return function (initialValue) {
    return functions.reduce(
      (value, currentFunction) => currentFunction(value),
      initialValue
    );
  };
}

// Define the spaceship object
const spaceship = {
  name: "Galactic Cruiser",
  fuel: 0,
  status: "Ready",
};

// Compose the functions to model the entire journey
const spaceshipJourney = compose(
  fuelSpaceship,
  launchSpaceship,
  navigateSpaceship("Mars"),
  landSpaceship
);

// Execute the composed function
try {
  const finalState = spaceshipJourney(spaceship);
  console.log(finalState);
} catch (error) {
  console.error(error.message);
}
