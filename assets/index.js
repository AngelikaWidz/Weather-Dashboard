const apiKey = '17b7e83935448462c786d32df84c10dd';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('search-input');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const historyList = document.getElementById('historyList');

function getWeatherData(city) {

const apiUrl = ' https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}';

// Make a GET request to fetch current weather
fetch(apiUrl)
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  return response.json();
})
.then(data => {
  updateCurrentWeather(data);
})
.catch(error => {
  console.error('Error:', error);
});

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

  function updateCurrentWeather(city) {
    // Implement logic to update current weather UI
    // Update the content of currentWeatherDiv
    // Example:
    currentWeatherDiv.innerHTML = `<h2>${city}</h2>
                                   <!-- Add other weather details here -->`;
  }

  function updateForecast(city) {
    forecastDiv.innerHTML = `<h2>5-Day Forecast for ${city}</h2>
                             <!-- Add forecast details here -->`;
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