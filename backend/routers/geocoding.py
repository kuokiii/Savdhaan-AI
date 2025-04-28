from fastapi import APIRouter, Query, HTTPException
from typing import Optional
import requests

from config import MAPBOX_TOKEN, MAPBOX_API_URL

router = APIRouter()

@router.get("/forward")
async def forward_geocoding(
    query: str = Query(..., min_length=1),
    limit: int = Query(5, ge=1, le=10),
    country: Optional[str] = Query(None)
):
    """
    Convert address to coordinates using Mapbox Geocoding API
    """
    try:
        url = f"{MAPBOX_API_URL}/geocoding/v5/mapbox.places/{query}.json"
        params = {
            "access_token": MAPBOX_TOKEN,
            "limit": limit
        }
        
        if country:
            params["country"] = country
            
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Geocoding error: {str(e)}")

@router.get("/reverse")
async def reverse_geocoding(
    longitude: float = Query(...),
    latitude: float = Query(...),
    types: Optional[str] = Query(None)
):
    """
    Convert coordinates to address using Mapbox Geocoding API
    """
    try:
        url = f"{MAPBOX_API_URL}/geocoding/v5/mapbox.places/{longitude},{latitude}.json"
        params = {
            "access_token": MAPBOX_TOKEN
        }
        
        if types:
            params["types"] = types
            
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Reverse geocoding error: {str(e)}")

@router.get("/directions")
async def get_directions(
    start_longitude: float = Query(...),
    start_latitude: float = Query(...),
    end_longitude: float = Query(...),
    end_latitude: float = Query(...),
    profile: str = Query("walking", regex="^(driving|walking|cycling)$")
):
    """
    Get directions between two points using Mapbox Directions API
    """
    try:
        url = f"{MAPBOX_API_URL}/directions/v5/mapbox/{profile}/{start_longitude},{start_latitude};{end_longitude},{end_latitude}"
        params = {
            "access_token": MAPBOX_TOKEN,
            "geometries": "geojson",
            "steps": "true",
            "overview": "full"
        }
            
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Directions error: {str(e)}")
