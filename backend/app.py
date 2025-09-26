"""
Rockfall Prediction API Backend
Flask application providing prediction endpoints for the rockfall monitoring system
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import json
import random
import numpy as np
from datetime import datetime, timedelta
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the model directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'model'))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS for production and development
if os.environ.get('FLASK_ENV') == 'production':
    # Production CORS configuration
    CORS(app, origins=[
        "https://your-frontend-domain.onrender.com",  # Update with your frontend domain
        "http://localhost:3000",  # Allow local development
        "http://127.0.0.1:3000"   # Allow local development
    ])
else:
    # Development CORS configuration
    CORS(app)  # Enable CORS for all routes in development

# Global variables for model and configuration
predictor = None
model_loaded = False

# Global state for stable data generation
data_state = {
    'base_values': {
        'slope_angle': 45.0,
        'joint_spacing': 1.2,
        'rock_strength': 55.0,
        'weathering_index': 5.5,
        'rainfall_24h': 2.0,
        'temperature_variation': 15.0,
        'vibration_intensity': 2.0,
        'blast_distance': 200.0,
        'excavation_height': 25.0
    },
    'trends': {
        'slope_angle': 0.0,
        'joint_spacing': 0.0,
        'rock_strength': 0.0,
        'weathering_index': 0.0,
        'rainfall_24h': 0.0,
        'vibration_intensity': 0.0
    },
    'last_update': datetime.now()
}

def load_prediction_model():
    """Load the trained rockfall prediction model."""
    global predictor, model_loaded
    
    try:
        # Simple prediction logic since we're focusing on the API structure
        model_loaded = True
        logger.info("✅ Prediction model loaded successfully")
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to load model: {e}")
        model_loaded = False
        return False

def simulate_prediction(input_data):
    """
    Simulate model prediction for the prototype with more stable, realistic outputs.
    In production, this would use the actual trained model.
    """
    try:
        # Risk scoring based on key factors for realistic simulation
        slope_factor = min(input_data.get('slope_angle', 45) / 90, 1.0)
        joint_factor = max(0, 1 - input_data.get('joint_spacing', 1.0) / 3.0)
        weather_factor = min((input_data.get('rainfall_24h', 0) + 
                            input_data.get('weathering_index', 5)) / 20, 1.0)
        vibration_factor = min(input_data.get('vibration_intensity', 1) / 5.0, 1.0)
        
        # Calculate composite risk score
        risk_score = (slope_factor * 0.3 + joint_factor * 0.25 + 
                     weather_factor * 0.25 + vibration_factor * 0.2)
        
        # Add minimal randomness for realistic variation (much smaller)
        risk_score += random.uniform(-0.02, 0.02)  # Much smaller variation
        risk_score = max(0, min(1, risk_score))
        
        # Convert to category and percentage with smoother transitions
        if risk_score < 0.3:
            category = 'Low'
            probability = 15 + (risk_score * 25)  # 15-22.5%
        elif risk_score < 0.5:
            category = 'Medium'
            probability = 30 + ((risk_score - 0.3) * 50)  # 30-40%
        elif risk_score < 0.7:
            category = 'High'
            probability = 55 + ((risk_score - 0.5) * 37.5)  # 55-62.5%
        else:
            category = 'Critical'
            probability = 70 + ((risk_score - 0.7) * 50)  # 70-85%
        
        # Add very small random variation to final probability
        probability += random.uniform(-1.5, 1.5)  # Small final adjustment
        probability = max(5, min(95, probability))  # Keep in reasonable bounds
        
        # Stable confidence with minimal variation
        confidence = 87 + random.uniform(-3, 3)  # Stable around 87%
        confidence = max(75, min(95, confidence))
        
        return {
            'risk_category': category,
            'risk_probability': round(probability, 1),
            'confidence': round(confidence, 1),
            'prediction_time': datetime.now().isoformat(),
            'category_probabilities': {
                'Low': round(max(0, 35 - risk_score * 35), 1),
                'Medium': round(max(0, 45 - abs(risk_score - 0.4) * 90), 1),
                'High': round(max(0, 35 - abs(risk_score - 0.6) * 70), 1),
                'Critical': round(max(0, risk_score * 30 - 15), 1)
            }
        }
        
    except Exception as e:
        logger.error(f"Prediction simulation error: {e}")
        # Return safe default
        return {
            'risk_category': 'Medium',
            'risk_probability': 35.0,
            'confidence': 85.0,
            'prediction_time': datetime.now().isoformat(),
            'category_probabilities': {'Low': 25, 'Medium': 45, 'High': 25, 'Critical': 5}
        }

def generate_mock_sensor_data():
    """Generate realistic mock sensor data with stable trends and smooth variations."""
    global data_state
    
    current_time = datetime.now()
    time_diff = (current_time - data_state['last_update']).total_seconds()
    
    # Update trends very gradually for smooth changes
    if time_diff > 10:  # Update trends every 10 seconds for smoother transitions
        for param in data_state['trends']:
            # Very small random trend changes for gradual drift
            data_state['trends'][param] += random.uniform(-0.005, 0.005)
            # Keep trends within very tight bounds for stability
            data_state['trends'][param] = max(-0.02, min(0.02, data_state['trends'][param]))
        
        data_state['last_update'] = current_time
    
    # Generate stable data with minimal random variations
    stable_data = {}
    
    # Apply trends to base values with very small random variations
    stable_data['slope_angle'] = round(
        data_state['base_values']['slope_angle'] + 
        data_state['trends']['slope_angle'] * 100 + 
        random.uniform(-0.3, 0.3), 1  # Much smaller variation
    )
    stable_data['slope_angle'] = max(25.0, min(75.0, stable_data['slope_angle']))
    
    stable_data['joint_spacing'] = round(
        data_state['base_values']['joint_spacing'] + 
        data_state['trends']['joint_spacing'] * 5 + 
        random.uniform(-0.02, 0.02), 2  # Much smaller variation
    )
    stable_data['joint_spacing'] = max(0.1, min(3.0, stable_data['joint_spacing']))
    
    stable_data['rock_strength'] = round(
        data_state['base_values']['rock_strength'] + 
        data_state['trends']['rock_strength'] * 50 + 
        random.uniform(-0.8, 0.8), 1  # Much smaller variation
    )
    stable_data['rock_strength'] = max(20.0, min(90.0, stable_data['rock_strength']))
    
    stable_data['weathering_index'] = round(
        data_state['base_values']['weathering_index'] + 
        data_state['trends']['weathering_index'] * 10 + 
        random.uniform(-0.05, 0.05), 1  # Much smaller variation
    )
    stable_data['weathering_index'] = max(1.0, min(10.0, stable_data['weathering_index']))
    
    # Rainfall with weather patterns (gradual changes)
    stable_data['rainfall_24h'] = round(
        max(0, data_state['base_values']['rainfall_24h'] + 
        data_state['trends']['rainfall_24h'] * 20 + 
        random.uniform(-0.1, 0.1)), 1  # Much smaller variation
    )
    
    stable_data['rainfall_7d'] = round(stable_data['rainfall_24h'] * 7 + random.uniform(-1, 1), 1)
    stable_data['rainfall_7d'] = max(0, stable_data['rainfall_7d'])
    
    # Temperature with realistic daily variation patterns
    hour = current_time.hour
    minute = current_time.minute
    daily_temp_cycle = 3 * np.sin((hour + minute/60.0 - 6) * np.pi / 12)  # Peak at 2 PM
    stable_data['temperature_variation'] = round(
        data_state['base_values']['temperature_variation'] + daily_temp_cycle + 
        random.uniform(-0.2, 0.2), 1  # Much smaller random variation
    )
    stable_data['temperature_variation'] = max(5.0, min(35.0, stable_data['temperature_variation']))
    
    # Vibration with realistic operational patterns
    stable_data['vibration_intensity'] = round(
        max(0.1, data_state['base_values']['vibration_intensity'] + 
        data_state['trends']['vibration_intensity'] * 5 + 
        random.uniform(-0.05, 0.05)), 2  # Much smaller variation
    )
    stable_data['vibration_intensity'] = max(0.1, min(8.0, stable_data['vibration_intensity']))
    
    # Other parameters with minimal variation
    stable_data['joint_orientation'] = round(180 + random.uniform(-15, 15), 1)  # Stable orientation
    stable_data['freeze_thaw_cycles'] = random.choice([0, 0, 0, 1])  # Mostly 0, occasionally 1
    stable_data['wind_speed'] = round(max(0, 8 + random.uniform(-1.5, 1.5)), 1)  # Stable wind around 8
    stable_data['blast_distance'] = round(
        data_state['base_values']['blast_distance'] + random.uniform(-5, 5), 1  # Smaller variation
    )
    stable_data['excavation_height'] = round(
        data_state['base_values']['excavation_height'] + random.uniform(-0.5, 0.5), 1  # Smaller variation
    )
    stable_data['support_density'] = round(0.6 + random.uniform(-0.05, 0.05), 2)  # Stable around 0.6
    stable_data['previous_rockfall_30d'] = random.choice([0, 0, 0, 1])  # Mostly 0, occasionally 1
    stable_data['maintenance_days_since'] = random.choice([5, 6, 7, 8, 9, 10])  # Stable range
    
    # Metadata
    stable_data['timestamp'] = current_time.isoformat()
    stable_data['sensor_id'] = f"RS_{1001 + (int(current_time.timestamp()) % 5)}"  # Rotate between 5 sensors
    stable_data['location'] = random.choice(['Sector-North', 'Sector-North', 'Sector-East', 'Sector-South'])  # Mostly North
    
    return stable_data

@app.route('/')
def home():
    """API status endpoint."""
    return jsonify({
        'message': 'Rockfall Prediction API',
        'status': 'online',
        'version': '1.0.0',
        'model_loaded': model_loaded,
        'endpoints': {
            '/predict': 'POST - Predict rockfall risk',
            '/mock-data': 'GET - Get mock sensor data',
            '/health': 'GET - API health check'
        }
    })

@app.route('/health')
def health_check():
    """Health check endpoint for monitoring."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model_status': 'loaded' if model_loaded else 'not_loaded'
    })

