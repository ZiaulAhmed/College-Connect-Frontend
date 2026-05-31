// // src/pages/Timetable.jsx
// import React, { useState, useEffect } from "react";
// import { getCurrentUser } from "../services/authService";
// import api from "../services/api";

// export default function Timetable() {
//   const user = getCurrentUser();
//   const isFaculty = user?.role === "faculty" || user?.role === "admin";

//   const departmentsList = [
//     "Computer Science",
//     "Information Technology",
//     "Mechanical Engineering",
//     "Civil Engineering",
//     "Electrical Engineering",
//     "Electronics & Comm."
//   ];

//   const [department, setDepartment] = useState(user?.department || "Computer Science");
//   const [timetableData, setTimetableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:15 - 12:15", "12:15 - 01:15", "02:00 - 04:00"];

//   useEffect(() => {
//     fetchTimetable();
//   }, [department]);

//   const fetchTimetable = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(`/api/timetable?department=${encodeURIComponent(department)}`);
//       if (res.data && res.data.days) {
//         setTimetableData(res.data.days);
//       }
//     } catch (error) {
//       console.error("Failed to load timetable", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await api.put("/api/timetable", { days: timetableData, department });
//       alert("Timetable saved successfully!");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to save timetable", error);
//       alert("Failed to save timetable");
//     }
//   };

//   const handleChange = (dayIndex, slotIndex, value) => {
//     const newData = [...timetableData];
//     newData[dayIndex].slots[slotIndex] = value;
//     setTimetableData(newData);
//   };

//   if (loading && timetableData.length === 0) {
//     return <div className="page-container"><p>Loading timetable...</p></div>;
//   }

//   return (
//     <div className="page-container">
//       <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
//         <div>
//           <h1>Class Timetable</h1>
//           <p>Your weekly academic schedule.</p>
//         </div>
//         {isFaculty && (
//           <div>
//             {!isEditing ? (
//               <button className="btn-primary" onClick={() => setIsEditing(true)}>
//                 ✏️ Edit Timetable
//               </button>
//             ) : (
//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button className="btn-secondary" onClick={() => { setIsEditing(false); fetchTimetable(); }}>
//                   Cancel
//                 </button>
//                 <button className="btn-primary" onClick={handleSave}>
//                   💾 Save Changes
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="department-filter glass-card" style={{ marginBottom: "20px", padding: "15px 20px", borderRadius: "12px", display: "inline-flex", alignItems: "center", gap: "15px" }}>
//          <label style={{ fontWeight: "600", color: "#1e293b" }}>Department:</label>
//          <select 
//            value={department} 
//            onChange={(e) => setDepartment(e.target.value)}
//            disabled={isEditing}
//            className="dept-select"
//          >
//            {departmentsList.map(dep => (
//              <option key={dep} value={dep}>{dep}</option>
//            ))}
//          </select>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="modern-table timetable-table">
//             <thead>
//               <tr>
//                 <th>Day / Time</th>
//                 {timeSlots.map((time, i) => (
//                   <th key={i}>{time}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {timetableData.map((row, i) => (
//                 <tr key={i}>
//                   <td className="day-cell">{row.day}</td>
//                   {row.slots.map((subject, j) => (
//                     <td key={j} className="subject-cell">
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={subject}
//                           onChange={(e) => handleChange(i, j, e.target.value)}
//                           className="timetable-input"
//                         />
//                       ) : (
//                         <div className="subject-box">{subject}</div>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <style>{`
//         .timetable-table {
//           width: 100%;
//           border-collapse: separate;
//           border-spacing: 0.5rem;
//         }
//         .day-cell {
//           font-weight: bold;
//           background: rgba(255,255,255,0.05);
//           width: 150px;
//         }
//         .subject-cell {
//           padding: 10px;
//         }
//         .subject-box {
//           background: var(--primary-color, #4f46e5);
//           color: white;
//           padding: 1rem;
//           border-radius: 8px;
//           text-align: center;
//           transition: transform 0.2s;
//           cursor: default;
//         }
//         .subject-box:hover {
//           transform: scale(1.05);
//         }
//         .timetable-input {
//           width: 100%;
//           padding: 1rem;
//           border-radius: 8px;
//           border: 1px solid #4f46e5;
//           text-align: center;
//           background: #f8fafc;
//           color: #0f172a;
//           font-weight: bold;
//         }
//         .dept-select {
//           padding: 8px 16px;
//           border-radius: 8px;
//           border: 1px solid rgba(148, 163, 184, 0.4);
//           background: #ffffff;
//           font-size: 14px;
//           color: #0f172a;
//           outline: none;
//           font-weight: 500;
//         }
//         .dept-select:focus {
//           border-color: #4f46e5;
//         }
//         .dept-select:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// }




