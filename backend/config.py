import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Mapbox configuration
MAPBOX_TOKEN = os.getenv("MAPBOX_TOKEN", "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA")
MAPBOX_API_URL = "https://api.mapbox.com"

# Default map center (Mumbai, India)
DEFAULT_LAT = 19.0760
DEFAULT_LON = 72.8777
DEFAULT_ZOOM = 12

# Database configuration (for future use)
DATABASE_URL = os.getenv("DATABASE_URL", "")

# Model configuration (for future use)
MODEL_PATH = os.getenv("MODEL_PATH", "models/")

# API configuration
API_PREFIX = "/api"
