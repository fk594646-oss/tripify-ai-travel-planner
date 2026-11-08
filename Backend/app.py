from flask import Flask
from flask_cors import CORS
from routes.travel_routes import travel_bp
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://localhost:5000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

app.register_blueprint(travel_bp, url_prefix='/api/travel')

@app.route('/')
def home():
    return {
        "message": "AI Travel Planner API",
        "version": "1.0",
        "status": "running"
    }

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)  