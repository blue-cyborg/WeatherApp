//define the date and time
function formatDate(timestamp){
let date = new Date(timestamp);
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

let day = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();
let currentYear = date.getFullYear();
let time = date.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit"
});
return `${day}, ${currentMonth} ${currentDate} ${currentYear}, ${time}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function(day){
    forecastHTML = forecastHTML + 
    `
     <div class="col-2">
      <div class="weather-forcast-date">${day}</div>
        <img
         src="http://openweathermap.org/img/wn/50d@2x.png"
         alt=""
         width="65"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </
          span>
          <span class="weather-forecast-temperature-min"> 12° </
          span>
        </div>
      </div>
      `;
})

forecastHTML = forecastHTML+`</div>`
forecastElement.innerHTML = forecastHTML;

}
//search engine and display infor//
function displayTemperature(response) {
 let cityElement = document.querySelector("#city-name");
 let humid = response.data.main.humidity;
 let humidityElement = document.querySelector("#humidity-read");
 let precipitation = Math.round(response.data.main.temp);
 let precipitationElement = document.querySelector("#precip-read"); 
 let wind = Math.round(response.data.wind.speed);
 let windElement = document.querySelector("#wind-read");
 let feel = Math.round(response.data.main.feels_like);
 let feelElement = document.querySelector("#feel-read");
 let temp = Math.round(response.data.main.temp);
 let temperatureElement = document.querySelector("#read-out");
 let description = response.data.weather[0].main;
 let descriptionElement = document.querySelector("#describe-read");
 let dateElement = document.querySelector("#current-data");
 let visualElement = document.querySelector("#representation");
 
 farenheitTemp = response.data.main.temp;

 cityElement.innerHTML = response.data.name;
 humidityElement.innerHTML = `Humidity: ${humid}%`;
 precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;
 windElement.innerHTML = `Wind Speed: ${wind} km/h`;
 feelElement.innerHTML = `It feels like ${feel}°F`;
 temperatureElement.innerHTML = `${temp}°F`;
 descriptionElement.innerHTML = `Currently: ${description}`;
 dateElement.innerHTML = formatDate(response.data.dt * 1000)
 visualElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
let apiKey = "63b79185d21891dc86fad86aa0ab0b0b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature)
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value)
}

function fetchCurrent(position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "63b79185d21891dc86fad86aa0ab0b0b";
  let urlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(urlPosition).then(displayTemperature);
}
function retrievePosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(fetchCurrent);
}

function fToC(event){
  event.preventDefault();
  let celsiusTemperature = (5/9)*((farenheitTemp)-32);
  let consiseCelsius = Math.round(celsiusTemperature);
  let conversion = document.querySelector("#read-out");
  conversion.innerHTML = `${consiseCelsius}°C`;
}

function cToF(event){
  event.preventDefault();
  let fAgain = Math.round(farenheitTemp);
  let revert = document.querySelector("#read-out");
  revert.innerHTML = `${fAgain}°F`;
}

let farenheitTemp = null;

let fetchCurrentData = document.querySelector("#your-location");
fetchCurrentData.addEventListener("click", retrievePosition);

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let fTempLink = document.querySelector("#fTemp");
fTempLink.addEventListener("click", cToF);

let cTempLink = document.querySelector("#cTemp");
cTempLink.addEventListener("click", fToC);

search("Rochester");
displayForecast();