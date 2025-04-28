# Crime Prediction API

Backend API for the Crime Prediction Dashboard application.

## Overview

This FastAPI application provides endpoints for crime data, heatmaps, predictions, and geocoding services. It's designed to work with the Crime Prediction Dashboard frontend.

## Features

- Crime incident data retrieval and filtering
- Heatmap data generation
- Crime prediction endpoints
- Geocoding services using Mapbox
- Time series data for charts and visualizations

## Setup

### Prerequisites

- Python 3.8+
- Mapbox API token

### Installation

1. Clone the repository
2. Create a virtual environment:
   \`\`\`
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`
3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`
4. Create a `.env` file with your Mapbox token:
   \`\`\`
   MAPBOX_TOKEN=your_mapbox_token_here
   \`\`\`

### Running the API

\`\`\`
uvicorn main:app --reload
\`\`\`

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access the interactive API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Docker

You can also run the application using Docker:

\`\`\`
docker build -t crime-prediction-api .
docker run -p 8000:8000 -e MAPBOX_TOKEN=your_mapbox_token_here crime-prediction-api
\`\`\`

## Endpoints

### Crime Data

- `GET /api/crime/incidents` - Get crime incidents with filtering
- `GET /api/crime/heatmap` - Get heatmap data for visualization
- `GET /api/crime/statistics` - Get crime statistics and aggregated data
- `GET /api/crime/types` - Get all available crime types
- `GET /api/crime/time-series` - Get time series data for charts
- `GET /api/crime/high-risk-areas` - Get current high risk areas

### Predictions

- `POST /api/predictions/generate` - Generate crime predictions
- `GET /api/predictions/hotspots` - Get predicted crime hotspots
- `GET /api/predictions/accuracy` - Get model prediction accuracy metrics
- `GET /api/predictions/risk-assessment` - Get risk assessment for a specific area

### Geocoding

- `GET /api/geocoding/forward` - Convert address to coordinates
- `GET /api/geocoding/reverse` - Convert coordinates to address
- `GET /api/geocoding/directions` - Get directions between two points

## Future Enhancements

- Integration with real crime datasets
- Implementation of actual ML models for prediction
- Database integration with Supabase
- Authentication and authorization
