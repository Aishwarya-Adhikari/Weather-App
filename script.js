function getWeather() {
   const apiKey = 'da563643810f92e26f2c82f9854bd217';
   const city = document.getElementById('city').value;

   if (!city) {
      alert('Please enter a city name');
      return;
   }

   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
   //Fetch current weather data
   fetch(currentWeatherUrl)
      .then(response => {
         if (!response.ok) throw new Error('City not found');
         return response.json();
      })
      .then(data => {
         displayWeather(data);
      })
      .catch(error => {
         console.error('Current weather error:', error);
         alert('City not found. Please enter a valid city name.');
      });
      

   //Fetch hourly forecast data
   fetch(forecastUrl)
      .then(response => {
         if (!response.ok) throw new Error('Forecast not available');
         return response.json();
      })
      .then(data => {
         displayHourlyForecast(data.list); 
      })
      .catch(error => {
         console.error('Forecast error:', error);
      });
}



function displayWeather(data) {
   const tempDivInfo = document.getElementById('temp-div');
   const weatherInfoDiv = document.getElementById('weather-info');
   const weatherIcon = document.getElementById('weather-icon');
   const hourlyForecastDiv = document.getElementById('hourly-forecast');


   // Clear previous data
   weatherInfoDiv.innerHTML = '';
   hourlyForecastDiv.innerHTML = '';
   tempDivInfo.innerHTML = '';

   if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
   }
   else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const temperatureHTML = `<p>${temperature}°C</p>`;

      const weatherHTML = `<P>${cityName}</p>
                              <p>${description}</p>`;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHTML;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;
      weatherIcon.style.display = 'block';   

      
   }

}

 function displayHourlyForecast(hourlyData) {

      const hourlyForecastDiv = document.getElementById('hourly-forecast');
       hourlyForecastDiv.innerHTML = '';  // Clear previous forecast
      const next24Hours = hourlyData.slice(0, 8); // Get the next 8 hours (3-hour intervals)
      
      next24Hours.forEach(item => {  
         const dateTime = new Date(item.dt * 1000);
         const hour = dateTime.getHours();
         const temperature = Math.round(item.main.temp - 273.15); // Convert from Kelvin to Celsius
         const iconCode = item.weather[0].icon;
         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

         const hourlyItemHtml = `
            <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
            </div>
         `;
         hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
   }

   
