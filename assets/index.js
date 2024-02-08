const apiKey = 'KEY';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('search-input');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const historyList = document.getElementById('historyList');

function getWeatherData(city) {
    // Implement your API call here
    // GET using Fetch 
    // Define the API URL

const apiUrl = 'https://api.example.com/data';

// Make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
    // API endpoint:
    
    // Forecast endpoint:
    
    // After fetching data, update the UI
    // Update current weather and forecast sections
    updateCurrentWeather(city);
    updateForecast(city);

    // Add city to search history
    addToHistory(city);
  }

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