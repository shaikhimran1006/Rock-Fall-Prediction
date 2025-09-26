/**
 * System Overview Component
 * Documentation and architecture overview of the rockfall prediction system
 */

import React, { useState } from 'react';

const SystemOverview = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  const architectureData = {
    components: [
      {
        name: 'Data Collection Layer',
        icon: '📡',
        description: 'Multi-source data ingestion from sensors, weather APIs, and drone imagery',
        technologies: ['IoT Sensors', 'Weather APIs', 'Drone Integration', 'DEM Data'],
        status: 'Mock Implementation'
      },
      {
        name: 'AI/ML Processing Engine',
        icon: '🧠',
        description: 'Machine learning models for rockfall risk prediction and analysis',
        technologies: ['Scikit-learn', 'NumPy', 'Pandas', 'Feature Engineering'],
        status: 'Functional'
      },
      {
        name: 'API Gateway',
        icon: '🔌',
        description: 'REST API endpoints for data processing and prediction services',
        technologies: ['Flask', 'CORS', 'JSON API', 'Error Handling'],
        status: 'Functional'
      },
      {
        name: 'Real-time Dashboard',
        icon: '📊',
        description: 'Interactive web interface for monitoring and visualization',
        technologies: ['React.js', 'Chart.js', 'Real-time Updates', 'Responsive UI'],
        status: 'Functional'
      },
      {
        name: 'Alert & Notification System',
        icon: '🚨',
        description: 'Multi-channel alert delivery for immediate risk communication',
        technologies: ['SMS Integration', 'Email Services', 'Push Notifications', 'Site Alarms'],
        status: 'Mock Implementation'
      }
    ]
  };

  const deploymentOptions = [
    {
      name: 'Cloud Deployment',
      icon: '☁️',
      backend: 'Render / Appwrite',
      frontend: 'Vercel / Netlify / Firebase',
      benefits: ['Auto-scaling', 'High availability', 'Global CDN', 'Easy maintenance'],
      cost: 'Free tier available'
    },
    {
      name: 'On-Premise Deployment',
      icon: '🏢',
      backend: 'Docker + Kubernetes',
      frontend: 'Nginx / Apache',
      benefits: ['Data control', 'Custom security', 'No internet dependency', 'Direct sensor integration'],
      cost: 'Hardware + maintenance'
    },
    {
      name: 'Hybrid Deployment',
      icon: '🔗',
      backend: 'Local processing + Cloud backup',
      frontend: 'Edge deployment with cloud sync',
      benefits: ['Best of both worlds', 'Redundancy', 'Local processing', 'Remote monitoring'],
      cost: 'Moderate infrastructure'
    }
  ];

  const integrationPoints = [
    {
      category: 'Environmental Data',
      sources: [
        'Weather station APIs (rainfall, temperature)',
        'Seismic monitoring networks',
        'Wind speed and direction sensors',
        'Humidity and atmospheric pressure'
      ],
      implementation: 'REST API integration with data validation and caching'
    },
    {
      category: 'Geological Monitoring',
      sources: [
        'Ground-penetrating radar systems',
        'Slope stability sensors and inclinometers',
        'Joint orientation and spacing measurements',
        'Rock strength testing equipment'
      ],
      implementation: 'Real-time sensor data ingestion via MQTT/HTTP protocols'
    },
    {
      category: 'Operational Data',
      sources: [
        'Blasting schedule and intensity data',
        'Excavation equipment locations',
        'Mine vehicle vibration sensors',
        'Maintenance and inspection logs'
      ],
      implementation: 'Integration with existing mine management systems (ERP/SCADA)'
    },
    {
      category: 'Surveillance Systems',
      sources: [
        'Drone imagery and LiDAR scanning',
        'Fixed camera monitoring networks',
        'Thermal imaging for crack detection',
        'Digital elevation model (DEM) updates'
      ],
      implementation: 'Computer vision processing with change detection algorithms'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section with Stats */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              RockFall Analytics Platform
            </h2>
            <p className="text-gray-300 text-lg">Next-generation AI-powered mine safety monitoring system</p>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white font-bold text-xl">86%</span>
              </div>
              <div className="text-white font-semibold">AI Accuracy</div>
              <div className="text-gray-400 text-sm">ML Model Performance</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white font-bold text-lg">&lt;200ms</span>
              </div>
              <div className="text-white font-semibold">Response Time</div>
              <div className="text-gray-400 text-sm">Real-time Predictions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white font-bold text-xl">24/7</span>
              </div>
              <div className="text-white font-semibold">Monitoring</div>
              <div className="text-gray-400 text-sm">Continuous Operation</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white font-bold text-lg">16</span>
              </div>
              <div className="text-white font-semibold">Data Points</div>
              <div className="text-gray-400 text-sm">Sensor Parameters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="relative">
        <nav className="flex space-x-1 bg-white/5 backdrop-blur-lg rounded-xl p-1 border border-white/10">
          {[
            { key: 'architecture', label: 'System Architecture', icon: '🏗️' },
            { key: 'deployment', label: 'Deployment Options', icon: '🚀' },
            { key: 'integration', label: 'Data Integration', icon: '🔗' },
            { key: 'specifications', label: 'Technical Specs', icon: '📋' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex-1 justify-center ${activeTab === tab.key
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Architecture Tab */}
      {activeTab === 'architecture' && (
        <div className="space-y-8 animate-slide-in-left">
          {/* Architecture Flow */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-500/10 to-gray-500/5 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Intelligent Data Flow Architecture</h3>

            {/* Modern Architecture Diagram */}
            <div className="relative">
              <div className="flex flex-col space-y-8">
                {/* Top Row - Data Sources */}
                <div className="flex justify-center items-center space-x-6">
                  <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-float">📡</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">IoT Sensors</span>
                  </div>
                  <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-float animation-delay-500">🌦️</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">Weather APIs</span>
                  </div>
                  <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-float animation-delay-1000">�</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">Drone Imagery</span>
                  </div>
                </div>

                {/* Arrows */}
                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400 animate-bounce">↓</div>
                </div>

                {/* Middle Row - Processing */}
                <div className="flex justify-center items-center space-x-12">
                  <div className="flex flex-col items-center group">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">🔌</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">API Gateway</span>
                  </div>
                  <div className="text-4xl text-purple-400">→</div>
                  <div className="flex flex-col items-center group">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">🧠</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">AI Engine</span>
                  </div>
                </div>

                {/* Arrows */}
                <div className="flex justify-center">
                  <div className="text-4xl text-green-400 animate-bounce animation-delay-500">↓</div>
                </div>

                {/* Bottom Row - Output */}
                <div className="flex justify-center items-center space-x-8">
                  <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">📊</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">Dashboard</span>
                  </div>
                  <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">🚨</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">Alerts</span>
                  </div>
                  <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">📱</div>
                    <span className="text-sm mt-3 text-gray-300 font-medium">Mobile App</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Components Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {architectureData.components.map((component, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br backdrop-blur-lg border border-white/20 p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-scale-in ${index % 5 === 0 ? 'from-blue-500/20 to-cyan-500/10' :
                  index % 5 === 1 ? 'from-green-500/20 to-emerald-500/10' :
                    index % 5 === 2 ? 'from-purple-500/20 to-violet-500/10' :
                      index % 5 === 3 ? 'from-yellow-500/20 to-orange-500/10' :
                        'from-pink-500/20 to-red-500/10'
                }`} style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{component.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">{component.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${component.status === 'Functional'
                          ? 'bg-green-500/30 text-green-200'
                          : 'bg-yellow-500/30 text-yellow-200'
                        }`}>
                        {component.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{component.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {component.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-white/10 text-gray-200 px-3 py-1 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60 ${index % 5 === 0 ? 'from-blue-500 to-cyan-500' :
                    index % 5 === 1 ? 'from-green-500 to-emerald-500' :
                      index % 5 === 2 ? 'from-purple-500 to-violet-500' :
                        index % 5 === 3 ? 'from-yellow-500 to-orange-500' :
                          'from-pink-500 to-red-500'
                  }`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deployment Tab */}
      {activeTab === 'deployment' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-6">Deployment Options</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {deploymentOptions.map((option, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{option.icon}</div>
                    <h4 className="font-semibold">{option.name}</h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Backend:</p>
                      <p className="text-sm text-gray-600">{option.backend}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Frontend:</p>
                      <p className="text-sm text-gray-600">{option.frontend}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Benefits:</p>
                      <ul className="text-sm text-gray-600 mt-1">
                        {option.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium text-gray-700">Cost:</p>
                      <p className="text-sm text-gray-600">{option.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environment Variables */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Environment Configuration</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Backend Environment Variables</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>FLASK_ENV=production</div>
                  <div>API_PORT=5000</div>
                  <div>MODEL_PATH=/app/model</div>
                  <div>CORS_ORIGINS=https://yourdomain.com</div>
                  <div>LOG_LEVEL=INFO</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Frontend Environment Variables</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>REACT_APP_API_URL=https://api.yourdomain.com</div>
                  <div>REACT_APP_ENABLE_LOGGING=false</div>
                  <div>REACT_APP_UPDATE_INTERVAL=3000</div>
                  <div>REACT_APP_ENVIRONMENT=production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integration Tab */}
      {activeTab === 'integration' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-6">Data Source Integration Points</h3>

            <div className="space-y-6">
              {integrationPoints.map((integration, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-medium text-lg mb-3">{integration.category}</h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Data Sources:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {integration.sources.map((source, sourceIndex) => (
                          <li key={sourceIndex}>• {source}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Implementation:</p>
                      <p className="text-sm text-gray-600">{integration.implementation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Integration Examples */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">API Integration Examples</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Weather API Integration</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div># Weather data fetch example</div>
                  <div>curl -X GET "https://api.weather.com/v1/current" \</div>
                  <div>&nbsp;&nbsp;-H "API-Key: YOUR_API_KEY" \</div>
                  <div>&nbsp;&nbsp;-G -d "lat=-33.865" -d "lon=151.209"</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Prediction API Usage</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div># Rockfall prediction request</div>
                  <div>curl -X POST "{process.env.REACT_APP_API_URL || 'http://localhost:5000'}/predict" \</div>
                  <div>&nbsp;&nbsp;-H "Content-Type: application/json" \</div>
                  <div>&nbsp;&nbsp;-d '&#123;"slope_angle": 45.5, "joint_spacing": 0.8, ...&#125;'</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specifications Tab */}
      {activeTab === 'specifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technical Specifications */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Machine Learning Model</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Algorithm: Random Forest Classifier</li>
                    <li>• Training Data: 5,000 synthetic samples</li>
                    <li>• Features: 16 environmental & geological parameters</li>
                    <li>• Accuracy: ~86% on test dataset</li>
                    <li>• Prediction Categories: Low, Medium, High, Critical</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Performance Requirements</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Response Time: &lt; 200ms for predictions</li>
                    <li>• Throughput: 1000+ requests/minute</li>
                    <li>• Uptime: 99.9% availability target</li>
                    <li>• Data Update Frequency: Every 3 seconds</li>
                    <li>• Concurrent Users: 50+ simultaneous</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Security Requirements</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• HTTPS/TLS encryption for all data</li>
                    <li>• API authentication and rate limiting</li>
                    <li>• Input validation and sanitization</li>
                    <li>• Audit logging for all predictions</li>
                    <li>• Role-based access control</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* System Requirements */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">System Requirements</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Backend Server</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• CPU: 2+ cores, 2.4GHz+</li>
                    <li>• RAM: 4GB minimum, 8GB recommended</li>
                    <li>• Storage: 10GB for model and logs</li>
                    <li>• OS: Linux/Windows/macOS</li>
                    <li>• Python 3.8+ with ML libraries</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Database</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Type: PostgreSQL/MongoDB for production</li>
                    <li>• Storage: Historical data archival</li>
                    <li>• Backup: Automated daily backups</li>
                    <li>• Indexing: Optimized for time-series queries</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Network & Infrastructure</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Bandwidth: 10 Mbps minimum</li>
                    <li>• Latency: &lt; 50ms to sensors</li>
                    <li>• Redundancy: Load balancing support</li>
                    <li>• Monitoring: Health checks and alerts</li>
                    <li>• Backup: Multi-region deployment option</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Development Stack */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Development Stack</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Backend Technologies</h4>
                <div className="space-y-2">
                  {[
                    'Python 3.8+',
                    'Flask 2.3+',
                    'Scikit-learn 1.0+',
                    'NumPy & Pandas',
                    'Flask-CORS',
                    'Gunicorn WSGI'
                  ].map((tech, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Frontend Technologies</h4>
                <div className="space-y-2">
                  {[
                    'React.js 18+',
                    'Chart.js 4.0+',
                    'Tailwind CSS 3.0+',
                    'Axios HTTP Client',
                    'React Router v6',
                    'Responsive Design'
                  ].map((tech, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">DevOps & Deployment</h4>
                <div className="space-y-2">
                  {[
                    'Docker Containerization',
                    'Environment Variables',
                    'CI/CD Pipeline Ready',
                    'Cloud Platform Optimized',
                    'Logging & Monitoring',
                    'Error Handling'
                  ].map((tech, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prototype Disclaimer */}
      <div className="card p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start">
          <div className="text-yellow-600 mr-3 text-2xl">⚠️</div>
          <div>
            <h4 className="font-medium text-yellow-900 mb-2">Prototype Notice</h4>
            <p className="text-yellow-800 text-sm mb-3">
              This is a functional prototype developed for Smart India Hackathon 2024.
              The following components are currently implemented with mock data:
            </p>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Weather and environmental data integration</li>
              <li>• Real sensor hardware connections</li>
              <li>• Drone imagery and DEM processing</li>
              <li>• SMS/Email alert delivery systems</li>
              <li>• Production-grade security features</li>
            </ul>
            <p className="text-yellow-800 text-sm mt-3">
              The ML prediction engine and web dashboard are fully functional and ready for integration
              with real data sources in a production environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;