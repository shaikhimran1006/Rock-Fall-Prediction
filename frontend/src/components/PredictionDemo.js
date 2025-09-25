/**
 * Prediction Demo Component
 * Interactive form for testing the rockfall prediction model
 */

import React, { useState } from 'react';
import { rockfallAPI, validateSensorData, formatRiskLevel } from '../services/api';

const PredictionDemo = () => {
  const [formData, setFormData] = useState({
    slope_angle: 45.0,
    joint_spacing: 1.0,
    joint_orientation: 120.0,
    rock_strength: 50.0,
    weathering_index: 5.0,
    rainfall_24h: 2.0,
    rainfall_7d: 15.0,
    temperature_variation: 15.0,
    freeze_thaw_cycles: 1,
    wind_speed: 5.0,
    vibration_intensity: 1.0,
    blast_distance: 200.0,
    excavation_height: 25.0,
    support_density: 0.5,
    previous_rockfall_30d: 0,
    maintenance_days_since: 10,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handlePresetLoad = (presetName) => {
    const presets = {
      low_risk: {
        slope_angle: 35.0,
        joint_spacing: 2.0,
        joint_orientation: 180.0,
        rock_strength: 70.0,
        weathering_index: 2.0,
        rainfall_24h: 0.5,
        rainfall_7d: 3.0,
        temperature_variation: 10.0,
        freeze_thaw_cycles: 0,
        wind_speed: 2.0,
        vibration_intensity: 0.5,
        blast_distance: 400.0,
        excavation_height: 15.0,
        support_density: 0.8,
        previous_rockfall_30d: 0,
        maintenance_days_since: 5,
      },
      high_risk: {
        slope_angle: 65.0,
        joint_spacing: 0.3,
        joint_orientation: 90.0,
        rock_strength: 25.0,
        weathering_index: 8.0,
        rainfall_24h: 15.0,
        rainfall_7d: 50.0,
        temperature_variation: 25.0,
        freeze_thaw_cycles: 4,
        wind_speed: 12.0,
        vibration_intensity: 4.0,
        blast_distance: 100.0,
        excavation_height: 50.0,
        support_density: 0.2,
        previous_rockfall_30d: 3,
        maintenance_days_since: 30,
      },
      medium_risk: {
        slope_angle: 50.0,
        joint_spacing: 0.8,
        joint_orientation: 135.0,
        rock_strength: 45.0,
        weathering_index: 5.0,
        rainfall_24h: 5.0,
        rainfall_7d: 20.0,
        temperature_variation: 18.0,
        freeze_thaw_cycles: 2,
        wind_speed: 7.0,
        vibration_intensity: 2.0,
        blast_distance: 250.0,
        excavation_height: 30.0,
        support_density: 0.5,
        previous_rockfall_30d: 1,
        maintenance_days_since: 15,
      }
    };

    if (presets[presetName]) {
      setFormData(presets[presetName]);
      setPrediction(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate the data
      validateSensorData(formData);

      // Make prediction
      const result = await rockfallAPI.predict(formData);
      setPrediction(result);

    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { key: 'slope_angle', label: 'Slope Angle (°)', min: 0, max: 90, step: 0.1 },
    { key: 'joint_spacing', label: 'Joint Spacing (m)', min: 0.1, max: 5, step: 0.1 },
    { key: 'joint_orientation', label: 'Joint Orientation (°)', min: 0, max: 360, step: 1 },
    { key: 'rock_strength', label: 'Rock Strength (MPa)', min: 0, max: 200, step: 0.1 },
    { key: 'weathering_index', label: 'Weathering Index (0-10)', min: 0, max: 10, step: 0.1 },
    { key: 'rainfall_24h', label: 'Rainfall 24h (mm)', min: 0, max: 100, step: 0.1 },
    { key: 'rainfall_7d', label: 'Rainfall 7d (mm)', min: 0, max: 200, step: 0.1 },
    { key: 'temperature_variation', label: 'Temperature Variation (°C)', min: 0, max: 50, step: 0.1 },
    { key: 'freeze_thaw_cycles', label: 'Freeze-Thaw Cycles', min: 0, max: 10, step: 1 },
    { key: 'wind_speed', label: 'Wind Speed (m/s)', min: 0, max: 30, step: 0.1 },
    { key: 'vibration_intensity', label: 'Vibration Intensity (mm/s)', min: 0, max: 10, step: 0.1 },
    { key: 'blast_distance', label: 'Blast Distance (m)', min: 50, max: 1000, step: 1 },
    { key: 'excavation_height', label: 'Excavation Height (m)', min: 5, max: 100, step: 0.1 },
    { key: 'support_density', label: 'Support Density (ratio)', min: 0, max: 1, step: 0.01 },
    { key: 'previous_rockfall_30d', label: 'Previous Rockfalls (30d)', min: 0, max: 20, step: 1 },
    { key: 'maintenance_days_since', label: 'Days Since Maintenance', min: 0, max: 100, step: 1 },
  ];

  const riskStyle = prediction ? formatRiskLevel(prediction.risk_category) : null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
              <span className="text-4xl">🤖</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI Prediction Engine
          </h2>
          <p className="text-gray-300 text-lg">Interactive machine learning model testing interface</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="xl:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-500/10 to-gray-500/5 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Sensor Parameters</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handlePresetLoad('low_risk')}
                  className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 rounded-lg border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 text-sm font-medium"
                >
                  🟢 Low Risk
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetLoad('medium_risk')}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 rounded-lg border border-yellow-500/30 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 text-sm font-medium"
                >
                  🟡 Medium Risk
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetLoad('high_risk')}
                  className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-200 rounded-lg border border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 text-sm font-medium"
                >
                  🔴 High Risk
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputFields.map(({ key, label, min, max, step }, index) => (
                  <div key={key} className={`space-y-2 animate-slide-in-left`} style={{ animationDelay: `${index * 50}ms` }}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-300">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id={key}
                        min={min}
                        max={max}
                        step={step}
                        value={formData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:from-violet-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🚀</span>
                      <span>Generate AI Prediction</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Prediction Results</h3>

            {error && (
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/10 backdrop-blur-lg border border-red-500/30 p-6 shadow-xl animate-scale-in">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">Prediction Error</h4>
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {prediction ? (
              <div className="space-y-6 animate-scale-in">
                {/* Main Risk Display */}
                <div className={`relative overflow-hidden rounded-xl backdrop-blur-lg border p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 ${prediction.risk_category === 'Low' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-500/30' :
                    prediction.risk_category === 'Medium' ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-500/30' :
                      prediction.risk_category === 'High' ? 'bg-gradient-to-br from-orange-500/20 to-red-500/10 border-orange-500/30' :
                        'bg-gradient-to-br from-red-500/20 to-pink-500/10 border-red-500/30'
                  }`}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {prediction.risk_category === 'Low' && '🟢'}
                      {prediction.risk_category === 'Medium' && '🟡'}
                      {prediction.risk_category === 'High' && '🟠'}
                      {prediction.risk_category === 'Critical' && '🔴'}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {prediction.risk_category}
                    </div>
                    <div className="text-lg text-gray-300">
                      {prediction.risk_probability}% Probability
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${prediction.risk_category === 'Low' ? 'from-green-500 to-emerald-500' :
                      prediction.risk_category === 'Medium' ? 'from-yellow-500 to-orange-500' :
                        prediction.risk_category === 'High' ? 'from-orange-500 to-red-500' :
                          'from-red-500 to-pink-500'
                    } opacity-60`}></div>
                </div>

                {/* Confidence Meter */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-lg border border-blue-500/30 p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-200 font-medium">AI Confidence</span>
                    <span className="text-blue-100 font-bold text-lg">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Risk Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-4">Risk Analysis Breakdown</h4>
                  {Object.entries(prediction.category_probabilities || {}).map(([category, probability], index) => (
                    <div key={category} className={`flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 animate-slide-in-right`} style={{ animationDelay: `${index * 100}ms` }}>
                      <span className="text-gray-300 text-sm">{category} Risk</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-white/20 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${category === 'Low' ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                                category === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                  category === 'High' ? 'bg-gradient-to-r from-orange-400 to-red-400' :
                                    'bg-gradient-to-r from-red-400 to-pink-400'
                              }`}
                            style={{ width: `${probability}%` }}
                          />
                        </div>
                        <span className="text-white font-medium text-sm w-10 text-right">
                          {probability}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Metadata */}
                <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 shadow-xl">
                  <h4 className="text-white font-medium mb-3">Prediction Metadata</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Generated:</span>
                      <span className="text-white">{new Date(prediction.prediction_time).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parameters:</span>
                      <span className="text-white">{Object.keys(formData).length} sensors</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model Version:</span>
                      <span className="text-white">{prediction.api_version}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 animate-pulse">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">🤖</span>
                </div>
                <p className="text-xl font-bold text-gray-400 mb-2">Awaiting Input</p>
                <p className="text-gray-500 text-sm">
                  Configure parameters and generate your first prediction
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-in-left">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">📝</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Smart Input</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Configure 16 geological and environmental parameters or use intelligent presets for instant testing scenarios
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-in-left animation-delay-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🎯</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">AI Analysis</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Advanced machine learning model processes data in real-time with 86% accuracy and confidence scoring
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500 opacity-60"></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-lg border border-white/20 p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-in-left animation-delay-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">📊</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Detailed Results</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Comprehensive risk assessment with category breakdown, probability scores, and actionable insights
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDemo;