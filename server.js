projectData = [];
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
  console.log(`running on localhost: ${port} http://localhost:${port}`);
}

// GET route

app.get("/all", sendData);

function sendData(request, response) {
  response.send(projectData);
}
// Post route
app.post("/addEntry", updatData);

function updatData(request, response) {
  console.log(request.body);

  // expect 3 params for the post request temp, date and user response
  newEntry = {
    date: request.body.date,
    temp: request.body.temp,
    userResponse: request.body.userResponse,
  };

  projectData.push(newEntry);
}
