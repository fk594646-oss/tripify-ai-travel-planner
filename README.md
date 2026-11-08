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

## Status
Work in progress. API URLs in the frontend currently point to `localhost`.
