from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
import os
from dotenv import load_dotenv
import json
import re

load_dotenv()

class TravelPlannerAI:
    def __init__(self):
        self.llm = ChatGroq(
            temperature=0.7,
            model_name="llama-3.3-70b-versatile",
            groq_api_key=os.getenv("GROQ_API_KEY")
        )

    def estimate_travel_time(self, departure: str, destination: str) -> dict:
        """Estimate travel time based on known Pakistan routes."""
        dep = departure.lower().strip()
        dest = destination.lower().strip()

        routes = [
            (["islamabad", "rawalpindi"], ["gilgit", "gilgit-baltistan"], 10, 484),
            (["islamabad", "rawalpindi"], ["hunza", "karimabad"], 12, 580),
            (["islamabad", "rawalpindi"], ["skardu"], 14, 650),
            (["islamabad", "rawalpindi"], ["murree"], 2, 70),
            (["islamabad", "rawalpindi"], ["nathiagali"], 3, 90),
            (["islamabad", "rawalpindi"], ["abbottabad"], 2, 120),
            (["islamabad", "rawalpindi"], ["shogran"], 4, 180),
            (["islamabad", "rawalpindi"], ["naran"], 6, 250),
            (["islamabad", "rawalpindi"], ["kaghan"], 6, 240),
            (["islamabad", "rawalpindi"], ["swat", "mingora"], 5, 250),
            (["islamabad", "rawalpindi"], ["lahore"], 4, 380),
            (["islamabad", "rawalpindi"], ["peshawar"], 2, 170),
            (["islamabad", "rawalpindi"], ["quetta"], 14, 800),
            (["islamabad", "rawalpindi"], ["karachi"], 24, 1450),
            (["islamabad", "rawalpindi"], ["chitral"], 10, 420),
            (["islamabad", "rawalpindi"], ["fairy meadows", "nanga parbat"], 12, 560),
            (["islamabad", "rawalpindi"], ["azad kashmir", "muzaffarabad"], 3, 140),
            (["islamabad", "rawalpindi"], ["neelum valley"], 5, 200),
            (["islamabad", "rawalpindi"], ["attabad lake"], 13, 620),
            (["lahore"], ["karachi"], 20, 1270),
            (["lahore"], ["islamabad", "rawalpindi"], 4, 380),
            (["lahore"], ["peshawar"], 5, 490),
            (["lahore"], ["multan"], 4, 340),
            (["lahore"], ["quetta"], 16, 1050),
            (["lahore"], ["faisalabad"], 2, 130),
            (["karachi"], ["quetta"], 10, 690),
            (["karachi"], ["hyderabad"], 2, 160),
            (["karachi"], ["islamabad", "rawalpindi"], 24, 1450),
            (["peshawar"], ["swat", "mingora"], 3, 160),
            (["peshawar"], ["chitral"], 8, 360),
            (["peshawar"], ["islamabad", "rawalpindi"], 2, 170),
            (["peshawar"], ["gilgit"], 12, 580),
            (["multan"], ["lahore"], 4, 340),
            (["multan"], ["karachi"], 12, 1050),
            (["multan"], ["islamabad", "rawalpindi"], 6, 450),
            (["abbottabad"], ["naran"], 4, 130),
            (["abbottabad"], ["shogran"], 2, 80),
            (["abbottabad"], ["islamabad", "rawalpindi"], 2, 120),
            (["abbottabad"], ["gilgit"], 8, 360),
            (["gilgit"], ["hunza", "karimabad"], 2, 100),
            (["gilgit"], ["skardu"], 6, 270),
            (["gilgit"], ["fairy meadows", "nanga parbat"], 3, 120),
            (["gilgit"], ["attabad lake"], 3, 130),
            (["skardu"], ["islamabad", "rawalpindi"], 14, 650),
            (["skardu"], ["gilgit"], 6, 270),
            (["hunza", "karimabad"], ["attabad lake"], 1, 30),
            (["muzaffarabad"], ["islamabad", "rawalpindi"], 3, 140),
            (["muzaffarabad"], ["neelum valley"], 2, 80),
        ]

        for dep_cities, dest_cities, hours, km in routes:
            if any(d in dep for d in dep_cities) and any(d in dest for d in dest_cities):
                return {"hours": hours, "km": km}
            if any(d in dest for d in dep_cities) and any(d in dep for d in dest_cities):
                return {"hours": hours, "km": km}

        return {"hours": 5, "km": 300}

    def format_arrival_time(self, depart_hour: int, travel_hours: int) -> str:
        """Convert depart hour + travel hours into a readable time string."""
        arrive_hour = depart_hour + travel_hours
        if arrive_hour >= 24:
            arrive_hour = 23
        if arrive_hour < 12:
            return f"{arrive_hour:02d}:00 AM"
        elif arrive_hour == 12:
            return "12:00 PM"
        else:
            return f"{arrive_hour - 12:02d}:00 PM"

    def clean_json_response(self, response: str) -> str:
        """Robustly extract and clean JSON from LLM response."""
        cleaned = response.strip()
        cleaned = re.sub(r'^```json\s*', '', cleaned)
        cleaned = re.sub(r'^```\s*', '', cleaned)
        cleaned = re.sub(r'\s*```$', '', cleaned)
        cleaned = cleaned.strip()

        match = re.search(r'\{.*\}', cleaned, re.DOTALL)
        if match:
            cleaned = match.group(0)

        # Fix trailing commas before } or ]
        cleaned = re.sub(r',\s*([}\]])', r'\1', cleaned)
        return cleaned

    def generate_trip_plan(self, trip_data):
        """Generate comprehensive trip plan using LangChain and Groq"""

        min_food_cost = int(trip_data["days"]) * 2000
        accommodation_cost = int(trip_data["days"]) * 4000
        total_cost = accommodation_cost + min_food_cost + 5000 + 2500 + 2000

        # Travel time estimation
        travel_info = self.estimate_travel_time(trip_data["departure"], trip_data["destination"])
        travel_hours = travel_info["hours"]
        travel_km = travel_info["km"]

        depart_hour = 6
        arrive_time = self.format_arrival_time(depart_hour, travel_hours)

        if travel_hours >= 10:
            day1_note = (
                f"Travel from {trip_data['departure']} to {trip_data['destination']} "
                f"takes {travel_hours} hours ({travel_km} km) by road. "
                f"Depart at 06:00 AM, arrive at {arrive_time}. "
                f"Day 1 must have ONLY 3 activities maximum: arrival, check-in, dinner & rest. "
                f"Do NOT schedule any sightseeing on Day 1."
            )
        elif travel_hours >= 6:
            day1_note = (
                f"Travel from {trip_data['departure']} to {trip_data['destination']} "
                f"takes {travel_hours} hours ({travel_km} km) by road. "
                f"Depart at 06:00 AM, arrive at {arrive_time}. "
                f"Day 1 should have 4 activities only: travel, check-in, light exploration, dinner."
            )
        elif travel_hours >= 3:
            day1_note = (
                f"Travel from {trip_data['departure']} to {trip_data['destination']} "
                f"takes {travel_hours} hours ({travel_km} km) by road. "
                f"Depart at 06:00 AM, arrive at {arrive_time}. "
                f"Day 1 can have 5 activities: travel, check-in, lunch, one attraction, dinner."
            )
        else:
            day1_note = (
                f"Travel from {trip_data['departure']} to {trip_data['destination']} "
                f"takes {travel_hours} hours ({travel_km} km) by road. "
                f"Depart at 06:00 AM, arrive at {arrive_time}. "
                f"Day 1 can have a full 6 activities schedule."
            )

        last_day_note = (
            f"Last day: include 2-3 morning activities or breakfast only, "
            f"then depart {trip_data['destination']} by 08:00 AM or 09:00 AM "
            f"for the return drive to {trip_data['departure']} (~{travel_hours} hrs, {travel_km} km). "
            f"End the last day itinerary with the return travel activity."
        )

        prompt_template = ChatPromptTemplate.from_messages([
            ("system", f"""You are an expert travel planner AI for Pakistan.

STRICT RULES — follow every rule exactly:
1. Return ONLY valid JSON. No markdown, no code fences, no explanation, no text before or after JSON.
2. EXACTLY 3 hotels. No phone numbers. Provide real prices, ratings, facilities, and complete addresses.
3. EXACTLY 3 restaurants. No phone numbers. Provide real prices, ratings, cuisine types, and complete addresses.
   - cuisine_type must be LOCAL or CULTURAL food famous in the destination.
   - specialities must be a plain list of dish name STRINGS only — no prices, no objects.
4. 3 to 7 must-visit famous places. These place names MUST appear in the itinerary.
5. Day-wise itinerary rules:
   - FIRST DAY TRAVEL RULE: {day1_note}
   - LAST DAY RETURN RULE: {last_day_note}
   - Middle days (neither first nor last): EXACTLY 6 activities per day.
   - Each activity text must be 6-7 words maximum (concise action phrase).
   - Activities must reference the actual famous places listed above.
   - Activities must be unique across all days — never repeat.
   - Time slots must be REALISTIC. Never schedule sightseeing during travel hours.
   - Times must flow chronologically within each day.
6. Exactly 10 important information tips.
7. Food cost minimum 2000 PKR per day.
8. CRITICAL: No trailing commas anywhere in the JSON. Valid JSON only."""),

            ("user", """Create a complete travel plan for:

Departure: {departure}
Destination: {destination}
People: {people}
Days: {days}
Budget: {budget}

Return ONLY this JSON structure with no text before or after it:

{{
  "trip_summary": {{
    "departure": "{departure}",
    "destination": "{destination}",
    "people": {people},
    "days": {days},
    "budget": "{budget}"
  }},
  "hotels": [
    {{
      "name": "Hotel Name 1",
      "rating": 4.5,
      "location": "Complete address, {destination}, Pakistan",
      "price_per_night": 5500,
      "facilities": ["WiFi", "Parking", "Restaurant", "Room Service", "Reception"]
    }},
    {{
      "name": "Hotel Name 2",
      "rating": 4.2,
      "location": "Complete address, {destination}, Pakistan",
      "price_per_night": 8500,
      "facilities": ["WiFi", "Mountain View", "Heater", "Hot Water", "Breakfast"]
    }},
    {{
      "name": "Hotel Name 3",
      "rating": 4.8,
      "location": "Complete address, {destination}, Pakistan",
      "price_per_night": 7000,
      "facilities": ["WiFi", "Gym", "Pool", "Spa", "Conference Room"]
    }}
  ],
  "restaurants": [
    {{
      "name": "Restaurant Name 1",
      "rating": 4.3,
      "location": "Complete address, {destination}, Pakistan",
      "cuisine_type": "Local cultural cuisine famous in {destination}",
      "price_for_two": 1800,
      "specialities": ["Local Dish 1", "Local Dish 2", "Local Dish 3"]
    }},
    {{
      "name": "Restaurant Name 2",
      "rating": 4.5,
      "location": "Complete address, {destination}, Pakistan",
      "cuisine_type": "Another local cuisine type in {destination}",
      "price_for_two": 2200,
      "specialities": ["Local Dish A", "Local Dish B", "Local Dish C"]
    }},
    {{
      "name": "Restaurant Name 3",
      "rating": 4.7,
      "location": "Complete address, {destination}, Pakistan",
      "cuisine_type": "Traditional food of {destination} region",
      "price_for_two": 2000,
      "specialities": ["Traditional Dish X", "Traditional Dish Y", "Traditional Dish Z"]
    }}
  ],
  "famous_places": [
    {{
      "name": "Actual Famous Place 1 in {destination}",
      "description": "Brief description of this real place.",
      "duration": "2-3 hours",
      "best_time": "Morning (8-11 AM)",
      "location": "Area name, {destination}"
    }},
    {{
      "name": "Actual Famous Place 2 in {destination}",
      "description": "Brief description of this real place.",
      "duration": "3-4 hours",
      "best_time": "Evening (4-7 PM)",
      "location": "Area name, {destination}"
    }},
    {{
      "name": "Actual Famous Place 3 in {destination}",
      "description": "Brief description of this real place.",
      "duration": "1-2 hours",
      "best_time": "Anytime",
      "location": "Area name, {destination}"
    }},
    {{
      "name": "Actual Famous Place 4 in {destination}",
      "description": "Brief description of this real place.",
      "duration": "4-5 hours",
      "best_time": "Morning (6-12 PM)",
      "location": "Area name, {destination}"
    }}
  ],
  "day_wise_itinerary": [
    {{
      "day": 1,
      "title": "Day 1: Travel & Arrival",
      "activities": [
        {{"time": "06:00 AM", "activity": "Depart early from {departure}", "location": "{departure}", "duration": "Travel"}},
        {{"time": "...", "activity": "Arrive and check into hotel", "location": "Hotel, {destination}", "duration": "1 hour"}},
        {{"time": "...", "activity": "Freshen up and rest after travel", "location": "Hotel, {destination}", "duration": "1 hour"}}
      ]
    }}
  ],
  "total_estimated_cost": {{
    "accommodation": {accommodation_cost},
    "food": {min_food_cost},
    "transport": 5000,
    "activities": 2500,
    "miscellaneous": 1500,
    "total": {total_cost}
  }},
  "important_information": [
    {{"icon": "", "text": "Pack warm layers for sudden weather changes."}},
    {{"icon": "💰", "text": "Carry cash; most places do not accept cards."}},
    {{"icon": "📅", "text": "Book hotels early during peak season."}},
    {{"icon": "📱", "text": "Download offline maps; internet is unreliable."}},
    {{"icon": "⚠️", "text": "Drive carefully on narrow mountain roads."}},
    {{"icon": "🚫", "text": "Do not litter; keep the destination clean."}},
    {{"icon": "📸", "text": "Ask permission before photographing locals."}},
    {{"icon": "🆔", "text": "Carry CNIC or passport at all checkpoints."}},
    {{"icon": "🏔️", "text": "Best travel months are April to October."}},
    {{"icon": "🍽️", "text": "Eat at hygienic local spots for authentic food."}}
  ]
}}

IMPORTANT:
- Generate EXACTLY {days} day entries in day_wise_itinerary.
- Strictly follow the FIRST DAY and LAST DAY activity count rules from system prompt.
- Middle days must have EXACTLY 6 activities each.
- Use real famous places of {destination} throughout.
- No phone numbers anywhere.
- No trailing commas in JSON.
- Return ONLY the JSON object, nothing else.""")
        ])

        chain = prompt_template | self.llm | StrOutputParser()

        try:
            response = chain.invoke({
                "departure": trip_data["departure"],
                "destination": trip_data["destination"],
                "people": trip_data["people"],
                "days": trip_data["days"],
                "budget": trip_data["budget"],
                "min_food_cost": min_food_cost,
                "accommodation_cost": accommodation_cost,
                "total_cost": total_cost
            })

            cleaned = self.clean_json_response(response)
            trip_plan = json.loads(cleaned)
            return trip_plan

        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {e}")
            print(f"Raw response:\n{response}")
            print(f"Cleaned response:\n{cleaned}")
            return {
                "error": "Failed to parse AI response",
                "raw_response": response
            }
        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}