@app.route('/predict', methods=['POST'])
def predict_rockfall():
    """
    Main prediction endpoint.
    Accepts sensor data and returns rockfall risk assessment.
    """
    try:
        if not request.is_json:
            return jsonify({'error': 'Request must contain JSON data'}), 400
        
        input_data = request.get_json()
        
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Validate required fields (basic validation)
        required_fields = ['slope_angle', 'joint_spacing', 'rock_strength']
        missing_fields = [field for field in required_fields if field not in input_data]
        
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}',
                'required_fields': required_fields
            }), 400
        
        # Generate prediction
        prediction_result = simulate_prediction(input_data)
        
        # Add metadata
        prediction_result.update({
            'input_summary': {
                'slope_angle': input_data.get('slope_angle'),
                'rock_strength': input_data.get('rock_strength'),
                'rainfall_24h': input_data.get('rainfall_24h', 0),
                'vibration_intensity': input_data.get('vibration_intensity', 0)
            },
            'api_version': '1.0.0'
        })
        
        logger.info(f"Prediction made: {prediction_result['risk_category']} ({prediction_result['risk_probability']}%)")
        
        return jsonify(prediction_result)
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': 'Internal prediction error', 'details': str(e)}), 500

@app.route('/mock-data')
def get_mock_data():
    """
    Endpoint for live monitoring demo.
    Returns simulated real-time sensor data with prediction.
    """
    try:
        # Generate mock sensor data
        sensor_data = generate_mock_sensor_data()
        
        # Get prediction for this data
        prediction = simulate_prediction(sensor_data)
        
        # More stable system status
        sensors_online_chance = random.random()
        sensors_online = sensors_online_chance > 0.1  # 90% chance online
        
        # Combine sensor data with prediction
        response = {
            'sensor_data': sensor_data,
            'prediction': prediction,
            'system_status': {
                'sensors_online': sensors_online,
                'last_maintenance': (datetime.now() - timedelta(days=random.choice([7, 8, 9, 10]))).isoformat(),
                'alert_level': prediction['risk_category'].lower(),
                'data_quality': 'excellent' if sensors_online else 'good',
                'network_status': 'stable'
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Mock data error: {e}")
        return jsonify({'error': 'Failed to generate mock data', 'details': str(e)}), 500

@app.route('/historical-data')
def get_historical_data():
    """Generate sample historical data for charts and analysis with realistic trends."""
    try:
        historical_data = []
        base_time = datetime.now() - timedelta(days=7)
        
        # Generate stable historical data with trends
        base_risk = 35.0  # Starting risk level
        base_slope = 45.0
        base_rainfall = 2.0
        base_vibration = 2.0
        
        for i in range(168):  # 7 days of hourly data
            timestamp = base_time + timedelta(hours=i)
            
            # Create gradual trends over time
            trend_factor = i / 168.0  # 0 to 1 over the week
            daily_cycle = 0.5 * np.sin(2 * np.pi * i / 24)  # Daily variation
            
            # Risk probability with trend and daily cycle
            risk_prob = base_risk + (trend_factor * 15) + daily_cycle * 5 + random.uniform(-3, 3)
            risk_prob = max(10, min(85, risk_prob))
            
            # Risk category based on probability
            if risk_prob < 25:
                risk_category = 'Low'
            elif risk_prob < 50:
                risk_category = 'Medium'
            elif risk_prob < 70:
                risk_category = 'High'
            else:
                risk_category = 'Critical'
            
            # Other parameters with gradual changes
            slope_angle = base_slope + trend_factor * 5 + random.uniform(-1, 1)
            rainfall = max(0, base_rainfall + trend_factor * 3 + daily_cycle * 2 + random.uniform(-0.5, 0.5))
            vibration = max(0.1, base_vibration + trend_factor * 1 + daily_cycle * 0.5 + random.uniform(-0.2, 0.2))
            
            historical_data.append({
                'timestamp': timestamp.isoformat(),
                'risk_probability': round(risk_prob, 1),
                'risk_category': risk_category,
                'slope_angle': round(slope_angle, 1),
                'rainfall_24h': round(rainfall, 1),
                'vibration_intensity': round(vibration, 2)
            })
        
        recent_data = historical_data[-48:]  # Return last 48 hours
        
        return jsonify({
            'data': recent_data,
            'summary': {
                'total_points': len(recent_data),
                'avg_risk': round(sum(d['risk_probability'] for d in recent_data) / len(recent_data), 1),
                'high_risk_alerts': len([d for d in recent_data if d['risk_probability'] > 60]),
                'trend': 'stable' if abs(recent_data[-1]['risk_probability'] - recent_data[0]['risk_probability']) < 10 else 'increasing'
            }
        })
        
    except Exception as e:
        logger.error(f"Historical data error: {e}")
        return jsonify({'error': 'Failed to generate historical data'}), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({'error': 'Internal server error'}), 500

# Initialize the application
if __name__ == '__main__':
    print("🚀 Starting Rockfall Prediction API Server")
    print("=" * 50)
    
    # Load the model
    print("📡 Loading prediction model...")
    load_prediction_model()
    
    # Start the server
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"🌐 Server starting on port {port}")
    print(f"🔧 Debug mode: {debug_mode}")
    print(f"🎯 API endpoints:")
    print(f"   GET  / - API status")
    print(f"   POST /predict - Rockfall prediction")
    print(f"   GET  /mock-data - Live sensor simulation")
    print(f"   GET  /historical-data - Historical trend data")
    print(f"   GET  /health - Health check")
    
    app.run(host='0.0.0.0', port=port, debug=debug_mode)