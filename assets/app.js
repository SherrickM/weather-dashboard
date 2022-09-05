let apiKey = "b7b4f799d7d9bb45e8fdc8399f73667a";

let cityInput = document.getElementById("enter-city");
let searchBtn = document.querySelector(".search-form");
let clearBtn = document.getElementById("clear-history");
let storedCities = JSON.parse(localStorage.getItem("cities")) || [];

function userInput(event) {
  if (!cityInput.value) {
    return;
  }
  event.preventDefault();
  fetchCoordinates(cityInput.value);
}

// function to get the weather
function getWeather(data) {
  console.log(data);
  let lon = data.coord.lon;
  let lat = data.coord.lat;
  let city = data.name;
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
        // current weather
        let currentConditionsEl = document.getElementById("currentConditions");
        currentConditionsEl.innerHTML ='';
        currentConditionsEl.classList.add("border");
      currentConditionsEl.classList.add("border-primary");

      // create city name element and display
      let cityNameEl = document.createElement("h2");
      cityNameEl.textContent = city;
      currentConditionsEl.append(cityNameEl);

      // get date from results
      let currentCityDate = res.current.dt;
      currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
      let currentDateEl = document.createElement("span");
      currentDateEl.textContent = ` (${currentCityDate}) `;
      cityNameEl.append(currentDateEl);

      // get weather icon and display
      let currentCityWeatherIcon = res.current.weather[0].icon;
      let currentWeatherIconEl = document.createElement("img");
      currentWeatherIconEl.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png"
      );
      cityNameEl.append(currentWeatherIconEl);

      // get current temp res and display
      let currentCityTemp = res.current.temp;
      let currentTempEl = document.createElement("p");
      currentTempEl.textContent = `Temp: ${currentCityTemp}°F`;
      currentConditionsEl.append(currentTempEl);

      // get current wind speed and display
      let currentCityWind = res.current.wind_speed;
      let currentWindEl = document.createElement("p");
      currentWindEl.textContent = `Wind: ${currentCityWind} MPH`;
      currentConditionsEl.append(currentWindEl);

      // get current humidity and display
      let currentCityHumidity = res.current.humidity;
      let currentHumidityEl = document.createElement("p");
      currentHumidityEl.textContent = `Humidity: ${currentCityHumidity}%`;
      currentConditionsEl.append(currentHumidityEl);

      // get current UV index,
      let currentCityUV = res.current.uvi;
      let currentUvEl = document.createElement("p");
      let currentUvSpanEl = document.createElement("span");
      currentUvEl.append(currentUvSpanEl);

      currentUvSpanEl.textContent = `UV: ${currentCityUV}`;


      currentConditionsEl.append(currentUvEl);
      // 5 - Day Forecast
      // create 5 Day Forecast <h2> header
      let fiveDayForecastHeaderEl = document.getElementById(
          "fiveDayForecastHeader"
          );
          let fiveDayHeaderEl = document.createElement("h2");
          fiveDayHeaderEl.textContent = "5-Day Forecast:";
          fiveDayForecastHeaderEl.append(fiveDayHeaderEl);
          
          let fiveDayForecastEl = document.getElementById("fiveDayForecast");
          fiveDayForecastEl.innerHTML =''

      // get key weather info from API res for five day forecast and display
      for (let i = 1; i <= 5; i++) {
        let date;
        let temp;
        let icon;
        let wind;
        let humidity;

        date = res.daily[i].dt;
        date = moment.unix(date).format("MM/DD/YYYY");

        temp = res.daily[i].temp.day;
        icon = res.daily[i].weather[0].icon;
        wind = res.daily[i].wind_speed;
        humidity = res.daily[i].humidity;

        // create a card
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("m-1");
        card.classList.add("col-2");

        // create card body and append
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `<h6>${date}</h6>
                                    <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                     ${temp}°C<br>
                                     ${wind} KPH <br>
                                     ${humidity}%`;

        card.appendChild(cardBody);
        fiveDayForecastEl.append(card);
      }
    });
}

function addToSearchHistory(city) {
  if (storedCities.indexOf(city) !== -1) {
    return;
  }
  storedCities.push(city);
  localStorage.setItem("cities", JSON.stringify(storedCities));
  searchHistory();
}

// Display search history
function searchHistory() {
  let pastSearchesEl = document.getElementById("past-searches");

  pastSearchesEl.innerHTML = "";

  for (i = 0; i < storedCities.length; i++) {
    let pastCityBtn = document.createElement("button");
    pastCityBtn.classList.add("btn");
    pastCityBtn.classList.add("btn-primary");
    pastCityBtn.classList.add("my-2");
    pastCityBtn.classList.add("past-city");
    pastCityBtn.setAttribute("style", "width: 100%");
    pastCityBtn.textContent = `${storedCities[i]}`;
    pastCityBtn.setAttribute('value', storedCities[i])
    pastCityBtn.onclick = runSearchHistoryBtn
    pastSearchesEl.appendChild(pastCityBtn);
  }
}
function runSearchHistoryBtn(e){
    fetchCoordinates(e.target.value)
}

function onLoad() {
  if (storedCities) {
    searchHistory();
  }
}

function fetchCoordinates(city) {
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      addToSearchHistory(city);
      getWeather(data);
    });
}

// // Clear Search History
function clearHistory(event) {
  event.preventDefault();
  let pastSearchesEl = document.getElementById("past-searches");

  localStorage.removeItem("cities");
  pastSearchesEl.innerHTML = "";
}

function clearCurrentCityWeather() {
  let currentConditionsEl = document.getElementById("currentConditions");
  currentConditionsEl.innerHTML = "";

  let fiveDayForecastHeaderEl = document.getElementById(
    "fiveDayForecastHeader"
  );
  fiveDayForecastHeaderEl.innerHTML = "";

  let fiveDayForecastEl = document.getElementById("fiveDayForecast");
  fiveDayForecastEl.innerHTML = "";
}

clearBtn.onclick = clearHistory;

// pastSearchedCitiesEl.onclick= getPastCity;
searchBtn.onclick = userInput;
onLoad();
