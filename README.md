# Tripify – AI Travel Planner Assistant

**Live demo:** https://huggingface.co/spaces/muhammad-uzair02/tripify  
_The demo runs without a backend: the trip planner shows a sample itinerary, and accounts and the contact form are disabled. The full app needs the Node.js and Python servers in this repo._

A travel planning web app where you enter where you are going, for how long and on what budget, and an AI model builds a day-by-day trip plan with hotels, restaurants, places to visit, a cost estimate and a live weather forecast. It is aimed at trips within Pakistan.

## Features

- **AI trip planner:** hotels, restaurants, famous places, a day-wise itinerary, an estimated cost breakdown and practical tips, generated from your departure, destination, dates, group size and budget (low, medium or luxury)
- **Weather forecast** for the destination and travel dates (OpenWeather)
- **Travel-time estimates** for common Pakistan routes
- **Download your plan** as a standalone HTML file
- **Accounts:** sign up and sign in with hashed passwords (bcrypt) and JWT tokens
- **Contact form** that saves messages to MongoDB
- Pages for Hotels, Transport, Tours, About, Help, FAQ, Privacy and Terms

## Tech stack

| Part | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios |
| Accounts and contact API | Node.js, Express, MongoDB (Mongoose), bcryptjs, JSON Web Tokens |
| Trip planner API | Python, Flask, LangChain, Groq (Llama 3.3 70B), Pydantic |
| External services | OpenWeather API |

## How it fits together

```
Frontend (React)  ──►  Express API :9001   ──►  MongoDB   (accounts, contact messages)
        └───────────►  Flask API   :5000   ──►  Groq LLM + OpenWeather   (trip plans, weather)
```

## Run it locally

You need Node.js 20.19+ (required by Vite 7), Python 3.10+, a MongoDB database (a free MongoDB Atlas cluster works), a [Groq API key](https://console.groq.com) and an [OpenWeather API key](https://openweathermap.org/api).

1. **Settings:** copy `Backend/.env.example` to `Backend/.env` and fill it in. Never commit `.env`.
2. **Accounts API (port 9001):**
   ```
   cd Backend
   npm install
   npm run dev
   ```
3. **Trip planner API (port 5000):**
   ```
   cd Backend
   pip install -r requirements.txt
   python app.py
   ```
4. **Frontend (port 5173):**
   ```
   cd Frontend
   npm install
   npm run dev
   ```
   Open http://localhost:5173.

### Settings (`Backend/.env`)

| Variable | What it is |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random text used to sign login tokens |
| `GROQ_API_KEY` | Groq API key for trip generation |
| `OPENWEATHER_API_KEY` | OpenWeather API key for forecasts |
| `PORT` | Port for the Flask trip planner (default 5000) |

The frontend finds the servers through `VITE_AUTH_API_URL` and `VITE_TRIP_API_URL` (defaults: `http://localhost:9001` and `http://localhost:5000`). See `Frontend/src/config.js`.

## Static demo build (no backend)

```
cd Frontend
npm install
npm run build:demo
```

This creates a `dist/` folder that works on any static host. In this mode the planner shows a sample itinerary, and accounts and the contact form are disabled.

## Project structure

```
Backend/
├── server.js            Express app (accounts, contact)
├── app.py               Flask app (trip planner)
├── controllers/ routes/ models/ middleware/ config/   Node.js code
├── routes/travel_routes.py   Trip and weather endpoints
├── utils/groq_handler.py     LLM prompt and response parsing
└── models/trip_planner.py    Request and response schemas
Frontend/
└── src/ Pages/ Components/ Layouts/ api/ demo/ config.js
```

## Status and known limitations

- Work in progress. The trip planner is tuned for destinations in Pakistan.
- The two backend services run separately, so a full deployment needs two hosts.
- The planner depends on the Groq and OpenWeather free tiers, so heavy use may hit their rate limits.
