from fastapi import APIRouter, Query, HTTPException, Depends
from typing import List, Optional
from datetime import datetime, timedelta
import random

from models.crime import CrimeIncident, CrimeHeatmapData, CrimeQuery, CrimeStatistics, CrimeHeatmapPoint, Location
from services import crime_service

router = APIRouter()

@router.get("/incidents", response_model=List[CrimeIncident])
async def get_crime_incidents(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    crime_type: Optional[str] = Query(None),
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0)
):
    """
    Get crime incidents based on filters
    """
    try:
        # Use the crime service to get incidents
        incidents = crime_service.get_crime_incidents(
            start_date=start_date,
            end_date=end_date,
            crime_type=crime_type,
            limit=limit,
            offset=offset
        )
        return incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/heatmap", response_model=CrimeHeatmapData)
async def get_heatmap_data(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    crime_type: Optional[str] = Query(None),
    include_predictions: bool = Query(False)
):
    """
    Get heatmap data for visualization
    """
    try:
        # Use the crime service to get heatmap data
        heatmap_data = crime_service.get_heatmap_data(
            start_date=start_date,
            end_date=end_date,
            crime_type=crime_type,
            include_predictions=include_predictions
        )
        return heatmap_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/statistics", response_model=CrimeStatistics)
async def get_crime_statistics(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    crime_type: Optional[str] = Query(None)
):
    """
    Get crime statistics and aggregated data
    """
    try:
        # Use the crime service to get statistics
        statistics = crime_service.get_crime_statistics(
            start_date=start_date,
            end_date=end_date,
            crime_type=crime_type
        )
        return statistics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/types", response_model=List[str])
async def get_crime_types():
    """
    Get all available crime types
    """
    try:
        return crime_service.get_crime_types()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/time-series", response_model=dict)
async def get_time_series_data(
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    crime_type: Optional[str] = Query(None),
    interval: str = Query("day", regex="^(hour|day|week|month)$")
):
    """
    Get time series data for charts
    """
    try:
        # Use the crime service to get time series data
        time_series = crime_service.get_time_series_data(
            start_date=start_date,
            end_date=end_date,
            crime_type=crime_type,
            interval=interval
        )
        return time_series
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/high-risk-areas", response_model=List[dict])
async def get_high_risk_areas():
    """
    Get current high risk areas
    """
    try:
        return crime_service.get_high_risk_areas()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
