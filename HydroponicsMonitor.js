import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Camera, History } from "lucide-react";
import { fetchData, addData, deleteData } from "./api";
import "./monitorStyles.css";
import backgroundImage from "./assets/hydrooo.jpg"; // Importing the background image

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
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const selectedPlant = plants.find((p) => p.id === plantId);

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      const data = await fetchData();
      setHistory(data);
      setLoading(false);
    }
    loadHistory();
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const saveEntry = async () => {
    if (!ec || !ph || !date || !time) return;
    
    const newEntry = { date, time, ec, ph, images, plantId };
    await addData(newEntry);
    
    setHistory([...history, newEntry]);
    setDate("");
    setTime("");
    setEc("");
    setPh("");
    setImages([]);
  };

  const deleteEntry = async (id) => {
    await deleteData(id);
    setHistory(history.filter((entry) => entry.id !== id));
  };

  return (
    <div 
      className="monitor-container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
    >
      <nav className="navbar">
        <h1 className="nav-title">Hydroponics</h1>
        <button className="history-button" onClick={() => setShowHistory(true)}>
          <History /> View History
        </button>
      </nav>

      <div className="card">
        <h2>{selectedPlant ? selectedPlant.name : "Unknown Plant"} Monitoring</h2>

        <div className="input-box">
          <div className="input-group">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Time:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <div className="input-group">
            <label>EC Value:</label>
            <input type="text" value={ec} onChange={(e) => setEc(e.target.value)} placeholder="Enter EC value" />
          </div>

          <div className="input-group">
            <label>pH Value:</label>
            <input type="text" value={ph} onChange={(e) => setPh(e.target.value)} placeholder="Enter pH value" />
          </div>

          <div className="input-group">
            <label>Upload Image:</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </div>

          <button className="capture-button" onClick={saveEntry}>Save Entry</button>
        </div>

        <div className="image-grid">
          {images.map((src, index) => (
            <img key={index} src={src} alt="Uploaded" className="image" />
          ))}
        </div>
      </div>

      {showHistory && (
        <div className="modal">
          <div className="modal-content">
            <h2>History</h2>
            {loading ? (
              <p>Loading...</p>
            ) : history.length > 0 ? (
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
                  <button className="delete-button" onClick={() => deleteEntry(entry.id)}>Delete</button>
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
