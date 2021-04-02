// Dependencies

const express = require("express");
const path = require("path");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Storage arrays for input

reservations = [];
waitlist = [];

// Routes

// A route for the homepage
// Check on route
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// A route for the reservation page
app.get("/reserve", (req, res) =>
  res.sendFile(path.join(__dirname, "reserve.html"))
);

// A route for the table viewing
app.get("/tables", (req, res) =>
  res.sendFile(path.join(__dirname, "tables.html"))
);

// A route for the table api
app.get("/api/reservations", (req, res) => res.json(reservations));

// A route for the wait-list api
app.get("/api/waitlist", (req, res) => res.json(waitlist));

// A route to post new reservations
app.post("/api/reservations", (req, res) => {
  const newReservation = req.body;
  console.log(newReservation);
  // Check on route name depending on input fields
  // But for now, mimic star wars idea.
  newReservation.routeName = newReservation.name
    .replace(/\s+/g, "")
    .toLowerCase();

  // reservations.push(newReservation);
  if (reservations.length < 5) {
    reservations.push(newReservation);
  } else {
    waitlist.push(newReservation);
  }
  res.json(newReservation);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
