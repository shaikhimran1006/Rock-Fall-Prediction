/**
 * Live Monitoring Component
 * Real-time display of sensor data and risk predictions
 */

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { rockfallAPI, formatRiskLevel } from '../services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const LiveMonitoring = () => {
  const { t } = useTranslation();
  const [currentData, setCurrentData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const intervalRef = useRef(null);

  // Fetch live data from API
  const fetchLiveData = async () => {
    try {
      const data = await rockfallAPI.getMockData();
      setCurrentData(data);
      setLastUpdate(new Date());

      // Add to historical data (keep last 20 points)
      setHistoricalData(prev => {
        const newData = [...prev, {
          timestamp: new Date().toLocaleTimeString(),
          risk: data.prediction.risk_probability,
          category: data.prediction.risk_category,
          vibration: data.sensor_data.vibration_intensity,
          rainfall: data.sensor_data.rainfall_24h,
          slope: data.sensor_data.slope_angle,
        }];
        return newData.slice(-20);
      });

      setError(null);
    } catch (err) {
      console.error('Failed to fetch live data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLiveData();

    // Set up polling interval (every 3 seconds)
    intervalRef.current = setInterval(fetchLiveData, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Chart configurations
  const riskTrendChart = {
    data: {
      labels: historicalData.map(d => d.timestamp),
      datasets: [{
        label: 'Risk Probability (%)',
        data: historicalData.map(d => d.risk),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Risk Probability Trend (Live)',
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => `${value}%`
          }
        },
        x: {
          display: false, // Hide x-axis labels for cleaner look
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    }
  };

  const riskDistributionChart = {
    data: {
      labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
      datasets: [{
        data: currentData ? [
          currentData.prediction.category_probabilities.Low || 0,
          currentData.prediction.category_probabilities.Medium || 0,
          currentData.prediction.category_probabilities.High || 0,
          currentData.prediction.category_probabilities.Critical || 0,
        ] : [25, 25, 25, 25],
        backgroundColor: [
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#dc2626',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Current Risk Distribution',
        },
        legend: {
          position: 'bottom',
        },
      },
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500 animation-delay-150"></div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Initializing Live Monitoring</h3>
          <p className="text-gray-300">Connecting to sensor network...</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/10 backdrop-blur-lg border border-red-500/30 p-8 shadow-2xl">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">⚠️</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3">Connection Error</h3>
            <p className="text-red-200 mb-4 text-lg">
              Failed to establish connection with the monitoring system.
            </p>
            <p className="text-sm text-red-300 mb-6">
              Error Details: {error}
            </p>
            <button
              onClick={fetchLiveData}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
            >
              🔄 Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentRisk = currentData?.prediction;
  const sensorData = currentData?.sensor_data;
  const systemStatus = currentData?.system_status;
  const riskStyle = formatRiskLevel(currentRisk?.risk_category);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('dashboard.title')}
            </h2>
            <p className="text-gray-300 mt-2 text-lg">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-gray-300 font-medium bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              {t('dashboard.live')} • {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-lg p-6 transform hover:scale-105 transition-all duration-300 shadow-2xl ${currentRisk?.risk_category === 'Low' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10' :
            currentRisk?.risk_category === 'Medium' ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/10' :
              currentRisk?.risk_category === 'High' ? 'bg-gradient-to-br from-orange-500/20 to-red-500/10' :
                'bg-gradient-to-br from-red-500/20 to-pink-500/10'
          }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">
              {currentRisk?.risk_category === 'Low' && '🟢'}
              {currentRisk?.risk_category === 'Medium' && '🟡'}
              {currentRisk?.risk_category === 'High' && '🟠'}
              {currentRisk?.risk_category === 'Critical' && '🔴'}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentRisk?.risk_category === 'Low' ? 'bg-green-500/30 text-green-200' :
                currentRisk?.risk_category === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
                  currentRisk?.risk_category === 'High' ? 'bg-orange-500/30 text-orange-200' :
                    'bg-red-500/30 text-red-200'
              }`}>
              {currentRisk?.risk_category || 'Unknown'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              {currentRisk?.risk_probability || 0}%
            </div>
            <div className="text-gray-300 text-sm">{t('dashboard.riskProbability')}</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-lg border border-white/20 p-6 transform hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">🎯</div>
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200">
              ML MODEL
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              {currentRisk?.confidence || 0}%
            </div>
            <div className="text-gray-300 text-sm">{t('dashboard.aiConfidence')}</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/10 backdrop-blur-lg border border-white/20 p-6 transform hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className={`text-3xl ${systemStatus?.sensors_online ? 'text-green-400' : 'text-red-400'}`}>
              {systemStatus?.sensors_online ? '📡' : '📵'}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${systemStatus?.sensors_online ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'
              }`}>
              {systemStatus?.sensors_online ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">
              {systemStatus?.sensors_online ? t('dashboard.active') : t('dashboard.inactive')}
            </div>
            <div className="text-gray-300 text-sm">{t('dashboard.sensorNetwork')}</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500 opacity-50"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 backdrop-blur-lg border border-white/20 p-6 transform hover:scale-105 transition-all duration-300 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">⚡</div>
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/30 text-pink-200">
              LIVE
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">
              {historicalData.length}
            </div>
            <div className="text-gray-300 text-sm">{t('dashboard.dataPoints')}</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 opacity-50"></div>
        </div>
      </div>

      {/* Advanced Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{t('dashboard.riskProbabilityTrend')}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">{t('dashboard.liveData')}</span>
            </div>
          </div>
          <div className="chart-container chart-large">
            <Line data={riskTrendChart.data} options={{
              ...riskTrendChart.options,
              plugins: {
                ...riskTrendChart.options.plugins,
                legend: { display: false },
                title: { display: false }
              },
              scales: {
                ...riskTrendChart.options.scales,
                y: {
                  ...riskTrendChart.options.scales.y,
                  grid: { color: 'rgba(255,255,255,0.1)' },
                  ticks: { color: '#d1d5db', callback: (value) => `${value}%` }
                },
                x: {
                  grid: { color: 'rgba(255,255,255,0.1)' },
                  ticks: { color: '#d1d5db', maxTicksLimit: 6 }
                }
              }
            }} />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{t('dashboard.riskDistribution')}</h3>
            <div className="text-sm text-gray-300">{t('dashboard.currentAnalysis')}</div>
          </div>
          <div className="chart-container chart-large">
            <Doughnut data={riskDistributionChart.data} options={{
              ...riskDistributionChart.options,
              plugins: {
                ...riskDistributionChart.options.plugins,
                title: { display: false },
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#d1d5db',
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Sensor Readings Grid */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-500/10 to-gray-500/5 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white">{t('dashboard.liveSensorNetwork')}</h3>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-medium">{t('dashboard.realTimeDataStream')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sensorData && Object.entries({
            [t('dashboard.slopeAngle')]: { value: `${sensorData.slope_angle}°`, icon: '⛰️', gradient: 'from-blue-500 to-cyan-500' },
            [t('dashboard.rockStrength')]: { value: `${sensorData.rock_strength} MPa`, icon: '🪨', gradient: 'from-purple-500 to-violet-500' },
            [t('dashboard.jointSpacing')]: { value: `${sensorData.joint_spacing}m`, icon: '📏', gradient: 'from-green-500 to-emerald-500' },
            [t('dashboard.rainfall24h')]: { value: `${sensorData.rainfall_24h}mm`, icon: '🌧️', gradient: 'from-blue-400 to-blue-600' },
            [t('dashboard.vibration')]: { value: `${sensorData.vibration_intensity} mm/s`, icon: '📳', gradient: 'from-red-500 to-pink-500' },
            [t('dashboard.windSpeed')]: { value: `${sensorData.wind_speed} m/s`, icon: '💨', gradient: 'from-teal-500 to-cyan-500' },
          }).map(([label, config]) => (
            <div key={label} className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${config.gradient}/20 backdrop-blur-sm border border-white/10 p-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
              <div className="text-center">
                <div className="text-2xl mb-2">{config.icon}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{label}</div>
                <div className="text-lg font-bold text-white">{config.value}</div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} opacity-60`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Location & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-2xl">📍</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('dashboard.monitoringLocation')}</h3>
              <p className="text-gray-300">{t('dashboard.currentSensorPosition')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{t('dashboard.zone')}</span>
              <span className="text-white font-bold">{sensorData?.location || 'Sector-North'}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{t('dashboard.sensorId')}</span>
              <span className="text-white font-mono">{sensorData?.sensor_id || 'RS_1001'}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{t('dashboard.excavationHeight')}</span>
              <span className="text-white font-bold">{sensorData?.excavation_height || 25}m</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-2xl">⚙️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('dashboard.systemStatus')}</h3>
              <p className="text-gray-300">{t('dashboard.realTimeHealthMonitoring')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{t('dashboard.alertLevel')}</span>
              <span className={`font-bold px-3 py-1 rounded-full text-xs ${systemStatus?.alert_level === 'low' ? 'bg-green-500/30 text-green-200' :
                  systemStatus?.alert_level === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                    systemStatus?.alert_level === 'high' ? 'bg-orange-500/30 text-orange-200' :
                      'bg-red-500/30 text-red-200'
                }`}>
                {systemStatus?.alert_level?.toUpperCase() || t('dashboard.unknown')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{t('dashboard.lastMaintenance')}</span>
              <span className="text-white font-bold">
                {systemStatus?.last_maintenance ? new Date(systemStatus.last_maintenance).toLocaleDateString() : t('dashboard.notAvailable')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{t('dashboard.dataQuality')}</span>
              <span className="text-green-200 font-bold">{t('dashboard.excellent')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;