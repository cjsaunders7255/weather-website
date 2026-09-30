// Open-Meteo API Configuration (No API key needed!)
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastContainer = document.getElementById('forecastContainer');
const forecastCards = document.getElementById('forecastCards');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Main search function
async function handleSearch() {
    const city = searchInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        clearError();
        const coordinates = await getCoordinates(city);
        const weatherData = await fetchWeatherData(coordinates.latitude, coordinates.longitude);
        
        displayCurrentWeather(weatherData, city, coordinates);
        displayForecast(weatherData);
        searchInput.value = '';
    } catch (error) {
        showError(error.message);
    }
}

// Get coordinates from city name using Geocoding API
async function getCoordinates(city) {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to search for city');
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            throw new Error('City not found. Please check the spelling and try again.');
        }
        
        const result = data.results[0];
        return {
            latitude: result.latitude,
            longitude: result.longitude,
            country: result.country,
            name: result.name,
            admin1: result.admin1
        };
    } catch (error) {
        throw error;
    }
}

// Fetch weather data
async function fetchWeatherData(latitude, longitude) {
    const url = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Convert WMO weather codes to descriptions
function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    
    return weatherCodes[code] || 'Unknown';
}

// Get weather icon emoji based on WMO code
function getWeatherEmoji(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 55) return '🌧️';
    if (code >= 61 && code <= 65) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 85 && code <= 86) return '🌨️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌤️';
}

// Display current weather
function displayCurrentWeather(data, cityName, coordinates) {
    const current = data.current;
    const country = coordinates.country || '';
    const admin = coordinates.admin1 ? `, ${coordinates.admin1}` : '';
    
    document.getElementById('cityName').textContent = `${cityName}${admin}, ${country}`;
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('temperature').textContent = Math.round(current.temperature_2m);
    
    const description = getWeatherDescription(current.weather_code);
    const emoji = getWeatherEmoji(current.weather_code);
    document.getElementById('weatherDescription').textContent = `${emoji} ${description}`;
    
    // For feels like, we'll estimate it based on wind and temp
    const feelsLike = Math.round(current.temperature_2m - (current.wind_speed_10m * 0.2));
    document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
    
    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(current.wind_speed_10m)} m/s`;
    document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;
    
    // Weather icon - using emoji instead of image
    const weatherIconElement = document.getElementById('weatherIcon');
    weatherIconElement.textContent = emoji;
    weatherIconElement.style.fontSize = '80px';
    
    currentWeatherDiv.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(data) {
    forecastCards.innerHTML = '';
    
    const daily = data.daily;
    const days = daily.time.length;
    
    // Display next 5 days (skip today)
    for (let i = 1; i < Math.min(6, days); i++) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const weatherCode = daily.weather_code[i];
        const description = getWeatherDescription(weatherCode);
        const emoji = getWeatherEmoji(weatherCode);
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="date">${dayName}</div>
            <div class="icon" style="font-size: 2.5rem;">${emoji}</div>
            <div class="temp">${maxTemp}°C</div>
            <div class="min-temp">${minTemp}°C</div>
            <div class="description">${description}</div>
        `;
        
        forecastCards.appendChild(card);
    }
    
    forecastContainer.classList.remove('hidden');
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    currentWeatherDiv.classList.add('hidden');
    forecastContainer.classList.add('hidden');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}
