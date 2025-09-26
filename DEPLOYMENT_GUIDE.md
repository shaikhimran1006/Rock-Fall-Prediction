# RockFall Prediction System - Deployment Guide

🚀 **AI-Powered Mine Safety Monitoring Platform with Multilingual Support**

This guide covers both local development setup and production deployment on Render.

## 🌟 Features

- **Real-time Rock-fall Risk Prediction** using AI/ML models
- **Multilingual Support** - Available in 7 languages:
  - English (Default)
  - Hindi (हिन्दी)
  - Marathi (मराठी)
  - Tamil (தமிழ்)
  - Telugu (తెలుగు)
  - Bengali (বাংলা)
  - Gujarati (ગુજરાતી)
- **Live Sensor Monitoring** with real-time data visualization
- **Interactive Dashboards** with Chart.js integration
- **Risk Assessment Maps** and Alert Systems
- **Responsive Design** optimized for all devices

---

## 🏠 Local Development Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/shaikhimran1006/Rock-Fall-Prediction.git
cd Rock-Fall-Prediction
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

The backend will run on `http://localhost:5000`

**Available API Endpoints:**
- `GET /` - API status
- `GET /health` - Health check
- `POST /predict` - Rock-fall prediction
- `GET /mock-data` - Live sensor simulation
- `GET /historical-data` - Historical trend data

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install Node.js dependencies
npm install --legacy-peer-deps

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. The application should automatically connect to the backend
3. Test language switching using the language selector in the top-right corner
4. Explore all features: Live Monitoring, AI Predictions, Risk Maps, and System Overview

---

## 🌐 Production Deployment on Render

### Method 1: One-Click Deployment (Recommended)

1. **Fork this repository** to your GitHub account

2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New" → "Blueprint"

3. **Deploy from Blueprint:**
   - Select your forked repository
   - Render will automatically detect the `render.yaml` file
   - Click "Apply" to deploy both services

4. **Update Environment Variables:**
   - After deployment, go to your frontend service settings
   - Update `REACT_APP_API_URL` with your backend service URL
   - Format: `https://your-backend-service-name.onrender.com`

### Method 2: Manual Deployment

#### Deploy Backend (Web Service)

1. **Create a new Web Service:**
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub repository
   - Set the following:
     - **Name:** `rockfall-api-backend`
     - **Root Directory:** `backend`
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 app:app`

2. **Environment Variables:**
   ```
   FLASK_ENV=production
   FLASK_DEBUG=False
   PYTHONPATH=/opt/render/project/src
   ```

3. **Health Check Path:** `/health`

#### Deploy Frontend (Static Site)

1. **Create a new Static Site:**
   - Choose your repository
   - Set the following:
     - **Name:** `rockfall-prediction-frontend`
     - **Root Directory:** `frontend`
     - **Build Command:** `npm install --legacy-peer-deps && npm run build`
     - **Publish Directory:** `build`

2. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-service-name.onrender.com
   REACT_APP_NAME=RockFall Prediction System
   REACT_APP_VERSION=1.0.0
   ```

3. **Redirects and Rewrites:**
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

---

## 🔧 Configuration Details

### Backend Configuration

**File: `backend/.env`**
```env
# Development Configuration
FLASK_APP=app.py
FLASK_DEBUG=True
FLASK_ENV=development
API_PORT=5000
API_HOST=0.0.0.0

# For Production, set:
# FLASK_DEBUG=False
# FLASK_ENV=production
```

**File: `backend/requirements.txt`**
```
Flask==2.3.3
Flask-CORS==4.0.0
numpy==1.24.3
pandas==1.5.3
python-dotenv==1.0.0
gunicorn==21.2.0
scikit-learn==1.3.0
joblib==1.3.2
```

### Frontend Configuration

**File: `frontend/.env`**
```env
# Development API URL
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME="RockFall Prediction System"
REACT_APP_VERSION=1.0.0
```

