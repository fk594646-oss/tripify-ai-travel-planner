from flask import Blueprint, request, jsonify
from models.trip_planner import TripRequest
from utils.groq_handler import TravelPlannerAI
from pydantic import ValidationError
import requests
import os
from datetime import datetime, timedelta
from collections import defaultdict

travel_bp = Blueprint('travel', __name__)
planner_ai = TravelPlannerAI()


@travel_bp.route('/generate-trip', methods=['POST'])
def generate_trip():
    """Endpoint to generate trip plan"""
    try:
        data = request.get_json()

        # Validate input using Pydantic
        trip_request = TripRequest(**data)

        # Generate trip plan using AI
        trip_plan = planner_ai.generate_trip_plan(trip_request.dict())

        return jsonify({
            "success": True,
            "data": trip_plan
        }), 200

    except ValidationError as e:
        return jsonify({
            "success": False,
            "error": "Invalid input data",
            "details": e.errors()
        }), 400

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@travel_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Travel Planner API is running"
    }), 200


@travel_bp.route('/weather', methods=['GET'])
def get_weather():
    """Fetch weather forecast for destination"""
    try:
        destination = request.args.get('destination')
        departure_date = request.args.get('departure_date')
        days = request.args.get('days', 4, type=int)

        if not destination or not departure_date:
            return jsonify({
                "success": False,
                "error": "destination and departure_date are required"
            }), 400

        api_key = os.getenv("OPENWEATHER_API_KEY")
        if not api_key:
            return jsonify({"success": False, "error": "Weather API key not configured"}), 500

        # Step 1: Get coordinates for destination
        geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={destination},PK&limit=1&appid={api_key}"
        geo_res = requests.get(geo_url, timeout=10).json()

        if not geo_res:
            return jsonify({"success": False, "error": f"Location '{destination}' not found"}), 404

        lat, lon = geo_res[0]['lat'], geo_res[0]['lon']

        # Step 2: Fetch 5-day forecast (free tier: 3-hour intervals, 5 days max)
        forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        forecast_res = requests.get(forecast_url, timeout=10).json()

        if forecast_res.get('cod') != '200':
            return jsonify({"success": False, "error": "Failed to fetch forecast"}), 500

        # Step 3: Group by date, pick midday reading
        daily = defaultdict(list)
        for entry in forecast_res['list']:
            date_str = entry['dt_txt'].split(' ')[0]
            daily[date_str].append(entry)

        departure = datetime.strptime(departure_date, '%Y-%m-%d')
        result = []

        for i in range(days):
            date = (departure + timedelta(days=i)).strftime('%Y-%m-%d')
            entries = daily.get(date, [])

            # Pick midday entry (12:00), fallback to first available
            midday = next((e for e in entries if '12:00' in e['dt_txt']), entries[0] if entries else None)

            if midday:
                result.append({
                    "date": (departure + timedelta(days=i)).strftime('%b %d'),
                    "temp": round(midday['main']['temp']),
                    "description": midday['weather'][0]['description'],
                    "icon": midday['weather'][0]['icon']
                })
            else:
                # Beyond free API 5-day limit
                result.append({
                    "date": (departure + timedelta(days=i)).strftime('%b %d'),
                    "temp": None,
                    "description": "Forecast unavailable",
                    "icon": None
                })

        return jsonify({"success": True, "data": result}), 200

    except requests.exceptions.Timeout:
        return jsonify({"success": False, "error": "Weather service timed out"}), 504
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500