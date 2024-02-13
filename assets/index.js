const apiKey = '17b7e83935448462c786d32df84c10dd';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('search-input');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const historyList = document.getElementById('historyList');

// When a user clicks on a city in the search history they are again presented with current and future conditions for that city.
function fetchWeatherData(lat, lon, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  // Make a GET request to fetch current weather
  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // 1 fetch current weather
    // 2 fetch 5 day forecast
    

    let weatherArr = [];
    updateCurrentWeather(city, data.list[0]);
    const allDates = []
    for (let i = 1; i < data.list.length; i++) {
      if(!allDates.includes(data.list[i].dt_txt.split(' ')[0])) {
        allDates.push(data.list[i].dt_txt.split(' ')[0]);
        weatherArr.push(data.list[i]);
    }
    }
    updateForecast(weatherArr);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
  


function getLatLon(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Make a GET request to fetch current weather
  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }
    return response.json();
  })
  .then(data => {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    fetchWeatherData(lat, lon, city);
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


// add event listner for submit event
searchForm.addEventListener('submit', function (event) {
  
    // handle submission
    event.preventDefault();
    const city = cityInput.value;

    if(city === '' || city === null) {
      alert('Please enter a city');
      return;
    }

     // Call API to get weather data
     getLatLon(city);

    // Clear input field
    cityInput.value = '';
  });

  function updateCurrentWeather(city, data) {
    currentWeatherDiv.innerHTML = `Forecast for ${city}`;  
    currentWeatherDiv.appendChild(getWeatherInfoDiv(data));
  }

  function updateForecast(forecastData) {
    forecastData.forEach(weather => {
      forecastDiv.appendChild(getWeatherInfoDiv(weather));
    }
    );
  }

  function addToHistory(city) {
    // Implement logic to add city to search history
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', function () {
      // When a city in the history is clicked, get weather data again
      getWeatherData(city);
    });

    historyList.appendChild(listItem);
  }


  function getWeatherInfoDiv(data){
// The date

// An icon representation of weather conditions

// The temperature

// The humidity

// The wind speed
const date = data.dt_txt.split(' ')[0];
const weatherInfoDiv = document.createElement('div');
weatherInfoDiv.classList.add('weather-info')
weatherInfoDiv.innerHTML = `
  <h2>${date}</h2>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">
  <p>Temperature: ${data.main.temp} &deg;C</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind: ${data.wind.speed} KPH</p>  
`;

return weatherInfoDiv;
}