# Deployment Guide - Smart India Hackathon Rockfall System

## Quick Deploy Options

### Option 1: Render + Vercel (Recommended)

#### Backend on Render
1. Fork this repository to your GitHub account
2. Go to [Render.com](https://render.com) and connect your GitHub
3. Create a new **Web Service**:
   - Repository: Your forked repo
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --bind 0.0.0.0:$PORT --workers 2 app:app`
4. Set Environment Variables:
   ```
   FLASK_ENV=production
   PYTHONPATH=/opt/render/project/src
   ```
5. Deploy and note your backend URL

#### Frontend on Vercel
1. Go to [Vercel.com](https://vercel.com) and import your repo
2. Set Root Directory to `frontend`
3. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
4. Deploy

### Option 2: Netlify + Render

#### Backend on Render (same as above)

#### Frontend on Netlify
1. Go to [Netlify.com](https://netlify.com) and connect your repo
2. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`
3. Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

### Option 3: Docker Deployment

#### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd rockfall-system

# Run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

#### Production Docker
```bash
# Build backend
cd backend
docker build -t rockfall-backend .
docker run -p 5000:5000 rockfall-backend

# Build frontend
cd ../frontend
docker build -t rockfall-frontend .
docker run -p 3000:80 rockfall-frontend
```

## Environment Variables

### Backend (.env)
```
FLASK_ENV=production
API_PORT=5000
CORS_ORIGINS=https://your-frontend-domain.com
LOG_LEVEL=INFO
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_ENABLE_LOGGING=false
REACT_APP_UPDATE_INTERVAL=3000
```

## Domain Configuration

### Custom Domain Setup
1. **Backend**: Configure your backend domain in Render dashboard
2. **Frontend**: Add custom domain in Vercel/Netlify dashboard
3. **CORS**: Update CORS_ORIGINS in backend environment
4. **API URL**: Update REACT_APP_API_URL in frontend environment

## SSL/HTTPS
Both Render and Vercel/Netlify provide free SSL certificates automatically.

## Monitoring & Logs
- **Render**: Built-in logs and monitoring dashboard
- **Vercel**: Function logs and analytics
- **Custom**: Add application logging for production monitoring

## Cost Estimate
- **Free Tier**: $0/month (Render free tier + Vercel/Netlify free tier)
- **Paid Tier**: ~$7-20/month for better performance and custom domains

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check CORS_ORIGINS environment variable
2. **API Not Found**: Verify REACT_APP_API_URL is set correctly
3. **Build Failures**: Check Node.js version (use 18.x) and Python version (use 3.9+)

### Health Checks
- Backend: `GET /health`
- Frontend: Check browser console for errors
- API: Test with `curl https://your-api-url.com/health`

## Demo URLs
After deployment, you can access:
- **Dashboard**: `https://your-frontend-url.com`
- **API Docs**: `https://your-backend-url.com/`
- **Live Monitoring**: `https://your-frontend-url.com/`
- **Prediction Demo**: `https://your-frontend-url.com/prediction`

---

**Note**: This is a prototype system. For production deployment in an actual mining operation, additional security, monitoring, and integration features should be implemented.