from typing import List, Optional, Dict
from datetime import datetime, timedelta
import random
import math

from models.crime import CrimeIncident, CrimeHeatmapData, CrimeHeatmapPoint, Location, CrimeStatistics

# Mock crime data (will be replaced with database queries)
CRIME_TYPES = [
    "Theft", "Assault", "Burglary", "Robbery", "Vandalism", 
    "Fraud", "Drug Offense", "Vehicle Theft", "Harassment"
]

# Mumbai coordinates for mock data generation
MUMBAI_CENTER = {"latitude": 19.0760, "longitude": 72.8777}
MUMBAI_RADIUS = 0.1  # Roughly 10km

def generate_mock_incidents(count: int = 100) -> List[CrimeIncident]:
    """Generate mock crime incidents for testing"""
    incidents = []
    
    for _ in range(count):
        # Random location within Mumbai area
        angle = random.uniform(0, 2 * math.pi)
        distance = random.uniform(0, MUMBAI_RADIUS)
        latitude = MUMBAI_CENTER["latitude"] + distance * math.cos(angle)
        longitude = MUMBAI_CENTER["longitude"] + distance * math.sin(angle)
        
        # Random timestamp within the last 30 days
        days_ago = random.uniform(0, 30)
        timestamp = datetime.now() - timedelta(days=days_ago)
        
        # Random crime type and severity
        crime_type = random.choice(CRIME_TYPES)
        severity = random.uniform(1.0, 5.0)
        
        incident = CrimeIncident(
            crime_type=crime_type,
            location=Location(latitude=latitude, longitude=longitude),
            timestamp=timestamp,
            severity=severity,
            description=f"Mock {crime_type.lower()} incident"
        )
        incidents.append(incident)
    
    return incidents

# Cache mock incidents
_mock_incidents = generate_mock_incidents(500)

def get_crime_incidents(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    crime_type: Optional[str] = None,
    limit: int = 100,
    offset: int = 0
) -> List[CrimeIncident]:
    """Get crime incidents based on filters"""
    filtered_incidents = _mock_incidents
    
    # Apply filters
    if start_date:
        filtered_incidents = [i for i in filtered_incidents if i.timestamp >= start_date]
    if end_date:
        filtered_incidents = [i for i in filtered_incidents if i.timestamp <= end_date]
    if crime_type:
        filtered_incidents = [i for i in filtered_incidents if i.crime_type == crime_type]
    
    # Sort by timestamp (newest first)
    filtered_incidents.sort(key=lambda x: x.timestamp, reverse=True)
    
    # Apply pagination
    paginated_incidents = filtered_incidents[offset:offset + limit]
    
    return paginated_incidents

def get_heatmap_data(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    crime_type: Optional[str] = None,
    include_predictions: bool = False
) -> CrimeHeatmapData:
    """Get heatmap data for visualization"""
    # Get filtered incidents
    incidents = get_crime_incidents(start_date, end_date, crime_type, limit=1000)
    
    # Convert to heatmap points
    points = []
    for incident in incidents:
        weight = incident.severity / 5.0  # Normalize to 0-1
        point = CrimeHeatmapPoint(
            location=incident.location,
            weight=weight,
            crime_type=incident.crime_type
        )
        points.append(point)
    
    # Add prediction points if requested
    if include_predictions:
        from services.prediction_service import get_prediction_hotspots
        prediction_hotspots = get_prediction_hotspots(24)
        
        for hotspot in prediction_hotspots:
            point = CrimeHeatmapPoint(
                location=Location(
                    latitude=hotspot["latitude"],
                    longitude=hotspot["longitude"]
                ),
                weight=hotspot["probability"],
                crime_type="Prediction"
            )
            points.append(point)
    
    # Calculate min and max weights
    weights = [p.weight for p in points]
    max_weight = max(weights) if weights else 1.0
    min_weight = min(weights) if weights else 0.0
    
    return CrimeHeatmapData(
        points=points,
        max_weight=max_weight,
        min_weight=min_weight
    )

