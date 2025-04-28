from fastapi import APIRouter, Query, HTTPException, Body
from typing import List, Optional
from datetime import datetime, timedelta

from models.crime import PredictionRequest, PredictionResponse, Location
from services import prediction_service

router = APIRouter()

@router.post("/generate", response_model=PredictionResponse)
async def generate_predictions(request: PredictionRequest = Body(...)):
    """
    Generate crime predictions based on location and time range
    """
    try:
        predictions = prediction_service.generate_predictions(
            location=request.location,
            time_range=request.time_range,
            crime_types=request.crime_types
        )
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/hotspots", response_model=List[dict])
async def get_prediction_hotspots(
    hours_ahead: int = Query(24, ge=1, le=72),
    crime_type: Optional[str] = Query(None)
):
    """
    Get predicted crime hotspots for the next X hours
    """
    try:
        hotspots = prediction_service.get_prediction_hotspots(
            hours_ahead=hours_ahead,
            crime_type=crime_type
        )
        return hotspots
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/accuracy", response_model=dict)
async def get_prediction_accuracy():
    """
    Get model prediction accuracy metrics
    """
    try:
        accuracy = prediction_service.get_prediction_accuracy()
        return accuracy
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/risk-assessment", response_model=dict)
async def get_area_risk_assessment(
    latitude: float = Query(...),
    longitude: float = Query(...),
    radius: float = Query(1.0, description="Radius in kilometers")
):
    """
    Get risk assessment for a specific area
    """
    try:
        location = Location(latitude=latitude, longitude=longitude)
        risk_assessment = prediction_service.get_area_risk_assessment(
            location=location,
            radius=radius
        )
        return risk_assessment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
