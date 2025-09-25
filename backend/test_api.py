# API Testing Script
# Use this to test the Flask API endpoints

import requests
import json

# API base URL
BASE_URL = "http://localhost:5000"

def test_api_status():
    """Test the API status endpoint."""
    print("🧪 Testing API Status...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_prediction():
    """Test the prediction endpoint."""
    print("\n🧪 Testing Prediction Endpoint...")
    
    # Sample test data
    test_data = {
        "slope_angle": 45.5,
        "joint_spacing": 0.8,
        "joint_orientation": 120.0,
        "rock_strength": 55.2,
        "weathering_index": 4.5,
        "rainfall_24h": 5.2,
        "rainfall_7d": 22.8,
        "temperature_variation": 18.5,
        "freeze_thaw_cycles": 2,
        "wind_speed": 7.3,
        "vibration_intensity": 2.1,
        "blast_distance": 200.0,
        "excavation_height": 28.5,
        "support_density": 0.65,
        "previous_rockfall_30d": 1,
        "maintenance_days_since": 12
    }
    
    try:
        response = requests.post(f"{BASE_URL}/predict", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_mock_data():
    """Test the mock data endpoint."""
    print("\n🧪 Testing Mock Data Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/mock-data")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Rockfall API Test Suite")
    print("=" * 40)
    
    # Run tests
    tests = [
        ("API Status", test_api_status),
        ("Prediction", test_prediction), 
        ("Mock Data", test_mock_data)
    ]
    
    results = []
    for test_name, test_func in tests:
        result = test_func()
        results.append((test_name, result))
    
    # Summary
    print("\n📊 Test Results:")
    print("=" * 20)
    for test_name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name}: {status}")
    
    total_passed = sum(1 for _, passed in results if passed)
    print(f"\n🏆 {total_passed}/{len(results)} tests passed")