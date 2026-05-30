// src/pages/Leaderboard.jsx
import React from "react";

export default function Leaderboard() {
  const ranks = [
    { rank: 1, name: "Ziaul Ahmed", pts: "2500", achievement: "Top Contributor" },
    { rank: 2, name: "Jane Doe", pts: "2350", achievement: "Pro Member" },
    { rank: 3, name: "Bob Smith", pts: "2100", achievement: "Helpful Hand" },
    { rank: 4, name: "Alice Johnson", pts: "1980", achievement: "Active Participant" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Leaderboard</h1>
        <p>Top participants based on points earned from helpful activities.</p>
      </div>

      <div className="leaderboard-card glass-card">
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Participant</th>
                <th>Points</th>
                <th>Achievement Badge</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((r, i) => (
                <tr key={i} className={r.rank <= 3 ? "top-rank" : ""}>
                  <td>{r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : r.rank}</td>
                  <td>{r.name}</td>
                  <td style={{ fontWeight: 700 }}>{r.pts}</td>
                  <td><span className="badge-chip">{r.achievement}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .leaderboard-card { padding: 3rem; background: rgba(255, 255, 255, 0.05); }
        .top-rank { background: rgba(99, 102, 241, 0.08); font-weight: 600; }
        .badge-chip { background: #6366f1; color: white; padding: 0.3rem 0.8rem; border-radius: 99px; font-size: 0.75rem; text-transform: uppercase; font-weight: bold; }
      `}</style>
    </div>
  );
}
