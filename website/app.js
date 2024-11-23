const apiKey = `e47a270fe3a33a7fe2f42131261ecbea&units=imperial`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let formData = { date: newDate };

/* Global Variables */

const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");

const handleFeelingsChange = (e) => {
  const { id, value } = e.target;
  formData.userResponse = value;
};

// call api to get the temprature using zip code
async function getTemp(zipCode) {
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.main.temp;
  } catch (error) {
    console.error(error);
  }
}

// Post to the backend

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const clearForm = () => {
  feelings.value = "";
  zip.value = "";
};
const updateUI = (date, temp, userResponse) => {
  document.getElementById("date").innerHTML = date;
  document.getElementById("temp").innerHTML = temp;
  document.getElementById("content").innerHTML = userResponse;
};
const getData = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);

    updateUI(allData.date, allData.temp, allData.userResponse);
  } catch (error) {
    console.log("error", error);
  }
};
const handleClick = () => {
  if (!zip.value) {
    alert("Please Enter zipcode!");
    return;
  }

  getTemp(zip.value)
    .then((temp) => postData("/addEntry", { ...formData, temp: temp }))
    .then(() => getData())
    .then(clearForm());
};

// Event listener
generateBtn.addEventListener("click", handleClick);
feelings.addEventListener("change", handleFeelingsChange);
