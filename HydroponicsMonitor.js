// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import React, { useState } from "react";
// import { Camera } from "lucide-react";
// import "./monitorStyles.css";

// const plants = [
//   { id: "lettuce", name: "Lettuce" },
//   { id: "basil", name: "Basil" },
//   { id: "strawberry", name: "Strawberry" }
// ];

// export default function HydroponicsMonitor() {
//   const { plantId } = useParams();
//   const [ec, setEc] = useState("");
//   const [ph, setPh] = useState("");
//   const [images, setImages] = useState([]);

//   const selectedPlant = plants.find(p => p.id === plantId);

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newImages = files.map((file) => URL.createObjectURL(file));
//     setImages([...images, ...newImages]);
//   };

//   return (
//     <div className="monitor-container">
//       <nav className="navbar">
//         <h1 className="nav-title">Hydroponics</h1>
//       </nav>

//       <div className="card">
//         <h2>{selectedPlant ? selectedPlant.name : "Unknown Plant"} Monitoring</h2>

//         <div className="input-box">
//           <div className="input-group">
//             <label>EC Value:</label>
//             <input
//               type="text"
//               value={ec}
//               onChange={(e) => setEc(e.target.value)}
//               placeholder="Enter EC value"
//             />
//           </div>

//           <div className="input-group">
//             <label>pH Value:</label>
//             <input
//               type="text"
//               value={ph}
//               onChange={(e) => setPh(e.target.value)}
//               placeholder="Enter pH value"
//             />
//           </div>

//           <div className="input-group">
//             <label>Upload Image:</label>
//             <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
//           </div>
//         </div>

//         <div className="image-grid">
//           {images.map((src, index) => (
//             <img key={index} src={src} alt="Uploaded" className="image" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Camera, History } from "lucide-react";
import "./monitorStyles.css";

const plants = [
  { id: "lettuce", name: "Lettuce" },
  { id: "basil", name: "Basil" },
  { id: "strawberry", name: "Strawberry" }
];

export default function HydroponicsMonitor() {
  const { plantId } = useParams();
  const [ec, setEc] = useState("");
  const [ph, setPh] = useState("");
  const [images, setImages] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Date and time state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const selectedPlant = plants.find(p => p.id === plantId);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const saveEntry = () => {
    if (!ec || !ph || !date || !time) return;
    setHistory([...history, { date, time, ec, ph, images }]);
    setDate("");
    setTime("");
    setEc("");
    setPh("");
    setImages([]);
  };

  return (
    <div className="monitor-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title">Hydroponics</h1>
        <button className="history-button" onClick={() => setShowHistory(true)}>
          <History /> View History
        </button>
      </nav>

      {/* Main Card */}
      <div className="card">
        <h2>{selectedPlant ? selectedPlant.name : "Unknown Plant"} Monitoring</h2>

        <div className="input-box">
          <div className="input-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>EC Value:</label>
            <input
              type="text"
              value={ec}
              onChange={(e) => setEc(e.target.value)}
              placeholder="Enter EC value"
            />
          </div>

          <div className="input-group">
            <label>pH Value:</label>
            <input
              type="text"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              placeholder="Enter pH value"
            />
          </div>

          <div className="input-group">
            <label>Upload Image:</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </div>

          <button className="capture-button" onClick={saveEntry}>
            <Camera className="icon" /> Save Entry
          </button>
        </div>

        <div className="image-grid">
          {images.map((src, index) => (
            <img key={index} src={src} alt="Uploaded" className="image" />
          ))}
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="modal">
          <div className="modal-content">
            <h2>History</h2>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <div key={index} className="history-entry">
                  <p><strong>Date:</strong> {entry.date}</p>
                  <p><strong>Time:</strong> {entry.time}</p>
                  <p><strong>EC:</strong> {entry.ec}</p>
                  <p><strong>pH:</strong> {entry.ph}</p>
                  <div className="history-images">
                    {entry.images.map((src, imgIndex) => (
                      <img key={imgIndex} src={src} alt="History" className="history-image" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No history recorded yet.</p>
            )}
            <button className="close-button" onClick={() => setShowHistory(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
