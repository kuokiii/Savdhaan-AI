from typing import List, Optional, Dict
from datetime import datetime, timedelta
import random
import math

from models.crime import Location, TimeRange, PredictionResponse, PredictionResult

# Mumbai coordinates for mock data generation
MUMBAI_CENTER = {"latitude": 19.0760, "longitude": 72.8777}
MUMBAI_RADIUS = 0.1  # Roughly 10km

def generate_predictions(
    location: Location,
    time_range: TimeRange,
    crime_types: Optional[List[str]] = None
) -> PredictionResponse:
    """Generate crime predictions based on location and time range"""
    # In a real implementation, this would call the ML model
    # For now, return mock predictions
    
    predictions = []
    
    # Generate 5-10 prediction points around the specified location
    num_predictions = random.randint(5, 10)
    
    for _ in range(num_predictions):
        # Random location within 2km of the specified location
        angle = random.uniform(0, 2 * math.pi)
        distance = random.uniform(0, 0.02)  # ~2km
        latitude = location.latitude + distance * math.cos(angle)
        longitude = location.longitude + distance * math.sin(angle)
        
        # Random probability and confidence
        probability = random.uniform(0.5, 0.95)
        confidence = random.uniform(0.6, 0.9)
        
        # Random crime type if not specified
        if crime_types:
            crime_type = random.choice(crime_types)
        else:
            from services.crime_service import CRIME_TYPES
            crime_type = random.choice(CRIME_TYPES)
        
        prediction = PredictionResult(
            location=Location(latitude=latitude, longitude=longitude),
            probability=probability,
            crime_type=crime_type,
            confidence=confidence
        )
        predictions.append(prediction)
    
    return PredictionResponse(
        predictions=predictions,
        generated_at=datetime.now(),
        model_version="0.1.0"
    )

def get_prediction_hotspots(
    hours_ahead: int = 24,
    crime_type: Optional[str] = None
) -> List[dict]:
    """Get predicted crime hotspots for the next X hours"""
    # In a real implementation, this would call the ML model
    # For now, return mock hotspots
    
    hotspots = []
    
    # Generate 10-20 hotspots around Mumbai
    num_hotspots = random.randint(10, 20)
    
    for _ in range(num_hotspots):
        # Random location within Mumbai area
        angle = random.uniform(0, 2 * math.pi)
        distance = random.uniform(0, MUMBAI_RADIUS)
        latitude = MUMBAI_CENTER["latitude"] + distance * math.cos(angle)
        longitude = MUMBAI_CENTER["longitude"] + distance * math.sin(angle)
        
        # Random probability and radius
        probability = random.uniform(0.5, 0.95)
        radius = random.uniform(0.2, 1.0)  # km
        
        # Random crime type if not specified
        if crime_type:
            predicted_type = crime_type
        else:
            from services.crime_service import CRIME_TYPES
            predicted_type = random.choice(CRIME_TYPES)
        
        # Random time within the specified hours ahead
        hours_from_now = random.uniform(1, hours_ahead)
        predicted_time = datetime.now() + timedelta(hours=hours_from_now)
        
        hotspot = {
            "latitude": latitude,
            "longitude": longitude,
            "probability": probability,
            "radius": radius,
            "predicted_type": predicted_type,
            "predicted_time": predicted_time.isoformat()
        }
        hotspots.append(hotspot)
    
    # Sort by probability (highest first)
    hotspots.sort(key=lambda x: x["probability"], reverse=True)
    
    return hotspots

def get_prediction_accuracy() -> Dict:
    """Get model prediction accuracy metrics"""
    # In a real implementation, this would calculate actual model metrics
    # For now, return mock accuracy metrics
    
    return {
        "overall_accuracy": 0.87,
        "precision": 0.82,
        "recall": 0.79,
        "f1_score": 0.80,
        "metrics_as_of": datetime.now().isoformat(),
        "model_version": "0.1.0",
        "training_data_end_date": (datetime.now() - timedelta(days=7)).isoformat(),
        "evaluation_method": "5-fold cross-validation"
    }

def get_area_risk_assessment(
    location: Location,
    radius: float = 1.0
) -> Dict:
    """Get risk assessment for a specific area"""
    # In a real implementation, this would analyze historical data and predictions
    # For now, return mock risk assessment
    
    # Random risk level with bias towards medium
    risk_levels = ["low", "medium", "medium", "high", "medium"]
    risk_level = random.choice(risk_levels)
    
    # Risk score based on risk level
    if risk_level == "low":
        risk_score = random.uniform(0.1, 0.3)
    elif risk_level == "medium":
        risk_score = random.uniform(0.4, 0.7)
    else:  # high
        risk_score = random.uniform(0.7, 0.9)
    
    # Get crime types for this area
    from services.crime_service import CRIME_TYPES
    common_crimes = random.sample(CRIME_TYPES, k=random.randint(2, 4))
    
    # Generate time-based risk factors
    time_risk = {
        "morning": random.uniform(0.1, 0.4),
        "afternoon": random.uniform(0.2, 0.5),
        "evening": random.uniform(0.5, 0.8),
        "night": random.uniform(0.6, 0.9)
    }
    
    # Generate day-based risk factors
    day_risk = {
        "monday": random.uniform(0.3, 0.6),
        "tuesday": random.uniform(0.3, 0.6),
        "wednesday": random.uniform(0.3, 0.6),
        "thursday": random.uniform(0.3, 0.6),
        "friday": random.uniform(0.5, 0.8),
        "saturday": random.uniform(0.6, 0.9),
        "sunday": random.uniform(0.5, 0.8)
    }
    
    # Generate safety tips based on risk level
    safety_tips = []
    if risk_level == "high":
        safety_tips = [
            "Avoid walking alone at night in this area",
            "Keep valuables out of sight",
            "Stay in well-lit and populated areas",
            "Be aware of your surroundings at all times"
        ]
    elif risk_level == "medium":
        safety_tips = [
            "Be cautious, especially after dark",
            "Travel in groups when possible",
            "Keep emergency contacts readily available"
        ]
    else:  # low
        safety_tips = [
            "Exercise normal caution",
            "Report any suspicious activity to authorities"
        ]
    
    return {
        "location": {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "radius_km": radius
        },
        "risk_level": risk_level,
        "risk_score": risk_score,
        "common_crimes": common_crimes,
        "time_risk_factors": time_risk,
        "day_risk_factors": day_risk,
        "recent_incidents_count": random.randint(5, 30),
        "predicted_incidents_next_24h": random.randint(1, 10),
        "safety_tips": safety_tips,
        "assessment_time": datetime.now().isoformat()
    }
