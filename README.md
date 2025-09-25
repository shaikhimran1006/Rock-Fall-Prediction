# AI-Based Rockfall Prediction and Alert System

**Smart India Hackathon 2024**  
**Problem ID:** 25071 – Ministry of Mines / NIRM

## 🎯 Project Overview

This prototype demonstrates a cost-effective, scalable software system that predicts rockfall risk in open-pit mines using AI/ML and presents real-time insights through an interactive web dashboard.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm

### 1. Start Backend API
```bash
cd backend
pip install flask flask-cors numpy pandas python-dotenv
python app.py
```
🌐 API available at: http://localhost:5000

### 2. Start Frontend Dashboard
```bash
cd frontend
npm install
npm start
```
🎛️ Dashboard opens at: http://localhost:3000

**See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions**

## 📁 System Architecture

```
� Rockfall Prediction System
├── 📂 backend/          # Flask API + ML Model
├── 📂 frontend/         # React Dashboard
├── 📂 model/           # Trained ML model and sample data
├── 📄 QUICKSTART.md    # Detailed setup guide
├── 📄 DEPLOYMENT.md    # Cloud deployment guide
└── 🐳 docker-compose.yml # Container orchestration
```

## ✨ Features

### 📊 Live Monitoring
- Real-time sensor data simulation
- Risk probability trending charts
- System status monitoring
- Interactive visualizations

### 🤖 Prediction Demo
- Interactive prediction interface
- Preset risk scenarios
- Detailed risk assessment results
- Model confidence scoring

### 🗺️ Risk Maps & Alerts
- Mine zone risk visualization
- Mock alert management
- Communication system demos
- Alert history tracking

### ⚙️ System Overview
- Complete architecture documentation
- Deployment guides
- Integration specifications

## 🧠 Machine Learning

- **Algorithm:** Random Forest Classifier
- **Features:** 16 environmental & geological parameters
- **Accuracy:** ~86% on test dataset
- **Categories:** Low, Medium, High, Critical risk levels
- **Real-time:** Sub-200ms prediction response time

## 🔧 Technology Stack

### Backend
- Flask 2.3+ (Web framework)
- Scikit-learn (ML models)
- NumPy & Pandas (Data processing)
- Flask-CORS (API integration)

### Frontend
- React.js 18 (UI framework)
- Chart.js 4.0 (Data visualization)
- Tailwind CSS (Styling)
- Axios (HTTP client)

### Deployment
- Docker (Containerization)
- Render (Backend hosting)
- Vercel/Netlify (Frontend hosting)

## 🌩️ Cloud Deployment

### Option 1: Free Tier (Recommended)
1. Fork this repository
2. Deploy backend to [Render.com](https://render.com)
3. Deploy frontend to [Vercel.com](https://vercel.com)
4. Configure environment variables

### Option 2: Docker
```bash
docker-compose up --build
```

**See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions**

## 🧪 API Endpoints

```bash
# Health check
GET /health

# Live sensor data
GET /mock-data

# Risk prediction
POST /predict
{
  "slope_angle": 45.5,
  "joint_spacing": 0.8,
  "rock_strength": 55.2,
  // ... other sensor parameters
}
```

## 📱 Demo Screenshots

### Live Monitoring Dashboard
- Real-time risk assessment
- Sensor data visualization
- System status monitoring

### Prediction Interface
- Interactive parameter input
- Instant risk predictions
- Detailed confidence scoring

### Risk Maps & Alerts
- Mine zone visualization
- Alert management system
- Communication interfaces

## 🎯 Smart India Hackathon Context

### Problem Statement
**AI-Based Rockfall Prediction and Alert System for Open-Pit Mines**

### Implementation Status
- ✅ **Functional**: ML prediction engine, API, dashboard
- 🚧 **Mock**: IoT sensors, weather APIs, drone integration  
- 📋 **Ready**: Production deployment configuration

### Key Deliverables
1. **Working prototype** with functional ML predictions
2. **Interactive dashboard** with real-time monitoring
3. **Complete documentation** for production deployment
4. **Cloud-ready architecture** with deployment guides

## 🔮 Production Roadmap

### Phase 1: Real Data Integration
- IoT sensor connections
- Weather API integration
- Drone imagery processing
- DEM data ingestion

### Phase 2: Enhanced Features
- User authentication system
- Database persistence
- Advanced alerting (SMS/Email)
- Performance monitoring

### Phase 3: Scalability
- Load balancing
- Multi-mine deployment
- Advanced ML models
- Predictive maintenance

## 📞 Support

For setup help or questions:
1. Check [QUICKSTART.md](QUICKSTART.md) for detailed instructions
2. Review browser console and terminal output for errors
3. Verify all prerequisites are installed
4. Ensure both servers are running on correct ports

---

**© 2024 Smart India Hackathon - AI-Based Rockfall Prediction System**  
*Prototype developed for Problem ID 25071 - Ministry of Mines / NIRM*