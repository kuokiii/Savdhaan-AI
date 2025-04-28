from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import os
from dotenv import load_dotenv

from routers import crime_data, predictions, geocoding

# Load environment variables
load_dotenv()

# Startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load models, establish connections, etc.
    print("Starting up the application...")
    yield
    # Shutdown: Clean up resources
    print("Shutting down the application...")

# Create FastAPI app
app = FastAPI(
    title="Crime Prediction API",
    description="Backend API for Crime Prediction Dashboard",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(crime_data.router, prefix="/api/crime", tags=["Crime Data"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(geocoding.router, prefix="/api/geocoding", tags=["Geocoding"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Crime Prediction API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
