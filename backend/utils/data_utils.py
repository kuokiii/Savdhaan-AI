from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import math
import random

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371  # Radius of earth in kilometers
    
    return c * r

def generate_points_in_radius(
    center_lat: float,
    center_lon: float,
    radius_km: float,
    num_points: int
) -> List[Dict[str, float]]:
    """Generate random points within a given radius of a center point"""
    points = []
    
    for _ in range(num_points):
        # Random angle
        angle = random.uniform(0, 2 * math.pi)
        
        # Random radius (use square root to ensure uniform distribution)
        rand_radius = random.uniform(0, math.sqrt(radius_km))
        rand_radius_sq = rand_radius * rand_radius
        
        # Convert to lat/lon offset
        # 111.32 km = 1 degree latitude
        # 111.32 * cos(lat) km = 1 degree longitude
        lat_offset = rand_radius_sq * math.cos(angle) / 111.32
        lon_offset = rand_radius_sq * math.sin(angle) / (111.32 * math.cos(math.radians(center_lat)))
        
        # New coordinates
        new_lat = center_lat + lat_offset
        new_lon = center_lon + lon_offset
        
        points.append({
            "latitude": new_lat,
            "longitude": new_lon
        })
    
    return points

def date_range(start_date: datetime, end_date: datetime, interval: str = "day") -> List[datetime]:
    """Generate a range of dates with the specified interval"""
    dates = []
    current_date = start_date
    
    if interval == "hour":
        delta = timedelta(hours=1)
    elif interval == "day":
        delta = timedelta(days=1)
    elif interval == "week":
        delta = timedelta(weeks=1)
    elif interval == "month":
        # Approximate a month as 30 days
        delta = timedelta(days=30)
    else:
        raise ValueError(f"Unsupported interval: {interval}")
    
    while current_date <= end_date:
        dates.append(current_date)
        current_date += delta
    
    return dates

def format_time_for_display(dt: datetime, interval: str = "day") -> str:
    """Format datetime for display based on interval"""
    if interval == "hour":
        return dt.strftime("%H:00")
    elif interval == "day":
        return dt.strftime("%Y-%m-%d")
    elif interval == "week":
        return f"Week {dt.isocalendar()[1]}"
    elif interval == "month":
        return dt.strftime("%b %Y")
    else:
        return dt.isoformat()