**File: `frontend/.env.production`**
```env
# Production API URL (update after backend deployment)
REACT_APP_API_URL=https://your-backend-domain.onrender.com
REACT_APP_NAME="RockFall Prediction System"
REACT_APP_VERSION=1.0.0
```

---

## 🌍 Multilingual Features

The application supports 7 languages with complete translation coverage:

### Language Files Location
```
frontend/src/i18n/locales/
├── en.json (English - Default)
├── hi.json (Hindi)
├── mr.json (Marathi)
├── ta.json (Tamil)
├── te.json (Telugu)
├── bn.json (Bengali)
└── gu.json (Gujarati)
```

### Adding New Languages

1. Create a new JSON file in `frontend/src/i18n/locales/`
2. Copy the structure from `en.json`
3. Translate all keys to the new language
4. Add the language to `frontend/src/i18n/i18n.js`:

```javascript
resources: {
  en: { translation: require('./locales/en.json') },
  hi: { translation: require('./locales/hi.json') },
  // Add your new language here
  newLang: { translation: require('./locales/newLang.json') },
}
```

5. Add the language option to `frontend/src/components/LanguageSelector.js`

---

## 📊 API Documentation

### Prediction Endpoint

**POST** `/predict`

**Request Body:**
```json
{
  "slope_angle": 45.5,
  "joint_spacing": 2.1,
  "rock_strength": 85.3,
  "rainfall_24h": 12.5,
  "vibration_intensity": 3.2,
  "weathering_index": 0.65,
  "excavation_height": 25.0,
  "blast_distance": 150.0,
  "support_density": 0.8
}
```

**Response:**
```json
{
  "prediction": {
    "risk_category": "Medium",
    "risk_probability": 68.5,
    "confidence": 92.3
  },
  "recommendations": [
    "Increase monitoring frequency",
    "Consider additional support measures"
  ]
}
```

### Mock Data Endpoint

**GET** `/mock-data`

Returns real-time sensor simulation data for dashboard visualization.

### Historical Data Endpoint

**GET** `/historical-data`

Returns historical trend data for charts and analysis.

---

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors in Production
- Ensure backend CORS is configured with your frontend domain
- Update `app.py` with your production frontend URL

#### 2. API Connection Issues
- Verify `REACT_APP_API_URL` points to correct backend URL
- Check backend service is running and accessible
- Verify backend health endpoint: `/health`

#### 3. Language Switching Not Working
- Check browser console for missing translation keys
- Verify all language files have complete translations
- Clear browser cache and refresh

#### 4. Build Failures on Render
- Use `npm install --legacy-peer-deps` in build command
- Check Node.js version compatibility
- Verify all dependencies are listed in package.json

### Development Debugging

```bash
# Check backend status
curl http://localhost:5000/health

# Check API response
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"slope_angle": 45, "joint_spacing": 2, "rock_strength": 85}'

# Test frontend build
cd frontend
npm run build
```

---

## 📈 Performance Optimization

### Backend Optimizations
- Use Gunicorn with multiple workers in production
- Implement request caching for frequent queries
- Optimize model loading and inference

### Frontend Optimizations
- Enable React production build optimizations
- Implement code splitting for better loading
- Use CDN for static assets

---

## 🔒 Security Considerations

### Production Security
- Set `FLASK_DEBUG=False` in production
- Use environment variables for sensitive data
- Implement proper CORS policies
- Regular security updates for dependencies

### Data Protection
- Validate all input parameters
- Sanitize user inputs
- Implement rate limiting for API endpoints

---

## 📞 Support & Contributing

### Getting Help
- Create an issue on GitHub for bugs or feature requests
- Check the troubleshooting section above
- Review the API documentation

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 🎉 Acknowledgments

- Built with React.js and Flask
- Internationalization powered by react-i18next
- Charts powered by Chart.js
- Styled with Tailwind CSS
- Deployed on Render

---

**🌟 Enjoy monitoring rock-fall risks with AI-powered precision in your preferred language! 🌟**