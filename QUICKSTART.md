# 🚀 Quick Start Guide

## Smart India Hackathon 2024 - Rockfall Prediction System

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Web browser** (Chrome, Firefox, Safari, Edge)

### Option 1: Quick Local Setup (Recommended)

#### Step 1: Start Backend API
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install flask flask-cors numpy pandas python-dotenv

# Start the Flask server
python app.py
```
The API will be available at: http://localhost:5000

#### Step 2: Start Frontend Dashboard
```bash
# Open a new terminal/command prompt
cd frontend

# Install Node.js dependencies
npm install

# Start React development server
npm start
```
The dashboard will open at: http://localhost:3000

### Option 2: Using Startup Scripts

#### Windows Users
```bash
# Backend
.\backend\start.bat

# Frontend (in new terminal)
.\frontend\start.bat
```

#### Linux/Mac Users
```bash
# Backend
./backend/start.sh

# Frontend (in new terminal)
./frontend/start.sh
```

### Option 3: Docker Deployment
```bash
# Start both services with Docker Compose
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

## 🎯 System Features

### 📊 Live Monitoring
- Real-time sensor data simulation
- Risk probability trending
- System status monitoring
- Interactive charts and visualizations

### 🤖 Prediction Demo
- Interactive prediction interface
- Preset risk scenarios (Low, Medium, High)
- Detailed risk assessment results
- Model confidence scoring

### 🗺️ Risk Maps & Alerts
- Mine zone risk visualization
- Mock alert management system
- Communication system demos (SMS/Email)
- Alert history tracking

### ⚙️ System Overview
- Complete architecture documentation
- Deployment guides and configurations
- Integration specifications
- Technology stack details

## 🧪 API Testing

### Test Endpoints
```bash
# Health check
GET http://localhost:5000/health

# Get mock sensor data
GET http://localhost:5000/mock-data

# Make prediction
POST http://localhost:5000/predict
Content-Type: application/json
{
  "slope_angle": 45.5,
  "joint_spacing": 0.8,
  "rock_strength": 55.2,
  "weathering_index": 4.5,
  "rainfall_24h": 5.2
  // ... other parameters
}
```

## 📁 Project Structure
```
📦 Rockfall Prediction System
├── 📂 backend/          # Flask API + ML Model
│   ├── app.py          # Main Flask application
│   ├── requirements.txt # Python dependencies
│   ├── Dockerfile      # Container configuration
│   └── start.bat/.sh   # Startup scripts
├── 📂 frontend/         # React Dashboard
│   ├── src/
│   │   ├── App.js      # Main React component
│   │   ├── components/ # Dashboard components
│   │   └── services/   # API integration
│   ├── package.json    # Node dependencies
│   └── start.bat/.sh   # Startup scripts
├── 📂 model/           # ML Model & Data
│   ├── model_info.json # Model metadata
│   ├── sample_data.json # Test data
│   └── predictor.py    # Model utilities
├── 📄 README.md        # This file
├── 📄 DEPLOYMENT.md    # Deployment guide
└── 🐳 docker-compose.yml # Container orchestration
```

## 🎨 Technology Stack

### Backend
- **Flask 2.3+** - Web framework
- **NumPy & Pandas** - Data processing
- **Scikit-learn** - Machine learning
- **Flask-CORS** - Cross-origin support

### Frontend
- **React.js 18** - UI framework
- **Chart.js 4.0** - Data visualization
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Deployment
- **Docker** - Containerization
- **Render** - Backend hosting
- **Vercel/Netlify** - Frontend hosting

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
FLASK_ENV=development
API_PORT=5000
CORS_ORIGINS=http://localhost:3000
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_UPDATE_INTERVAL=3000
```

## 🚀 Cloud Deployment

### Quick Deploy to Cloud
1. **Fork this repository** to your GitHub
2. **Backend**: Deploy to [Render.com](https://render.com) (free tier)
3. **Frontend**: Deploy to [Vercel.com](https://vercel.com) (free tier)
4. **Configure**: Update API URLs in environment variables

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed cloud deployment instructions.

## 🤝 Smart India Hackathon 2024

### Problem Statement
**AI-Based Rockfall Prediction and Alert System for Open-Pit Mines**
- **Problem ID**: 25071
- **Ministry**: Ministry of Mines / NIRM
- **Objective**: Cost-effective, scalable software system for rockfall risk prediction

### Prototype Features
✅ **Functional**: ML prediction engine, API, dashboard  
🚧 **Mock Implementation**: IoT sensors, weather APIs, drone integration  
📋 **Documentation**: Complete architecture and deployment guides  

## 📞 Support & Issues

For questions or issues:
1. Check the browser console for frontend errors
2. Check terminal output for backend errors  
3. Verify all dependencies are installed correctly
4. Ensure both servers are running on correct ports

## 📈 Next Steps for Production

1. **Real Data Integration**: Connect to actual IoT sensors and weather APIs
2. **Security**: Implement authentication, input validation, SSL
3. **Database**: Add persistent data storage (PostgreSQL/MongoDB)
4. **Monitoring**: Application performance monitoring and logging
5. **Scalability**: Load balancing and auto-scaling configuration

---

**© 2024 Smart India Hackathon - Rockfall Prediction System Prototype**