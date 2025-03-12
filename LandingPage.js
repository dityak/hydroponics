import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./landingStyles.css";

export default function LandingPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handlePlantSelection = (plant) => {
    navigate(`/monitor/${plant}`);
  };

  return (
    <div className="landing-container">
        
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title">Hydroponics</h1>
        <div className="nav-options">
          <a href="#home">Home</a>
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="content">
        <div className="left-section">
          <h2>Plant Varieties</h2>
          <button className="big-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Select a Plant ▼
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handlePlantSelection('lettuce')}>Lettuce</li>
              <li onClick={() => handlePlantSelection('basil')}>Basil</li>
              <li onClick={() => handlePlantSelection('strawberry')}>Strawberry</li>
            </ul>
          )}
        </div>
        
        <div className="right-section">
          <div className="hydroponics-content">
            <h2>What is Hydroponics?</h2>
            <p>
              Hydroponics is a method of growing plants without soil by using
              mineral nutrient solutions in an aqueous solvent. This technique
              allows plants to grow faster, use less water, and be cultivated in
              urban environments or areas with poor soil conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
