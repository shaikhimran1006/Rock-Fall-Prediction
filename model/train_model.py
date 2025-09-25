"""
Rockfall Risk Prediction Model Training Script
Creates a trained model for predicting rockfall risk in open-pit mines
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import joblib
import json
from datetime import datetime

def generate_synthetic_training_data(n_samples=5000):
    """
    Generate synthetic training data for rockfall prediction.
    Features represent various geological, environmental, and structural factors.
    """
    np.random.seed(42)
    
    # Feature definitions based on real-world rockfall risk factors
    data = {
        # Geological factors
        'slope_angle': np.random.normal(45, 15, n_samples),  # degrees
        'joint_spacing': np.random.exponential(0.5, n_samples),  # meters
        'joint_orientation': np.random.uniform(0, 360, n_samples),  # degrees
        'rock_strength': np.random.normal(50, 20, n_samples),  # MPa
        'weathering_index': np.random.uniform(0, 10, n_samples),  # 0-10 scale
        
        # Environmental factors
        'rainfall_24h': np.random.exponential(2, n_samples),  # mm
        'rainfall_7d': np.random.exponential(10, n_samples),  # mm
        'temperature_variation': np.random.normal(15, 8, n_samples),  # °C
        'freeze_thaw_cycles': np.random.poisson(2, n_samples),  # count
        'wind_speed': np.random.exponential(3, n_samples),  # m/s
        
        # Structural factors
        'vibration_intensity': np.random.exponential(1, n_samples),  # mm/s
        'blast_distance': np.random.uniform(50, 500, n_samples),  # meters
        'excavation_height': np.random.normal(25, 10, n_samples),  # meters
        'support_density': np.random.uniform(0, 1, n_samples),  # ratio
        
        # Historical factors
        'previous_rockfall_30d': np.random.poisson(1, n_samples),  # count
        'maintenance_days_since': np.random.exponential(15, n_samples),  # days
    }
    
    df = pd.DataFrame(data)
    
    # Ensure realistic bounds
    df['slope_angle'] = np.clip(df['slope_angle'], 10, 90)
    df['joint_spacing'] = np.clip(df['joint_spacing'], 0.1, 5.0)
    df['rock_strength'] = np.clip(df['rock_strength'], 10, 100)
    df['excavation_height'] = np.clip(df['excavation_height'], 5, 100)
    df['blast_distance'] = np.clip(df['blast_distance'], 50, 1000)
    
    return df

def calculate_risk_labels(df):
    """
    Calculate risk labels based on engineered risk score.
    This simulates expert knowledge for risk assessment.
    """
    # Risk scoring based on multiple factors
    risk_score = (
        (df['slope_angle'] / 90) * 0.25 +  # Steeper slopes = higher risk
        (1 / (df['joint_spacing'] + 0.1)) * 0.2 +  # Closer joints = higher risk
        ((10 - df['rock_strength']) / 100) * 0.2 +  # Weaker rock = higher risk
        (df['weathering_index'] / 10) * 0.15 +  # More weathering = higher risk
        (df['rainfall_24h'] / 20) * 0.1 +  # More rain = higher risk
        (df['vibration_intensity'] / 5) * 0.1  # More vibration = higher risk
    )
    
    # Add some randomness to make it more realistic
    risk_score += np.random.normal(0, 0.1, len(df))
    risk_score = np.clip(risk_score, 0, 1)
    
    # Convert to categorical labels
    risk_labels = []
    risk_probabilities = []
    
    for score in risk_score:
        if score < 0.25:
            risk_labels.append('Low')
            risk_probabilities.append(score * 25)  # 0-25%
        elif score < 0.5:
            risk_labels.append('Medium')
            risk_probabilities.append(25 + (score - 0.25) * 100)  # 25-50%
        elif score < 0.75:
            risk_labels.append('High')
            risk_probabilities.append(50 + (score - 0.5) * 100)  # 50-75%
        else:
            risk_labels.append('Critical')
            risk_probabilities.append(75 + (score - 0.75) * 100)  # 75-100%
    
    return risk_labels, risk_probabilities

def train_rockfall_model():
    """
    Train the rockfall prediction model and save it along with preprocessing components.
    """
    print("🏗️ Generating synthetic training data...")
    df = generate_synthetic_training_data(5000)
    
    print("📊 Calculating risk labels...")
    risk_labels, risk_probabilities = calculate_risk_labels(df)
    df['risk_category'] = risk_labels
    df['risk_probability'] = risk_probabilities
    
    # Prepare features for training
    feature_columns = [col for col in df.columns if col not in ['risk_category', 'risk_probability']]
    X = df[feature_columns]
    y = df['risk_category']
    
    print(f"🎯 Training on {len(X)} samples with {len(feature_columns)} features")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train the model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42
    )
    
    model.fit(X_train_scaled, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"✅ Model trained with accuracy: {accuracy:.3f}")
    print("\n📈 Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save model components
    model_info = {
        'feature_columns': feature_columns,
        'risk_categories': ['Low', 'Medium', 'High', 'Critical'],
        'training_accuracy': accuracy,
        'trained_date': datetime.now().isoformat(),
        'model_type': 'RandomForestClassifier',
        'n_samples': len(X),
        'n_features': len(feature_columns)
    }
    
    # Save all components
    joblib.dump(model, 'rockfall_model.pkl')
    joblib.dump(scaler, 'feature_scaler.pkl')
    
    with open('model_info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    # Save sample data for testing
    sample_data = df.sample(100).to_json(orient='records', indent=2)
    with open('sample_data.json', 'w') as f:
        f.write(sample_data)
    
    print("💾 Model saved successfully!")
    print(f"   - rockfall_model.pkl (trained model)")
    print(f"   - feature_scaler.pkl (preprocessing)")
    print(f"   - model_info.json (metadata)")
    print(f"   - sample_data.json (test data)")
    
    return model, scaler, model_info

if __name__ == "__main__":
    print("🚀 Training Rockfall Prediction Model")
    print("=" * 50)
    
    model, scaler, info = train_rockfall_model()
    
    print("\n🎉 Model training completed successfully!")
    print(f"Ready to predict rockfall risk with {info['training_accuracy']:.1%} accuracy")