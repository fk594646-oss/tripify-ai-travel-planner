// Server addresses. Override them with a .env file in the Frontend folder, e.g.
//   VITE_TRIP_API_URL=https://your-trip-planner.example.com
//   VITE_AUTH_API_URL=https://your-accounts-api.example.com
//   VITE_DEMO=true     (no backend: sample trip data, accounts and contact form disabled)
const env = import.meta.env;

export const DEMO = env.VITE_DEMO === 'true';
// Flask trip planner (Backend/app.py)
export const TRIP_API = (env.VITE_TRIP_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
// Express accounts + contact API (Backend/server.js)
export const AUTH_API = (env.VITE_AUTH_API_URL || 'http://localhost:9001').replace(/\/+$/, '');
