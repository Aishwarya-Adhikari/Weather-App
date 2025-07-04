function getWeather(){
    const apiKey ='da563643810f92e26f2c82f9854bd217';
    const city = document.getElementById('city').value;

    if(!city) {
        alert('Please enter a city name');
        return;
    }

    const currentWeatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)
         .then(response => response.json())
         .then(data => {
            displayWeather(data);
         })
         .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
         });


    fetch(forecastUrl)
         .then(response => response.json())
         .then(data => {
            displayHourlyForecast(data);
         })
         .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
         });

}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon= document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous data
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404') {
        
    }

}