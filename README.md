# 🌤️ Weather App

A clean and user-friendly weather forecast app that shows live weather details for any city.

![Screenshot](./ss1.png)

## 🔧 Features

- 🌍 Search any city
- 🌦️ Shows weather condition (e.g., clouds, rain, clear)
- 🌡️ Temperature, feels-like
- 🧭 Country, state, wind, humidity, pressure
- 🕒 Real-time clock and part of day info

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Deployed on **Netlify**)
- **Backend:** Node.js + Express (Deployed on **Render**)
- **APIs Used:**
  - OpenWeatherMap (weather data)
  - GeoDB Cities (suggestion – now removed)

## 🚀 Run Locally

1. Clone the repo  
   `git clone https://github.com/Gaura89744/WeatherApp.git`

2. Install backend dependencies  
   `cd backend && npm install`

3. Create `.env` in backend:

4. Run server  
`npm run dev`

5. Open `index.html` from frontend in browser

## ⚙️ Architecture

Frontend collects user input and shows results. Backend fetches secure weather data from third-party APIs and hides the API keys using a proxy.

## 💡 Challenges Faced

- Protected API keys using backend instead of frontend
- Handled detailed weather conditions like "overcast clouds"
- Linked icons visually to multiple weather descriptions

---

> Made with ❤️ by Gaurav
