// src/pages/CampusMap.jsx
import React from "react";

export default function CampusMap() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Campus Map</h1>
        <p>Your interactive guide to navigate the campus floors and blocks.</p>
      </div>

      <div className="map-card glass-card">
        <div className="map-placeholder">
          <span className="map-icon">🗺️</span>
          <h3>Interactive Map View</h3>
          <p>Navigating Block A, B, and C floors...</p>
          <div className="map-legend">
            <span>🔴 Admin Block</span>
            <span>🟢 Library & Lab</span>
            <span>🔵 Hostel & Mess</span>
          </div>
          <button className="btn-primary open-map-btn">Explore Full Screen Map</button>
        </div>
      </div>

      <style>{`
        .map-card {
          width: 100%;
          min-height: 480px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          border: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .map-placeholder {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .map-icon {
          font-size: 4rem;
        }
        .map-legend {
          display: flex;
          gap: 1.5rem;
          margin: 1.5rem 0;
          font-size: 0.9rem;
        }
        .open-map-btn {
          padding: 1.2rem;
          margin-top: 1rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
