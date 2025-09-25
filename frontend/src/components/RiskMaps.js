/**
 * Risk Maps & Alerts Component
 * Mock displays of risk visualization and alert systems
 */

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RiskMaps = () => {
  const [selectedZone, setSelectedZone] = useState('Zone-A');
  const [alertHistory, setAlertHistory] = useState([]);
  const [mockRiskData, setMockRiskData] = useState({});

  useEffect(() => {
    // Initialize stable base values for consistent data
    const stableBaseValues = {
      'Zone-A': { baseRisk: 25, baseSensors: 6, baseElevation: 145 },
      'Zone-B': { baseRisk: 45, baseSensors: 4, baseElevation: 198 },
      'Zone-C': { baseRisk: 65, baseSensors: 8, baseElevation: 87 },
      'Zone-D': { baseRisk: 35, baseSensors: 5, baseElevation: 167 }
    };

    // Generate more realistic mock data for different zones
    const generateMockData = () => {
      const zones = ['Zone-A', 'Zone-B', 'Zone-C', 'Zone-D'];
      const riskData = {};

      zones.forEach(zone => {
        const base = stableBaseValues[zone];
        // Small realistic variations around base values
        const currentRisk = Math.max(5, Math.min(95,
          base.baseRisk + (Math.sin(Date.now() / 60000 + zones.indexOf(zone)) * 8) + Math.random() * 6 - 3
        ));

        // Determine category based on risk level
        let riskCategory;
        if (currentRisk < 25) riskCategory = 'Low';
        else if (currentRisk < 50) riskCategory = 'Medium';
        else if (currentRisk < 75) riskCategory = 'High';
        else riskCategory = 'Critical';

        riskData[zone] = {
          currentRisk: Math.round(currentRisk * 10) / 10, // Round to 1 decimal
          riskCategory: riskCategory,
          sensors: base.baseSensors + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0), // Occasional sensor changes
          lastAlert: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000), // Last 3 days
          elevation: base.baseElevation + Math.round((Math.random() - 0.5) * 4), // Small elevation variations
          activeAlerts: currentRisk > 60 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 1.5),
        };
      });

      setMockRiskData(riskData);
    };

    // Generate more realistic alert history
    const generateAlertHistory = () => {
      const alerts = [];
      const alertTypes = ['High Risk Warning', 'Sensor Maintenance', 'Weather Alert', 'Slope Movement'];
      const severityWeights = { 'Low': 10, 'Medium': 40, 'High': 35, 'Critical': 15 }; // Realistic distribution

      for (let i = 0; i < 12; i++) {
        // Weighted random severity selection
        const rand = Math.random() * 100;
        let severity;
        if (rand < 10) severity = 'Low';
        else if (rand < 50) severity = 'Medium';
        else if (rand < 85) severity = 'High';
        else severity = 'Critical';

        alerts.push({
          id: i + 1,
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          zone: `Zone-${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
          severity: severity,
          timestamp: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000), // Last 5 days
          message: `Automated monitoring system alert - ${severity.toLowerCase()} priority`,
          resolved: Math.random() > (severity === 'Critical' ? 0.2 : 0.4), // Critical alerts less likely resolved
        });
      }

      setAlertHistory(alerts.sort((a, b) => b.timestamp - a.timestamp));
    };

    generateMockData();
    generateAlertHistory();

    // Update data periodically with realistic intervals
    const interval = setInterval(() => {
      generateMockData();
    }, 5000); // Update every 5 seconds for smooth real-time feel

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      Low: '#10b981',
      Medium: '#f59e0b',
      High: '#ef4444',
      Critical: '#dc2626',
    };
    return colors[severity] || '#6b7280';
  };

  const zoneRiskChart = {
    data: {
      labels: Object.keys(mockRiskData),
      datasets: [
        {
          label: 'Risk Level (%)',
          data: Object.values(mockRiskData).map(zone => zone.currentRisk || 0),
          backgroundColor: Object.values(mockRiskData).map(zone => {
            const risk = zone.currentRisk || 0;
            if (risk < 25) return 'linear-gradient(135deg, #10b981, #34d399)';
            if (risk < 50) return 'linear-gradient(135deg, #f59e0b, #fbbf24)';
            if (risk < 75) return 'linear-gradient(135deg, #ef4444, #f87171)';
            return 'linear-gradient(135deg, #dc2626, #ef4444)';
          }),
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          borderRadius: 8,
          hoverBackgroundColor: Object.values(mockRiskData).map(zone => {
            const risk = zone.currentRisk || 0;
            if (risk < 25) return '#34d399';
            if (risk < 50) return '#fbbf24';
            if (risk < 75) return '#f87171';
            return '#ef4444';
          }),
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Risk Levels by Mine Zone',
          color: '#e5e7eb',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: '#f9fafb',
          bodyColor: '#d1d5db',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 1,
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#9ca3af',
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(75, 85, 99, 0.2)',
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: '#9ca3af',
            font: {
              size: 12
            },
            callback: (value) => `${value}%`
          },
          grid: {
            color: 'rgba(75, 85, 99, 0.2)',
          }
        }
      },
    }
  };

  return (
    <div className="space-y-8 slide-in">
      {/* Header */}
      <div className="text-center mb-8 fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mb-6 pulse-glow">
          <span className="text-3xl">🗺️</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
          Risk Maps & Alerts
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Advanced spatial risk visualization and intelligent alert management system
        </p>
      </div>

      {/* Zone Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(mockRiskData).map(([zone, data], index) => (
          <div
            key={zone}
            className={`glassmorphic-card p-6 cursor-pointer transition-all duration-500 hover:scale-105 float-animation ${selectedZone === zone ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
              }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedZone(zone)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-white text-lg">{zone}</h4>
              <div
                className="w-5 h-5 rounded-full pulse-glow-sm"
                style={{ backgroundColor: getSeverityColor(data.riskCategory) }}
              />
            </div>
            <div
              className="text-3xl font-bold mb-3 pulse-glow"
              style={{ color: getSeverityColor(data.riskCategory) }}
            >
              {data.currentRisk}%
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <span className="text-green-400 mr-2">●</span>
                <span className="text-sm">{data.sensors} sensors active</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="text-blue-400 mr-2">⛰️</span>
                <span className="text-sm">Elevation: {data.elevation}m</span>
              </div>
              <div className="flex items-center text-gray-300">
                <span className="text-yellow-400 mr-2">⚠️</span>
                <span className="text-sm">{data.riskCategory} Risk</span>
              </div>
            </div>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000 rounded-full"
                style={{
                  width: `${data.currentRisk}%`,
                  background: `linear-gradient(90deg, ${getSeverityColor(data.riskCategory)}, ${getSeverityColor(data.riskCategory)}80)`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution Chart */}
        <div className="glassmorphic-card p-8 slide-in-left">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">📊</span>
            Risk Distribution Analysis
          </h3>
          <div className="chart-container chart-medium">
            <Bar data={zoneRiskChart.data} options={zoneRiskChart.options} />
          </div>
        </div>

        {/* Mock Risk Heatmap */}
        <div className="glassmorphic-card p-8 slide-in-right">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">🗺️</span>
            Mine Site Risk Heatmap
          </h3>
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 h-64 flex items-center justify-center border border-gray-600 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-red-600/10 animate-pulse"></div>
              <div className="text-center relative z-10">
                <div className="text-5xl mb-4 float-animation">🗺️</div>
                <p className="text-gray-200 font-medium text-lg">Interactive Risk Heatmap</p>
                <p className="text-sm text-gray-400 mt-3 max-w-sm">
                  Real-time spatial visualization of risk zones overlaid on mine topography with DEM integration
                </p>
              </div>
            </div>

            {/* Mock zone overlays with improved styling */}
            <div className="absolute top-8 left-8">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-bold pulse-glow shadow-lg">
                C
              </div>
            </div>
            <div className="absolute top-20 right-10">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold pulse-glow shadow-lg">
                B
              </div>
            </div>
            <div className="absolute bottom-16 left-16">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-7 h-7 flex items-center justify-center text-white text-xs font-bold pulse-glow shadow-lg">
                A
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold pulse-glow shadow-lg">
                D
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 pulse-glow-sm"></div>
              <span className="text-sm text-gray-300">Low Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3 pulse-glow-sm"></div>
              <span className="text-sm text-gray-300">Medium Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3 pulse-glow-sm"></div>
              <span className="text-sm text-gray-300">High Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-3 pulse-glow-sm"></div>
              <span className="text-sm text-gray-300">Critical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Alerts */}
        <div className="glassmorphic-card p-8 slide-in-left">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="text-2xl mr-3">🚨</span>
              Active Alerts
            </h3>
            <button className="glassmorphic-button text-sm px-4 py-2 rounded-lg hover:scale-105 transition-all">
              📧 Send Test Alert
            </button>
          </div>

          <div className="space-y-4">
            {alertHistory
              .filter(alert => !alert.resolved)
              .slice(0, 5)
              .map((alert, index) => (
                <div
                  key={alert.id}
                  className="glassmorphic-item p-4 rounded-xl hover:scale-102 transition-all duration-300 fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-4 pulse-glow-sm"
                      style={{ backgroundColor: getSeverityColor(alert.severity) }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-white text-sm">{alert.type}</p>
                        <span className="text-xs text-gray-400">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">
                        <span className="text-blue-400 font-medium">{alert.zone}</span> - {alert.message}
                      </p>
                    </div>
                    <button className="ml-3 text-gray-400 hover:text-red-400 transition-colors p-1">
                      ✕
                    </button>
                  </div>
                </div>
              ))}

            {alertHistory.filter(alert => !alert.resolved).length === 0 && (
              <div className="text-center py-12 fade-in-up">
                <div className="text-5xl mb-4 float-animation">✅</div>
                <p className="text-gray-300 text-lg">No active alerts</p>
                <p className="text-gray-500 text-sm mt-2">All systems operating normally</p>
              </div>
            )}
          </div>
        </div>

        {/* Communication System Mock */}
        <div className="glassmorphic-card p-8 slide-in-right">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">📡</span>
            Alert Communication System
          </h3>

          <div className="space-y-6">
            <div className="glassmorphic-item p-6 rounded-xl hover:scale-102 transition-all duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 pulse-glow">📱</span>
                <div>
                  <p className="font-bold text-white text-lg">SMS Alerts</p>
                  <p className="text-sm text-gray-300">Emergency notifications to field personnel</p>
                </div>
              </div>
              <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg">
                <p className="text-blue-400 font-semibold text-sm mb-2">Sample SMS:</p>
                <div className="text-gray-200 text-sm space-y-1">
                  <p>🚨 <span className="text-red-400 font-bold">HIGH RISK ALERT</span> - Zone-B</p>
                  <p>Risk: <span className="text-orange-400">78%</span> | Time: <span className="text-blue-400">14:32</span></p>
                  <p className="text-yellow-300">Recommend immediate evacuation</p>
                </div>
              </div>
            </div>

            <div className="glassmorphic-item p-6 rounded-xl hover:scale-102 transition-all duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 pulse-glow">📧</span>
                <div>
                  <p className="font-bold text-white text-lg">Email Reports</p>
                  <p className="text-sm text-gray-300">Detailed reports to management</p>
                </div>
              </div>
              <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg">
                <p className="text-green-400 font-semibold text-sm mb-2">Sample Email Subject:</p>
                <div className="text-gray-200 text-sm space-y-1">
                  <p>Daily Risk Assessment Report - <span className="text-blue-400">OpenPit Mine Alpha</span></p>
                  <p><span className="text-green-400">3 zones monitored</span> | <span className="text-yellow-400">2 alerts resolved</span></p>
                </div>
              </div>
            </div>

            <div className="glassmorphic-item p-6 rounded-xl hover:scale-102 transition-all duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 pulse-glow">🔊</span>
                <div>
                  <p className="font-bold text-white text-lg">Site Alarms</p>
                  <p className="text-sm text-gray-300">Audio/visual warnings for immediate evacuation</p>
                </div>
              </div>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex items-center">
                  <span className="text-red-400 mr-2">●</span>
                  <span>Siren activation for Critical alerts</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">●</span>
                  <span>LED warning lights by risk level</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">●</span>
                  <span>PA system announcements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert History */}
      <div className="glassmorphic-card p-8 fade-in-up">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="text-2xl mr-3">📋</span>
          Alert History
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-4 px-6 font-semibold text-gray-200">Time</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-200">Zone</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-200">Alert Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-200">Severity</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {alertHistory.slice(0, 10).map((alert, index) => (
                <tr
                  key={alert.id}
                  className="border-b border-gray-700 hover:bg-white/5 transition-all duration-300 fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-6 text-sm text-gray-300">
                    {alert.timestamp.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-blue-400">
                    {alert.zone}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-200">
                    {alert.type}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white pulse-glow-sm"
                      style={{ backgroundColor: getSeverityColor(alert.severity) }}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${alert.resolved
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                      {alert.resolved ? '✅ Resolved' : '⚠️ Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Production Integration Note */}
      <div className="glassmorphic-card p-8 border border-blue-500/30 fade-in-up">
        <div className="flex items-start">
          <div className="text-blue-400 mr-4 text-3xl pulse-glow">ℹ️</div>
          <div>
            <h4 className="font-bold text-blue-300 mb-4 text-xl">Production Integration</h4>
            <p className="text-gray-200 text-base mb-6">
              In a production system, this section would integrate with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-gray-300 text-sm space-y-3">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">🗺️</span>
                  <div>
                    <strong className="text-white">GIS Systems:</strong>
                    <span className="text-gray-300 block">Real mine topography and DEM data</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">🛰️</span>
                  <div>
                    <strong className="text-white">Drone Imagery:</strong>
                    <span className="text-gray-300 block">Aerial surveillance and change detection</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-3">📡</span>
                  <div>
                    <strong className="text-white">IoT Sensors:</strong>
                    <span className="text-gray-300 block">Real-time environmental monitoring</span>
                  </div>
                </li>
              </ul>
              <ul className="text-gray-300 text-sm space-y-3">
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">🌤️</span>
                  <div>
                    <strong className="text-white">Weather APIs:</strong>
                    <span className="text-gray-300 block">Live weather data integration</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-red-400 mr-3">📱</span>
                  <div>
                    <strong className="text-white">SMS/Email Services:</strong>
                    <span className="text-gray-300 block">Automated alert delivery systems</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-orange-400 mr-3">🔊</span>
                  <div>
                    <strong className="text-white">Site Communication:</strong>
                    <span className="text-gray-300 block">PA and alarm systems integration</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMaps;