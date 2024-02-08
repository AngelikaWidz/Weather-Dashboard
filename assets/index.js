const apiKey = 'KEY';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('search-input');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const historyList = document.getElementById('historyList');

// add event listner for submit event
searchForm.addEventListener('submit', function (event) {
    // handle submission
    event.preventDefault();
    const city = cityInput.value;

    // Call API to get weather data
    getWeatherData(city);

    // Clear input field
    cityInput.value = '';
  });