// src/pages/Timetable.jsx
import React, { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "../services/authService";
import api from "../services/api";

export default function Timetable() {
  const user = getCurrentUser();
  const isFaculty =
    user?.role === "faculty" || user?.role === "admin";

  const departmentsList = [
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Comm.",
  ];

  const [department, setDepartment] = useState(
    user?.department || "Computer Science"
  );
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:15 - 12:15",
    "12:15 - 01:15",
    "02:00 - 04:00",
  ];

  const fetchTimetable = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get(
        `/api/timetable?department=${encodeURIComponent(department)}`
      );

      if (res.data && res.data.days) {
        setTimetableData(res.data.days);
      }
    } catch (error) {
      console.error("Failed to load timetable", error);
    } finally {
      setLoading(false);
    }
  }, [department]);

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  const handleSave = async () => {
    try {
      await api.put("/api/timetable", {
        days: timetableData,
        department,
      });

      alert("Timetable saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save timetable", error);
      alert("Failed to save timetable");
    }
  };

  const handleChange = (dayIndex, slotIndex, value) => {
    const newData = [...timetableData];
    newData[dayIndex].slots[slotIndex] = value;
    setTimetableData(newData);
  };

  if (loading && timetableData.length === 0) {
    return (
      <div className="page-container">
        <p>Loading timetable...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h1>Class Timetable</h1>
          <p>Your weekly academic schedule.</p>
        </div>

        {isFaculty && (
          <div>
            {!isEditing ? (
              <button
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Timetable
              </button>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    fetchTimetable();
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn-primary"
                  onClick={handleSave}
                >
                  💾 Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className="department-filter glass-card"
        style={{
          marginBottom: "20px",
          padding: "15px 20px",
          borderRadius: "12px",
          display: "inline-flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <label
          style={{
            fontWeight: "600",
            color: "#1e293b",
          }}
        >
          Department:
        </label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={isEditing}
          className="dept-select"
        >
          {departmentsList.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="modern-table timetable-table">
            <thead>
              <tr>
                <th>Day / Time</th>
                {timeSlots.map((time, i) => (
                  <th key={i}>{time}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {timetableData.map((row, i) => (
                <tr key={i}>
                  <td className="day-cell">{row.day}</td>

                  {row.slots.map((subject, j) => (
                    <td key={j} className="subject-cell">
                      {isEditing ? (
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) =>
                            handleChange(i, j, e.target.value)
                          }
                          className="timetable-input"
                        />
                      ) : (
                        <div className="subject-box">
                          {subject}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .timetable-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0.5rem;
        }

        .day-cell {
          font-weight: bold;
          background: rgba(255,255,255,0.05);
          width: 150px;
        }

        .subject-cell {
          padding: 10px;
        }

        .subject-box {
          background: var(--primary-color, #4f46e5);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          transition: transform 0.2s;
          cursor: default;
        }

        .subject-box:hover {
          transform: scale(1.05);
        }

        .timetable-input {
          width: 100%;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #4f46e5;
          text-align: center;
          background: #f8fafc;
          color: #0f172a;
          font-weight: bold;
        }

        .dept-select {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.4);
          background: #ffffff;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          font-weight: 500;
        }

        .dept-select:focus {
          border-color: #4f46e5;
        }

        .dept-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}