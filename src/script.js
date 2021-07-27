//This is for putting the current date and time in the gradient display.
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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentYear = now.getFullYear();
let time = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit"
});
let dateTime = document.querySelector("#current-data");
dateTime.innerHTML = `${day}, ${currentMonth} ${currentDate} ${currentYear}, ${time}`;

//Begin search engine section
//This is what I want to do with that api call.
//I want to alter the display to give the results of the call.
function alterDisplayWindows(response) {
  console.log(response.data.name);
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let displayMyTemp = document.querySelector("#read-out");
  displayMyTemp.innerHTML = `${temp}°F`;

  let humid = response.data.main.humidity;
  console.log(humid);
  let displayMyHumidity = document.querySelector("#humidity-read");
  displayMyHumidity.innerHTML = `humidity: ${humid}%`;

  let wind = Math.round(response.data.wind.speed);
  console.log(wind);
  let displayMyWindsp = document.querySelector("#wind-read");
  displayMyWindsp.innerHTML = `wind speed: ${wind} km/h`;

  let locationVisual = document.querySelector("p.weather-visual");
  if (response.data.weather[0].main === "Clear") {
    locationVisual.innerHTML = "🌞";
  }
  if (response.data.weather[0].main === "Clouds") {
    locationVisual.innerHTML = "⛅";
  }
  if (response.data.weather[0].main === "Drizzle") {
    locationVisual.innerHTML = "☂️";
  }
  if (response.data.weather[0].main === "Thunderstorm") {
    locationVisual.innerHTML = "⛈️";
  }
  if (response.data.weather[0].main === "Rain") {
    locationVisual.innerHTML = "☂️";
  }
  if (response.data.weather[0].main === "Snow") {
    locationVisual.innerHTML = "❄️";
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

//end search engine button info

//The My Current Location Button
function displayHometown(response) {
  let lonLatTemp = document.querySelector("#read-out");
  let temperature = Math.round(response.data.main.temp);
  let yourLocation = `${response.data.name}`;
  lonLatTemp.innerHTML = `${temperature}°F`;

  let geoCity = document.querySelector("#city-name");
  geoCity.innerHTML = `${yourLocation}`;

  let humid = response.data.main.humidity;
  console.log(humid);
  let displayMyHumidity = document.querySelector("#humidity-read");
  displayMyHumidity.innerHTML = `humidity: ${humid}%`;

  let wind = Math.round(response.data.wind.speed);
  console.log(wind);
  let displayMyWindsp = document.querySelector("#wind-read");
  displayMyWindsp.innerHTML = `wind speed: ${wind} km/h`;

  let currentConditions = document.querySelector("p.weather-visual");
  currentConditions.innerHTML = response.data.weather.description;

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
//end of geolocation section
