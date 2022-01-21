function formattedDate(date) {
  // let currentTime = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}


function displayForecast(response) {

  let forecast = response.data.daily; // Array 


  console.log(forecast);

  // for (let apple = 0; apple <= 10; apple = apple + 3) {
  //   console.log(apple);
  // }
  // Arrays are indexed starting from 0
  // Accessing the first value of an array        forecast[0]
  // Accessing the second value of an array       forecast[1]
  // etc..
  // The length of an array can be found by 
  // (assuming an array is assigned to the variable 'ray') ray.length
  let forecastElement = document.querySelector("#forecast");

  let html = '<div class="forecast-imgs row">';

  for (let grape = 1; grape < 5; grape++) {
    console.log(grape);
    console.log(forecast[grape]);

    // forecast[grape] will look like ....
    // {
    //   "dt": 12349127540981273
    //   "temp": {
    //     "min": 275.09,
    //     "max": 284.07,
    //   },
    //   "weather": [
    //     {
    //       "id": 500,
    //       "main": "Rain",
    //       "description": "light rain",
    //       "icon": "10d"
    //     }
    //   ],
    // }
    // Given this, what will the html look like for a single item in the array?

    // This is how you add strings together
    // "apple" + " " + "orange" = "apple orange"
    let date = new Date(forecast[grape].dt * 1000);

    let dayString = forecastDays(date);

    let loopHtml = `
    <div class="col-3 forecastItem">
      <div class="forecast-days">${dayString}
      </div>
      <div class="forecast-icon"> 
        <img src="https://openweathermap.org/img/wn/${forecast[grape].weather[0].icon}@2x.png"> 
      </div>
      <span>
        <span class="min-temp">${Math.round(forecast[grape].temp.min)}°| </span>
        <span class="max-temp">${Math.round(forecast[grape].temp.max)} °</span>
      </span>
    </div>`;




    // Insert code below

    html += loopHtml;
    /* First loop interation
    
    html = "<div>" + 'firstElementHtml'  = "<div>firstElementHtml"
    */

    /* Second loop interaction

    html = "<div>firstElementHtml" + "secondElementHtml" = "<div>firstElementHtmlsecondElementHtml"
    */


  }

  html += '</div>';

  forecastElement.innerHTML = html;

  // We can assume that the 'html' variable is ready to be inserted into our index.html page. We can do that with with the "innerHtml" property of an element.

}

function forecastDays(date) {
  // let currentTime = new Date();

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day}`;
}



function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`);

  getForecast(response.data.coord);

}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formattedDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(searchLocation);

