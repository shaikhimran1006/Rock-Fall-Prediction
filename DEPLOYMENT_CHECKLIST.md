# Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend Preparation
- [x] Flask app configured for production
- [x] CORS configured for production domains
- [x] Environment variables set up
- [x] requirements.txt updated with all dependencies
- [x] Health check endpoint implemented
- [x] Gunicorn configuration ready

### Frontend Preparation
- [x] Environment variables configured
- [x] API endpoints using environment variables
- [x] Build process optimized
- [x] All 7 language files complete
- [x] Language switching fully functional
- [x] Production build tested

### Deployment Configuration
- [x] render.yaml blueprint created
- [x] Individual service configurations ready
- [x] Environment variables documented
- [x] CORS domains configured
- [x] Redirects and rewrites configured

## 🚀 Deployment Steps

### Option 1: One-Click Blueprint Deployment
1. [ ] Fork repository to your GitHub
2. [ ] Connect Render to your GitHub account
3. [ ] Create new Blueprint from render.yaml
4. [ ] Wait for deployment to complete
5. [ ] Update frontend REACT_APP_API_URL with backend URL
6. [ ] Test all functionality

### Option 2: Manual Service Deployment
1. [ ] Deploy backend web service
2. [ ] Configure backend environment variables
3. [ ] Deploy frontend static site
4. [ ] Configure frontend environment variables
5. [ ] Set up redirects for SPA
6. [ ] Test all functionality

## 🧪 Post-Deployment Testing

- [ ] Backend health check: `/health`
- [ ] API status check: `/`
- [ ] Frontend loads successfully
- [ ] Language switching works in all 7 languages
- [ ] Live monitoring displays data
- [ ] AI predictions work correctly
- [ ] All charts and visualizations render
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked

## 📝 Configuration Updates Needed

After deployment, update these values:

1. **Backend CORS origins** in `app.py`:
   ```python
   CORS(app, origins=[
       "https://your-frontend-domain.onrender.com",
       "http://localhost:3000",
       "http://127.0.0.1:3000"
   ])
   ```

2. **Frontend API URL** in Render dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-domain.onrender.com
   ```

## 🚨 Troubleshooting

- **CORS Issues**: Update backend CORS origins
- **API Connection**: Verify REACT_APP_API_URL
- **Build Failures**: Use --legacy-peer-deps flag
- **Language Issues**: Check translation files completeness
- **Charts Not Loading**: Verify Chart.js dependencies

## 📞 Support

If you encounter issues:
1. Check the [Deployment Guide](DEPLOYMENT_GUIDE.md)
2. Review terminal/console logs
3. Test API endpoints individually
4. Verify environment variables
5. Create GitHub issue with details