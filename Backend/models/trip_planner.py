from pydantic import BaseModel, Field
from typing import List, Optional


class TripRequest(BaseModel):
    departure: str = Field(..., description="Departure city")
    destination: str = Field(..., description="Destination city")
    people: int = Field(..., gt=0, description="Number of people")
    days: int = Field(..., gt=0, description="Number of days")
    budget: str = Field(..., description="Budget range: low, medium, luxury")
    departureDate: Optional[str] = Field(None, description="Departure date (YYYY-MM-DD)")
    returnDate: Optional[str] = Field(None, description="Return date (YYYY-MM-DD)")


class Hotel(BaseModel):
    name: str
    price_per_night: float
    location: str
    rating: float
    facilities: List[str]


class Restaurant(BaseModel):
    name: str
    location: str
    rating: float
    cuisine_type: str
    specialities: List[str]
    price_for_two: Optional[float] = None


class FamousPlace(BaseModel):
    name: str
    description: str
    duration: str
    best_time: str
    location: str


class DayActivity(BaseModel):
    time: str
    activity: str
    location: str
    duration: str


class DayItinerary(BaseModel):
    day: int
    title: str
    activities: List[DayActivity]


class OngoingTrip(BaseModel):
    tour_name: str
    operator: str
    departure_date: str
    duration: str
    price_per_person: float
    availability: str