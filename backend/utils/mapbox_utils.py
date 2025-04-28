import requests
from typing import Dict, List, Optional, Tuple
import math

from config import MAPBOX_TOKEN, MAPBOX_API_URL

def geocode_address(address: str, country: Optional[str] = None) -> Dict:
    """Convert address to coordinates using Mapbox Geocoding API"""
    url = f"{MAPBOX_API_URL}/geocoding/v5/mapbox.places/{address}.json"
    params = {
        "access_token": MAPBOX_TOKEN,
        "limit": 1
    }
    
    if country:
        params["country"] = country
        
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    
    if not data["features"]:
        return {"error": "No results found"}
    
    feature = data["features"][0]
    coordinates = feature["geometry"]["coordinates"]
    
    return {
        "longitude": coordinates[0],
        "latitude": coordinates[1],
        "place_name": feature["place_name"],
        "id": feature["id"]
    }

def reverse_geocode(longitude: float, latitude: float) -> Dict:
    """Convert coordinates to address using Mapbox Geocoding API"""
    url = f"{MAPBOX_API_URL}/geocoding/v5/mapbox.places/{longitude},{latitude}.json"
    params = {
        "access_token": MAPBOX_TOKEN,
        "limit": 1
    }
        
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    
    if not data["features"]:
        return {"error": "No results found"}
    
    feature = data["features"][0]
    
    return {
        "place_name": feature["place_name"],
        "id": feature["id"],
        "place_type": feature["place_type"]
    }

def get_directions(
    start_coords: Tuple[float, float],
    end_coords: Tuple[float, float],
    profile: str = "walking"
) -> Dict:
    """Get directions between two points using Mapbox Directions API"""
    start_lon, start_lat = start_coords
    end_lon, end_lat = end_coords
    
    url = f"{MAPBOX_API_URL}/directions/v5/mapbox/{profile}/{start_lon},{start_lat};{end_lon},{end_lat}"
    params = {
        "access_token": MAPBOX_TOKEN,
        "geometries": "geojson",
        "steps": "true",
        "overview": "full"
    }
        
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    return response.json()

def calculate_bounding_box(
    center_lat: float,
    center_lon: float,
    radius_km: float
) -> List[float]:
    """Calculate a bounding box given a center point and radius in km"""
    # Earth's radius in km
    earth_radius = 6371.0
    
    # Convert radius from km to radians
    radius_rad = radius_km / earth_radius
    
    # Convert lat/lon to radians
    lat_rad = math.radians(center_lat)
    lon_rad = math.radians(center_lon)
    
    # Calculate min/max lat/lon
    min_lat = lat_rad - radius_rad
    max_lat = lat_rad + radius_rad
    
    # Adjust for longitude (varies with latitude)
    delta_lon = math.asin(math.sin(radius_rad) / math.cos(lat_rad))
    min_lon = lon_rad - delta_lon
    max_lon = lon_rad + delta_lon
    
    # Convert back to degrees
    min_lat_deg = math.degrees(min_lat)
    min_lon_deg = math.degrees(min_lon)
    max_lat_deg = math.degrees(max_lat)
    max_lon_deg = math.degrees(max_lon)
    
    # Return as [min_lon, min_lat, max_lon, max_lat] (Mapbox format)
    return [min_lon_deg, min_lat_deg, max_lon_deg, max_lat_deg]

def get_isochrone(
    longitude: float,
    latitude: float,
    contours_minutes: List[int] = [5, 10, 15],
    profile: str = "walking"
) -> Dict:
    """Get isochrone (travel time) polygons using Mapbox Isochrone API"""
    url = f"{MAPBOX_API_URL}/isochrone/v1/mapbox/{profile}/{longitude},{latitude}"
    
    contours_str = ";".join([str(m) for m in contours_minutes])
    
    params = {
        "access_token": MAPBOX_TOKEN,
        "contours_minutes": contours_str,
        "polygons": "true"
    }
        
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    return response.json()
