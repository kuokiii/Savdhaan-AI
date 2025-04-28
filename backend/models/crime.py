from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
import uuid

class Location(BaseModel):
    latitude: float
    longitude: float

class CrimeIncident(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    crime_type: str
    location: Location
    timestamp: datetime
    severity: float = Field(ge=0.0, le=5.0)
    description: Optional[str] = None

class CrimeHeatmapPoint(BaseModel):
    location: Location
    weight: float = Field(ge=0.0, le=1.0)
    crime_type: Optional[str] = None

class CrimeHeatmapData(BaseModel):
    points: List[CrimeHeatmapPoint]
    max_weight: float
    min_weight: float

class TimeRange(BaseModel):
    start_time: datetime
    end_time: datetime

class CrimeQuery(BaseModel):
    time_range: Optional[TimeRange] = None
    crime_types: Optional[List[str]] = None
    area: Optional[List[Location]] = None
    limit: int = 100
    offset: int = 0

class CrimeStatistics(BaseModel):
    total_incidents: int
    by_type: dict
    by_time_of_day: dict
    by_day_of_week: dict
    high_risk_areas: List[dict]

class PredictionRequest(BaseModel):
    location: Location
    time_range: TimeRange
    crime_types: Optional[List[str]] = None

class PredictionResult(BaseModel):
    location: Location
    probability: float
    crime_type: Optional[str] = None
    confidence: float

class PredictionResponse(BaseModel):
    predictions: List[PredictionResult]
    generated_at: datetime = Field(default_factory=datetime.now)
    model_version: str = "0.1.0"
