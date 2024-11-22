// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let data = { date: newDate };

/* Global Variables */
const app = document.getElementById("app");
const generateBtn = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");

const handleChange = (e) => {
  console.log(e.target.value);

  const { id, value } = e.target;

  data = { [id]: value, ...data };
  console.log(data);
};

app.addEventListener("keypress", handleChange);

// Post to the backend

const postData = async (url = "", data = {}) => {
  //   console.log(data);
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
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// postData("/add", { answer: 42 });
