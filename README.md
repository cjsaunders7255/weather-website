## 🌤️ Weather Website

A simple, responsive weather application built with HTML, CSS, and JavaScript that displays current weather and 5-day forecasts for any city.

### Features

- **Current Weather Display**: Real-time temperature, weather conditions, and detailed metrics
- **Weather Metrics**: 
  - Temperature and "feels like" temperature
  - Humidity percentage
  - Wind speed
  - Atmospheric pressure
- **5-Day Forecast**: Visual forecast cards showing upcoming weather
- **City Search**: Search weather for any city worldwide
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **No API Key Needed**: Uses Open-Meteo free weather API

### Getting Started

#### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to fetch weather data)

#### Setup

1. Clone the repository:
```bash
git clone https://github.com/cjsaunders7255/weather-website.git
cd weather-website
```

2. Open `index.html` in your browser:
   - Double-click the file, or
   - Use a local web server (e.g., `python -m http.server 8000`)

That's it! No API key configuration needed. 🎉

### Usage

1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View the current weather and 5-day forecast
4. Search for another city anytime

### Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, gradients, and responsive design
- **JavaScript (ES6)**: Functionality and API integration
- **Open-Meteo API**: Free weather data (no API key required)

### API Information

The app uses the **Open-Meteo API**, which is completely free and doesn't require authentication:

- **Geocoding API**: Converts city names to coordinates
  - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather API**: Fetches current weather and forecasts
  - Endpoint: `https://api.open-meteo.com/v1/forecast`

**Benefits:**
- ✅ No API key required
- ✅ No signup needed
- ✅ Free for all uses (commercial and non-commercial)
- ✅ Global coverage
- ✅ No usage limits

Learn more: [Open-Meteo Documentation](https://open-meteo.com/)

### Customization

You can customize the app by:
- Changing the color gradient in `style.css` (look for the `background` property in `body`)
- Modifying weather emoji/descriptions in the `getWeatherDescription()` function in `script.js`
- Adjusting responsive breakpoints in the `@media` queries

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### License

This project is open source and available under the MIT License.

### Resources

- [Open-Meteo API Documentation](https://open-meteo.com/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Grid & Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

Made with ❤️ for weather enthusiasts