def get_crime_statistics(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    crime_type: Optional[str] = None
) -> CrimeStatistics:
    """Get crime statistics and aggregated data"""
    # Get filtered incidents
    incidents = get_crime_incidents(start_date, end_date, crime_type, limit=1000)
    
    # Count by type
    by_type = {}
    for incident in incidents:
        by_type[incident.crime_type] = by_type.get(incident.crime_type, 0) + 1
    
    # Count by time of day
    by_time_of_day = {
        "morning": 0,   # 6AM-12PM
        "afternoon": 0, # 12PM-6PM
        "evening": 0,   # 6PM-12AM
        "night": 0      # 12AM-6AM
    }
    
    for incident in incidents:
        hour = incident.timestamp.hour
        if 6 <= hour < 12:
            by_time_of_day["morning"] += 1
        elif 12 <= hour < 18:
            by_time_of_day["afternoon"] += 1
        elif 18 <= hour < 24:
            by_time_of_day["evening"] += 1
        else:
            by_time_of_day["night"] += 1
    
    # Count by day of week
    by_day_of_week = {
        "monday": 0,
        "tuesday": 0,
        "wednesday": 0,
        "thursday": 0,
        "friday": 0,
        "saturday": 0,
        "sunday": 0
    }
    
    for incident in incidents:
        day_name = incident.timestamp.strftime("%A").lower()
        by_day_of_week[day_name] += 1
    
    # Identify high risk areas
    high_risk_areas = get_high_risk_areas()
    
    return CrimeStatistics(
        total_incidents=len(incidents),
        by_type=by_type,
        by_time_of_day=by_time_of_day,
        by_day_of_week=by_day_of_week,
        high_risk_areas=high_risk_areas
    )

def get_crime_types() -> List[str]:
    """Get all available crime types"""
    return CRIME_TYPES

def get_time_series_data(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    crime_type: Optional[str] = None,
    interval: str = "day"
) -> Dict:
    """Get time series data for charts"""
    # Get filtered incidents
    incidents = get_crime_incidents(start_date, end_date, crime_type, limit=1000)
    
    # Default date range if not specified
    if not start_date:
        start_date = datetime.now() - timedelta(days=30)
    if not end_date:
        end_date = datetime.now()
    
    # Initialize time series data
    time_series = []
    
    # Group by interval
    if interval == "hour":
        # Hourly data for the last 24 hours
        for hour in range(24):
            current_time = end_date - timedelta(hours=24-hour)
            next_time = current_time + timedelta(hours=1)
            
            count = sum(1 for i in incidents if current_time <= i.timestamp < next_time)
            
            time_series.append({
                "time": current_time.strftime("%H:00"),
                "count": count
            })
    
    elif interval == "day":
        # Daily data
        days = (end_date - start_date).days + 1
        for day in range(days):
            current_date = start_date + timedelta(days=day)
            next_date = current_date + timedelta(days=1)
            
            count = sum(1 for i in incidents if current_date <= i.timestamp < next_date)
            
            time_series.append({
                "time": current_date.strftime("%Y-%m-%d"),
                "count": count
            })
    
    elif interval == "week":
        # Weekly data
        weeks = ((end_date - start_date).days // 7) + 1
        for week in range(weeks):
            current_date = start_date + timedelta(weeks=week)
            next_date = current_date + timedelta(weeks=1)
            
            count = sum(1 for i in incidents if current_date <= i.timestamp < next_date)
            
            time_series.append({
                "time": f"Week {week+1}",
                "count": count
            })
    
    elif interval == "month":
        # Monthly data
        # This is simplified and doesn't handle month boundaries perfectly
        months_dict = {}
        for incident in incidents:
            month_key = incident.timestamp.strftime("%Y-%m")
            months_dict[month_key] = months_dict.get(month_key, 0) + 1
        
        for month, count in sorted(months_dict.items()):
            time_series.append({
                "time": month,
                "count": count
            })
    
    return {"data": time_series, "interval": interval}

def get_high_risk_areas() -> List[dict]:
    """Get current high risk areas"""
    # In a real implementation, this would analyze crime clusters
    # For now, return mock high risk areas
    
    # Mumbai neighborhoods
    neighborhoods = [
        {"name": "Andheri East", "latitude": 19.1136, "longitude": 72.8697},
        {"name": "Dadar West", "latitude": 19.0178, "longitude": 72.8478},
        {"name": "Bandra Station", "latitude": 19.0596, "longitude": 72.8295},
        {"name": "Kurla Market", "latitude": 19.0726, "longitude": 72.8845},
        {"name": "Juhu Beach", "latitude": 19.0883, "longitude": 72.8262}
    ]
    
    high_risk_areas = []
    for area in neighborhoods:
        # Generate random crime types for each area
        predicted_crimes = random.sample(CRIME_TYPES, k=random.randint(1, 3))
        
        high_risk_areas.append({
            "name": area["name"],
            "latitude": area["latitude"],
            "longitude": area["longitude"],
            "risk_level": random.choice(["high", "medium", "high", "high"]),  # Bias towards high
            "predicted_crimes": predicted_crimes,
            "recent_incidents": random.randint(5, 30)
        })
    
    # Sort by risk level (high first)
    high_risk_areas.sort(key=lambda x: 0 if x["risk_level"] == "high" else 1)
    
    return high_risk_areas
