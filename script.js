const houstonButton = document.getElementById('houston-button');
const dallasButton = document.getElementById('dallas-button');
const weatherImg = document.getElementById('weather-img');
const weatherDes =  document.getElementById('weather-des');
const quote =  document.getElementById('daily-quote');
const maxTemp = document.getElementById('max-temp');
const minTemp = document.getElementById('min-temp');
const humidity =  document.getElementById('humidity');
const currentTemp = document.getElementById('current-temp');
const locationText = document.getElementById('location');

const houstonLonLat = [-95.358421, 29.749907];
const atlantaLonLat = [ -84.386330, 33.753746];
const apiKey = 'ee759a30a9b8bfdc78fd32c59d9d8abc';


async function getRandomQuote(){
    try {
        const quoteData = await fetch('https://api.quotable.io/random?maxLength=80');
        const newquote = await quoteData.json();
        quote.textContent = `Quote of the day: ${newquote.content}`;
        
    } catch (error) {
        console(error);
    }
}

async function getWeather(longLat) {
    try {
        const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${longLat[1]}&lon=${longLat[0]}&appid=${apiKey}`);
        const weatherData = await weatherPromise.json();
        currentTemp.textContent = `Current: ${kelvinToFahr(weatherData.main.temp)}°F`;
        weatherDes.textContent = weatherData.weather[0].description.toUpperCase();
        weatherImg.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        maxTemp.textContent = `High: ${kelvinToFahr(weatherData.main.temp_max)}°F`;
        minTemp.textContent = `Low: ${kelvinToFahr(weatherData.main.temp_min)}°F`;
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        locationText.textContent = weatherData.name;
        console.log(weatherData);
    } catch (error) {
        console.log(error)
    }
}

function kelvinToFahr(temp){
    return Math.floor(1.8*(temp-273)+32);
}

houstonButton.addEventListener('click', (e) => {
    getWeather(houstonLonLat);
    getRandomQuote();
})

dallasButton.addEventListener('click', (e) => {
    getWeather(atlantaLonLat);
    getRandomQuote();
    weatherImg.scr = `http://openweathermap.org/img/wn/04d@2x.png`;
})


window.addEventListener('DOMContentLoaded', (e) => {
    getWeather(houstonLonLat);
    getRandomQuote();
})


// class weather {
//     constructor(description, highestTemp, lowestTemp, humidityLevel){
//         this.description = description;
//         this.highestTemp = highestTemp;
//         this.lowestTemp = lowestTemp;
//         this.humidityLevel = humidityLevel;
//     }
// }
