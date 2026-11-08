# Tripify – AI Travel Planner Assistant

A travel planning web app: AI-generated trip itineraries, weather forecasts, hotels, transport and tours.

## Stack
- **Frontend:** React 19 + Vite + Tailwind (`Frontend/`)
- **Account backend:** Node.js + Express + MongoDB (`Backend/server.js`, port 9001)
- **Trip planner backend:** Python Flask + Groq (LangChain) + OpenWeather (`Backend/app.py`, port 5000)

## Run locally
1. Copy `Backend/.env.example` to `Backend/.env` and fill in your own keys (never commit `.env`).
2. Frontend: `cd Frontend && npm install && npm run dev`
3. Account backend: `cd Backend && npm install && npm run dev`
4. Trip planner: `cd Backend && pip install -r requirements.txt && python app.py`

## Server addresses
The frontend reads its server addresses from environment variables (see `Frontend/src/config.js`), defaulting to localhost:
- `VITE_TRIP_API_URL` - Flask trip planner (default `http://localhost:5000`)
- `VITE_AUTH_API_URL` - Express accounts/contact API (default `http://localhost:9001`)

## Static demo (no backend)
`cd Frontend && npm install && npm run build:demo` builds a version that needs no servers: the trip planner shows a sample itinerary, and accounts and the contact form are disabled. Upload the `dist/` folder to any static host (GitHub Pages, Netlify, Hugging Face Static Space).
