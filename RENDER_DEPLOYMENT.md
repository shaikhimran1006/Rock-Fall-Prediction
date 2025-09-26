# 🚀 Render Deployment Instructions

Due to Render's blueprint limitations, we need to deploy the backend and frontend separately. Here's the corrected deployment process:

## Method 1: Using Blueprint + Manual Frontend (Recommended)

### Step 1: Deploy Backend with Blueprint
1. Go to [render.com](https://render.com) and login
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository: `Rock-Fall-Prediction`
4. Render will detect the `render.yaml` and deploy the backend
5. Wait for backend deployment to complete
6. **Copy the backend URL** (e.g., `https://rockfall-api-backend-xxxx.onrender.com`)

### Step 2: Deploy Frontend Manually
1. Click **"New"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the static site:
   - **Name**: `rockfall-prediction-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `build`

4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://rockfall-api-backend-xxxx.onrender.com
   REACT_APP_NAME=RockFall Prediction System
   REACT_APP_VERSION=1.0.0
   ```

5. **Redirects and Rewrites**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

6. Click **"Create Static Site"**

## Method 2: Deploy Both Services Manually

### Deploy Backend Service
1. **New Web Service**:
   - Repository: `Rock-Fall-Prediction`
   - **Name**: `rockfall-api-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 app:app`

2. **Environment Variables**:
   ```
   FLASK_ENV=production
   FLASK_DEBUG=False
   PYTHONPATH=/opt/render/project/src
   ```

3. **Health Check Path**: `/health`

### Deploy Frontend Service
1. **New Static Site**:
   - Repository: `Rock-Fall-Prediction`
   - **Name**: `rockfall-prediction-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `build`

2. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   REACT_APP_NAME=RockFall Prediction System
   REACT_APP_VERSION=1.0.0
   ```

3. **Redirects**: `/*` → `/index.html` (Rewrite)

## Post-Deployment Steps

1. **Update Backend CORS**: Add your frontend domain to CORS origins
2. **Test Health Check**: Visit `https://your-backend-url.onrender.com/health`
3. **Test Frontend**: Visit `https://your-frontend-url.onrender.com`
4. **Test Language Switching**: Verify all 7 languages work
5. **Test API Integration**: Check live monitoring and predictions

## Expected URLs
- **Backend**: `https://rockfall-api-backend-xxxx.onrender.com`
- **Frontend**: `https://rockfall-prediction-frontend-xxxx.onrender.com`

Your multilingual Rock-Fall Prediction System will be live! 🌍🎉