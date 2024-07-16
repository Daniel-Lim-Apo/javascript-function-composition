// Sample App Paid Ride Vehicle trips data
const uberTrips = [
  { id: 1, date: "2023-06-01", distance: 5.2 },
  { id: 2, date: "2023-06-05", distance: 3.4 },
  { id: 3, date: "2023-06-10", distance: 10.5 },
  { id: 4, date: "2023-07-01", distance: 7.8 },
  { id: 5, date: "2023-07-05", distance: 2.3 },
  { id: 6, date: "2023-06-01", distance: 5.2 },
  { id: 7, date: "2023-06-05", distance: 3.4 },
  { id: 8, date: "2023-06-10", distance: 10.5 },
  { id: 9, date: "2023-07-01", distance: 7.8 },
  { id: 10, date: "2023-07-05", distance: 2.3 },
];

// Utility function to parse date strings
const parseDate = (dateStr) => new Date(dateStr);

// Function to filter trips by date range
const filterTripsByDate = (startDate, endDate) => (trips) => {
  return trips.filter((trip) => {
    const tripDate = parseDate(trip.date);
    return tripDate >= startDate && tripDate <= endDate;
  });
};

// Function to calculate total distance of trips
const calculateTotalDistance = (trips) => {
  return trips.reduce((total, trip) => total + trip.distance, 0);
};

// Function to apply discount based on distance threshold
const applyDiscount = (threshold, discountRate) => (distance) => {
  return distance > threshold ? distance * (1 - discountRate) : distance;
};

// Compose functions
const compose =
  (...fns) =>
  (initialValue) =>
    fns.reduceRight((value, fn) => fn(value), initialValue);

// Define date range
const startDate = parseDate("2023-06-01");
const endDate = parseDate("2023-06-30");

// Compose the functions for the desired pipeline
const processTrips = compose(
  applyDiscount(15, 0.1), // Apply a 10% discount if total distance is above 15
  calculateTotalDistance, // Calculate the total distance
  filterTripsByDate(startDate, endDate) // Filter trips by date range
);

// Execute the composed function with the Uber trips data
const result = processTrips(uberTrips);
console.log(`Total distance after discount: ${result}`);
