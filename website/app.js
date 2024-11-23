const apiKey = `e47a270fe3a33a7fe2f42131261ecbea&units=imperial`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let formData = { date: newDate };

/* Global Variables */
// const app = document.getElementById("app");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const entryHolder = document.getElementById("entryHolder");

const handleFeelingsChange = (e) => {
  const { id, value } = e.target;

  formData.userResponse = value;
  console.log(formData);
};

feelings.addEventListener("change", handleFeelingsChange);

// call api to get the temprature using zip code
async function getTemp(zipCode) {
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    formData = { ...formData, temp: data.main.temp };
  } catch (error) {
    console.error(error);
  }
}

// Post to the backend

const postData = async (url = "", data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    // const newData = await response.json();
    // console.log(newData[0]);
    // return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const clearForm = () => {
  entryHolder.innerHTML = "";
  feelings.value = "";
  zip.value = "";
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allDatarecent = await request.json();
    const recentEntry = allDatarecent[allDatarecent.length - 1];
    document.getElementById("date").innerHTML = recentEntry.date;
    document.getElementById("temp").innerHTML = recentEntry.temp;
    document.getElementById("content").innerHTML = recentEntry.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};
const handleClick = () => {
  if (!zip.value) {
    alert("Please Enter zipcode!");
    return;
  }
  getTemp(zip.value).then(postData("/addEntry", formData)).then(updateUI());
  // .then(clearForm());
};

generateBtn.addEventListener("click", handleClick);
