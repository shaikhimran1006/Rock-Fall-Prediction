/**
 * Main Application Component
 * Professional Rockfall Prediction & Monitoring System
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/i18n'; // Initialize i18n
import LanguageSelector from './components/LanguageSelector';
import LiveMonitoring from './components/LiveMonitoring';
import PredictionDemo from './components/PredictionDemo';
import RiskMaps from './components/RiskMaps';
import SystemOverview from './components/SystemOverview';
import { rockfallAPI } from './services/api';
import './styles/animations.css';

function App() {
  const { t } = useTranslation();
  const [apiStatus, setApiStatus] = useState({ online: false, loading: true });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await rockfallAPI.checkHealth();
        setApiStatus({ online: true, loading: false });
      } catch (error) {
        console.error('API Health Check Failed:', error);
        setApiStatus({ online: false, loading: false });
      }
    };

    checkApiStatus();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Check API status every 30 seconds
    const healthInterval = setInterval(checkApiStatus, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(healthInterval);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-10 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>

        {/* Header */}
        <header className="relative bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-18">
              {/* Logo and Title */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
                      <span className="text-white font-bold text-lg">RF</span>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl blur opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {t('navigation.brandName')}
                    </h1>
                    <p className="text-sm text-gray-300 font-medium">
                      {t('navigation.tagline')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status and Time */}
              <div className="flex items-center space-x-6">
                <LanguageSelector />

                <div className="text-sm text-gray-200 font-medium bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {currentTime.toLocaleString()}
                </div>

                <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <div className="relative">
                    <div
                      className={`w-3 h-3 rounded-full ${apiStatus.loading
                          ? 'bg-yellow-400 animate-pulse'
                          : apiStatus.online
                            ? 'bg-green-400'
                            : 'bg-red-400'
                        }`}
                    />
                    {apiStatus.online && (
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {apiStatus.loading
                      ? t('common.connecting')
                      : apiStatus.online
                        ? t('common.systemOnline')
                        : t('common.systemOffline')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="relative bg-white/5 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-6 py-4 text-sm font-medium rounded-t-lg transition-all duration-300 transform hover:scale-105 ${isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-b-2 border-blue-400 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span className="text-lg mr-2">📊</span>
                <span>{t('navigation.liveMonitoring')}</span>
                {({ isActive }) => isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                )}
              </NavLink>

              <NavLink
                to="/prediction"
                className={({ isActive }) =>
                  `inline-flex items-center px-6 py-4 text-sm font-medium rounded-t-lg transition-all duration-300 transform hover:scale-105 ${isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-b-2 border-purple-400 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span className="text-lg mr-2">🤖</span>
                <span>{t('navigation.aiPredictions')}</span>
              </NavLink>

              <NavLink
                to="/risk-maps"
                className={({ isActive }) =>
                  `inline-flex items-center px-6 py-4 text-sm font-medium rounded-t-lg transition-all duration-300 transform hover:scale-105 ${isActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-red-500/20 text-white border-b-2 border-pink-400 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span className="text-lg mr-2">🗺️</span>
                <span>{t('navigation.riskAssessment')}</span>
              </NavLink>

              <NavLink
                to="/system-overview"
                className={({ isActive }) =>
                  `inline-flex items-center px-6 py-4 text-sm font-medium rounded-t-lg transition-all duration-300 transform hover:scale-105 ${isActive
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white border-b-2 border-green-400 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span className="text-lg mr-2">⚙️</span>
                <span>{t('navigation.systemStatus')}</span>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {!apiStatus.online && !apiStatus.loading && (
            <div className="mb-6 p-6 bg-red-500/10 backdrop-blur-lg border border-red-500/20 text-red-100 rounded-xl shadow-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    ⚠️
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{t('common.systemConnectionError')}</h3>
                  <p className="text-red-200 mb-3">
                    {t('common.connectionErrorMessage')}
                  </p>
                  <p className="text-sm text-red-300">
                    {t('common.verifyServerMessage')}{' '}
                    <code className="bg-red-500/20 px-2 py-1 rounded font-mono">http://localhost:5000</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <Routes>
              <Route path="/" element={<LiveMonitoring />} />
              <Route path="/prediction" element={<PredictionDemo />} />
              <Route path="/risk-maps" element={<RiskMaps />} />
              <Route path="/system-overview" element={<SystemOverview />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative bg-black/20 backdrop-blur-lg border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Product Overview
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Advanced AI-powered rockfall prediction and monitoring system designed for open-pit mining operations.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Enhancing mine safety through intelligent risk assessment
                  </p>
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Core Technology
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-center"><span className="text-green-400 mr-2">●</span> Machine Learning Risk Models</li>
                    <li className="flex items-center"><span className="text-blue-400 mr-2">●</span> Real-time Sensor Integration</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">●</span> Predictive Analytics Engine</li>
                    <li className="flex items-center"><span className="text-pink-400 mr-2">●</span> Cloud-native Architecture</li>
                  </ul>
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Enterprise Features
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-center"><span className="text-green-400 mr-2">●</span> 24/7 Continuous Monitoring</li>
                    <li className="flex items-center"><span className="text-yellow-400 mr-2">●</span> Automated Alert System</li>
                    <li className="flex items-center"><span className="text-blue-400 mr-2">●</span> Historical Data Analytics</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">●</span> Scalable Infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center">
              <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <p className="font-medium">
                  © 2025 RockFall Analytics - Professional Mine Safety Monitoring Platform
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;