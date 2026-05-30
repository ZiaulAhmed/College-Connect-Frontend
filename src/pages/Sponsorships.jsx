// src/pages/Sponsorships.jsx
import React, { useState } from "react";

export default function Sponsorships() {
  const [redeemed, setRedeemed] = useState([]);

  const brands = [
    { id: 1, name: "TechGiant Corp", offer: "30% Student Discount", tag: "Tech" },
    { id: 2, name: "Coffee Central", offer: "Buy 1 Get 1 Free", tag: "Food" },
    { id: 3, name: "BookStore Plus", offer: "Free Textbook Delivery", tag: "EDU" },
    { id: 4, name: "Cloud Services", offer: "Free Developer Credits", tag: "Cloud" },
  ];

  const handleRedeem = (id) => {
    if (redeemed.includes(id)) return;
    setRedeemed([...redeemed, id]);
    alert("Offer code sent to your college email!");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Sponsorships / Brands</h1>
        <p>Exclusive deals and collaborations for our university students.</p>
      </div>

      <div className="brands-grid">
        {brands.map((b, i) => (
          <div key={i} className="brand-card glass-card">
            <div className="brand-tag">{b.tag}</div>
            <h3>{b.name}</h3>
            <p><strong>Offer:</strong> {b.offer}</p>
            <button 
              className={`btn-primary redeem-btn ${redeemed.includes(b.id) ? "btn-disabled" : ""}`}
              onClick={() => handleRedeem(b.id)}
            >
              {redeemed.includes(b.id) ? "Redeemed ✔" : "Redeem Offer"}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .brands-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .brand-card { padding: 2.5rem; background: rgba(255, 255, 255, 0.05); text-align: center; position: relative; border: 1px solid rgba(255, 255, 255, 0.1); }
        .brand-card h3 { margin: 1rem 0 0.5rem; }
        .brand-card p { font-size: 0.9rem; opacity: 0.8; margin-bottom: 1.5rem; }
        .brand-tag { position: absolute; top: 1rem; right: 1rem; color: #4f46e5; border: 1px solid #4f46e5; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
        .redeem-btn { width: 100%; border-radius: 8px; }
        .btn-disabled { background: #94a3b8 !important; cursor: not-allowed; box-shadow: none !important; transform: none !important; }
      `}</style>
    </div>
  );
}
