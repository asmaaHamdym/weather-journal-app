const apiKey = `e47a270fe3a33a7fe2f42131261ecbea&units=imperial`;
projectData = {
  date: "",
  userResponse: "",
  country: "",
  city: "",
  temp: "",
};
const port = 3000;

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

// call api to convert zip code to lat and lon values
async function getLatLon(zipCode) {
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);

    return [data.lat, data.lon];
  } catch (error) {
    console.error(error);
  }
}

getLatLon("73301");

// GET route
app.get("/all", sendData);

function sendData(request, response) {
  response.send(projectData);
}

app.get("/add", sendData);

function sendData(request, response) {
  // expect 3 params for the post request temp, date and user response
  console.log(request.body);

  projectData = [...projectData, request.body];
  console.log(projectData);
}
