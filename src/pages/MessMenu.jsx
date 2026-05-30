// src/pages/MessMenu.jsx
import React from "react";

export default function MessMenu() {
  const menu = [
    { day: "Monday", breakfast: "Poha & Tea", lunch: "Dal, Chawal, Mix Veg", snacks: "Samosa", dinner: "Paneer & Roti" },
    { day: "Tuesday", breakfast: "Idli Sambhar", lunch: "Rajma Chawal", snacks: "Biscuits", dinner: "Aloo Gobhi & Roti" },
    { day: "Wednesday", breakfast: "Paratha & Curd", lunch: "Chole Bhature", snacks: "Pakora", dinner: "Kadhai Paneer" },
    { day: "Thursday", breakfast: "Oats & Milk", lunch: "Kadi Chawal", snacks: "Sandwich", dinner: "Egg Curry / Malai Kofta" },
    { day: "Friday", breakfast: "Puri Sabzi", lunch: "Dal Makhani & Naan", snacks: "Tea & Cake", dinner: "Veg Pulao" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Campus Mess Menu</h1>
        <p>Weekly nutritional schedule for the central mess.</p>
      </div>

      <div className="table-responsive">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Snacks</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, i) => (
              <tr key={i}>
                <td style={{ fontWeight: "700" }}>{item.day}</td>
                <td>{item.breakfast}</td>
                <td>{item.lunch}</td>
                <td>{item.snacks}</td>
                <td>{item.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
