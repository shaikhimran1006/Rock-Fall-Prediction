"""
Rockfall Risk Prediction Utilities
Provides easy-to-use functions for loading and using the trained model
"""

import joblib
import json
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random

class RockfallPredictor:
    """
    Rockfall risk prediction system wrapper.
    Handles model loading, prediction, and result interpretation.
    """
    
    def __init__(self, model_path='rockfall_model.pkl', scaler_path='feature_scaler.pkl', 
                 info_path='model_info.json'):
        """Initialize the predictor with trained model components."""
        try:
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            
            with open(info_path, 'r') as f:
                self.model_info = json.load(f)
            
            self.feature_columns = self.model_info['feature_columns']
            self.risk_categories = self.model_info['risk_categories']
            print(f"✅ Rockfall predictor loaded successfully")
            print(f"   Model trained: {self.model_info.get('trained_date', 'Unknown')}")
            print(f"   Accuracy: {self.model_info.get('training_accuracy', 0):.1%}")
            
        except FileNotFoundError as e:
            print(f"❌ Error loading model: {e}")
            print("   Please run train_model.py first to create the model")
            raise
    
    def predict(self, input_data):
        """
        Predict rockfall risk from input features.
        
        Args:
            input_data (dict): Dictionary containing feature values
            
        Returns:
            dict: Prediction results with probability and category
        """
        try:
            # Convert input to DataFrame
            if isinstance(input_data, dict):
                df = pd.DataFrame([input_data])
            else:
                df = pd.DataFrame(input_data)
            
            # Ensure all required features are present
            for feature in self.feature_columns:
                if feature not in df.columns:
                    raise ValueError(f"Missing required feature: {feature}")
            
            # Select and order features correctly
            X = df[self.feature_columns]
            
            # Scale features
            X_scaled = self.scaler.transform(X)
            
            # Get predictions
            risk_category = self.model.predict(X_scaled)[0]
            risk_probabilities = self.model.predict_proba(X_scaled)[0]
            
            # Calculate overall risk score (0-100)
            category_to_score = {'Low': 15, 'Medium': 40, 'High': 70, 'Critical': 90}
            base_score = category_to_score.get(risk_category, 50)
            
            # Add some variation based on prediction confidence
            max_prob = max(risk_probabilities)
            confidence_adjustment = (max_prob - 0.5) * 20  # -10 to +10 adjustment
            risk_score = max(0, min(100, base_score + confidence_adjustment))
            
            # Prepare result
            result = {
                'risk_category': risk_category,
                'risk_probability': round(risk_score, 1),
                'confidence': round(max_prob * 100, 1),
                'prediction_time': datetime.now().isoformat(),
                'category_probabilities': {
                    category: round(prob * 100, 1)
                    for category, prob in zip(self.risk_categories, risk_probabilities)
                }
            }
            
            return result
            
        except Exception as e:
            print(f"❌ Prediction error: {e}")
            raise
    
    def get_feature_importance(self):
        """Get feature importance scores from the trained model."""
        if hasattr(self.model, 'feature_importances_'):
            importance_data = list(zip(self.feature_columns, self.model.feature_importances_))
            importance_data.sort(key=lambda x: x[1], reverse=True)
            return importance_data
        return None
    
    def generate_mock_sensor_data(self):
        """
        Generate realistic mock sensor data for testing and live monitoring demo.
        
        Returns:
            dict: Simulated sensor readings
        """
        # Generate realistic sensor data with some randomness
        base_time = datetime.now()
        
        mock_data = {
            'slope_angle': round(random.uniform(30, 60), 1),
            'joint_spacing': round(random.uniform(0.2, 2.0), 2),
            'joint_orientation': round(random.uniform(0, 360), 1),
            'rock_strength': round(random.uniform(20, 80), 1),
            'weathering_index': round(random.uniform(2, 8), 1),
            'rainfall_24h': round(random.exponential(3), 1),
            'rainfall_7d': round(random.exponential(15), 1),
            'temperature_variation': round(random.uniform(5, 25), 1),
            'freeze_thaw_cycles': random.randint(0, 5),
            'wind_speed': round(random.uniform(0, 15), 1),
            'vibration_intensity': round(random.exponential(2), 2),
            'blast_distance': round(random.uniform(100, 400), 1),
            'excavation_height': round(random.uniform(10, 50), 1),
            'support_density': round(random.uniform(0.1, 0.9), 2),
            'previous_rockfall_30d': random.randint(0, 3),
            'maintenance_days_since': random.randint(1, 30),
            'timestamp': base_time.isoformat(),
            'sensor_id': f"SENSOR_{random.randint(1001, 9999)}"
        }
        
        return mock_data

# Convenience function for easy importing
def load_predictor():
    """Load and return a RockfallPredictor instance."""
    return RockfallPredictor()

def generate_sample_data(n_samples=10):
    """Generate multiple samples of mock sensor data."""
    predictor = RockfallPredictor()
    samples = []
    
    for i in range(n_samples):
        sample = predictor.generate_mock_sensor_data()
        prediction = predictor.predict(sample)
        sample.update({
            'predicted_risk': prediction['risk_category'],
            'predicted_probability': prediction['risk_probability']
        })
        samples.append(sample)
    
    return samples

if __name__ == "__main__":
    print("🧪 Testing Rockfall Prediction System")
    print("=" * 40)
    
    try:
        # Initialize predictor
        predictor = load_predictor()
        
        # Generate test data
        print("\n📊 Generating test predictions...")
        test_data = predictor.generate_mock_sensor_data()
        
        print(f"\n🔍 Sample sensor data:")
        for key, value in test_data.items():
            if key not in ['timestamp', 'sensor_id']:
                print(f"   {key}: {value}")
        
        # Make prediction
        result = predictor.predict(test_data)
        
        print(f"\n🎯 Prediction Result:")
        print(f"   Risk Category: {result['risk_category']}")
        print(f"   Risk Probability: {result['risk_probability']}%")
        print(f"   Confidence: {result['confidence']}%")
        
        print(f"\n📈 Category Breakdown:")
        for category, prob in result['category_probabilities'].items():
            print(f"   {category}: {prob}%")
            
        print("\n✅ Prediction system working correctly!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Please run train_model.py first to create the model files.")