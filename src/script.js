//show current day of week and time in the gradient area.
//week 4 homework outcome
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let dateTime = document.querySelector("#current-data");
dateTime.innerHTML = `Your current time is ${day} ${hour}:${minute}`;

//Begin search engine section
//This is what I want to do with that api call.
//I want to alter the display to give the results of the call.
function alterDisplayWindows(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let displayMyTemp = document.querySelector("#read-out");
  displayMyTemp.innerHTML = `${temp}°F`;

  let currentConditions = document.querySelector("p.weather-visual");
  currentConditions.innerHTML = response.data.weather.description;

  let weatherVisual = document.querySelector("p.weather-visual");
  if (response.data.weather[0].main === "Clear") {
    currentConditions.innerHTML = "🌞";
  }
  if (response.data.weather[0].main === "Clouds") {
    currentConditions.innerHTML = "⛅";
  }
  if (response.data.weather[0].main === "Drizzle") {
    currentConditions.innerHTML = "☂️";
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    currentConditions.innerHTML = "⛈️";
  }
  if (response.data.weather[0].main === "Rain") {
    currentConditions.innerHTML = "☂️";
  }
  if (response.data.weather[0].main === "Snow") {
    currentConditions.innerHTML = "❄️";
  }
}
//Step 2
//the city name is going to go in the display area as the query selctor allows altering HTML.
//There is an api call to get weather info.

function searchEngine(event) {
  event.preventDefault();
  let endUserInput = document.querySelector("#city-input");
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = `${endUserInput.value}`;
  let apiKey = "63b79185d21891dc86fad86aa0ab0b0b";
  let city = endUserInput.value;
  let units = "imperial";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlSearch).then(alterDisplayWindows);
}
//Step 1
//This is where the enduser types in what city they want weather for.
let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("submit", searchEngine);

//The My Current Location Button
function displayHometown(response) {
  let lonLatTemp = document.querySelector("#read-out");
  let temperature = Math.round(response.data.main.temp);
  let yourLocation = `${response.data.name}`;
  lonLatTemp.innerHTML = `${temperature}°F`;

  let geoCity = document.querySelector("#city-name");
  geoCity.innerHTML = `${yourLocation}`;

  let currentConditions = document.querySelector("p.weather-visual");
  currentConditions.innerHTML = response.data.weather.description;

  let locationVisual = document.querySelector("p.weather-visual");
  if (response.data.weather[0].main === "Clear") {
    currentConditions.innerHTML = "🌞";
  }
  if (response.data.weather[0].main === "Clouds") {
    currentConditions.innerHTML = "⛅";
  }
  if (response.data.weather[0].main === "Drizzle") {
    currentConditions.innerHTML = "☂️";
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    currentConditions.innerHTML = "⛈️";
  }
  if (response.data.weather[0].main === "Rain") {
    currentConditions.innerHTML = "☂️";
  }
  if (response.data.weather[0].main === "Snow") {
    currentConditions.innerHTML = "❄️";
  }
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "63b79185d21891dc86fad86aa0ab0b0b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayHometown);
}
function getMyLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#your-location");
currentLocation.addEventListener("click", getMyLocation);
//the f button
//week 4 homework outcome
function fahrenheit(event) {
  event.preventDefault();
  let giveF = document.querySelector("#read-out");
  giveF.innerHTML = `77°f`;
}
let tempF = document.querySelector("#temp-f");
tempF.addEventListener("click", fahrenheit);
//the c button
//week 4 homework outcome
function celsius(event) {
  event.preventDefault();
  let giveC = document.querySelector("#read-out");
  giveC.innerHTML = `25°c`;
}
let tempC = document.querySelector("#temp-c");
tempC.addEventListener("click", celsius);
