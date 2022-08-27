let APIkey = "d4f628acb4cbca3bd74c04306a7eb147";

let cityInputEl = $('#enter-city');
let searchBtn = $('#search-button');
let clearBtn = $('#clear-history');
let pastSearchedCitiesEl = $('#past-searches');

let currentCity;

// function to get the weather
function getWeather(data){
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIkey}`
  fetch(requestUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {

          // current weather
          let currentConditionsEl = $('#currentConditions');
          currentConditionsEl.addClass('border border-primary');

          // create city name element and display
          let cityNameEl = $('<h2>');
          cityNameEl.text(currentCity);
          currentConditionsEl.append(cityNameEl);

          // get date from results and display by appending to city name element
          let currentCityDate = data.current.dt;
          currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
          let currentDateEl = $('<span>');
          currentDateEl.text(` (${currentCityDate}) `);
          cityNameEl.append(currentDateEl);

          // get weather icon and display by appending to city name element            
          let currentCityWeatherIcon = data.current.weather[0].icon; // current weather icon
          let currentWeatherIconEl = $('<img>');
          currentWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png");
          cityNameEl.append(currentWeatherIconEl);

          // get current temp data and display
          let currentCityTemp = data.current.temp;
          let currentTempEl = $('<p>')
          currentTempEl.text(`Temp: ${currentCityTemp}°F`)
          currentConditionsEl.append(currentTempEl);

          // get current wind speed and display
          let currentCityWind = data.current.wind_speed;
          let currentWindEl = $('<p>')
          currentWindEl.text(`Wind: ${currentCityWind} MPH`)
          currentConditionsEl.append(currentWindEl);

          // get current humidity and display
          let currentCityHumidity = data.current.humidity;
          let currentHumidityEl = $('<p>')
          currentHumidityEl.text(`Humidity: ${currentCityHumidity}%`)
          currentConditionsEl.append(currentHumidityEl);

          // get current UV index, set background color based on level and display
          let currentCityUV = data.current.uvi;
          let currentUvEl = $('<p>');
          let currentUvSpanEl = $('<span>');
          currentUvEl.append(currentUvSpanEl);

          currentUvSpanEl.text(`UV: ${currentCityUV}`)

          if (currentCityUV < 3) {
              currentUvSpanEl.css({ 'background-color': 'green', 'color': 'white' });
          } else if (currentCityUV < 6) {
              currentUvSpanEl.css({ 'background-color': 'yellow', 'color': 'black' });
          } else if (currentCityUV < 8) {
              currentUvSpanEl.css({ 'background-color': 'orange', 'color': 'white' });
          } else if (currentCityUV < 11) {
              currentUvSpanEl.css({ 'background-color': 'red', 'color': 'white' });
          } else {
              currentUvSpanEl.css({ 'background-color': 'violet', 'color': 'white' });
          }

          currentConditionsEl.append(currentUvEl);

          // 5 - Day Forecast
          // create 5 Day Forecast <h2> header
          let fiveDayForecastHeaderEl = $('#fiveDayForecastHeader');
          let fiveDayHeaderEl = $('<h2>');
          fiveDayHeaderEl.text('5-Day Forecast:');
          fiveDayForecastHeaderEl.append(fiveDayHeaderEl);

          let fiveDayForecastEl = $('#fiveDayForecast');

          // get key weather info from API data for five day forecast and display
          for (let i = 1; i <= 5; i++) {
              let date;
              let temp;
              let icon;
              let wind;
              let humidity;

              date = data.daily[i].dt;
              date = moment.unix(date).format("MM/DD/YYYY");

              temp = data.daily[i].temp.day;
              icon = data.daily[i].weather[0].icon;
              wind = data.daily[i].wind_speed;
              humidity = data.daily[i].humidity;

              // create a card
              let card = document.createElement('div');
              card.classList.add('card', 'col-2', 'm-1' );

              // create card body and append
              let cardBody = document.createElement('div');
              cardBody.classList.add('card-body');
              cardBody.innerHTML = `<h6>${date}</h6>
                                    <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                     ${temp}°C<br>
                                     ${wind} KPH <br>
                                     ${humidity}%`

              card.appendChild(cardBody);
              fiveDayForecastEl.append(card);
          }
      })
  return;

};


// function to the history

function getHistory() {
  
};

// function to the coordinates
function getCoordinates(){

};

// Clear history
function clearHistory(){

};

// clear weather
function clearWeather(){

}
