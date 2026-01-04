import React, { useState } from "react";
import "./css/submitDocuments.css";

function SubmitDocuments({ setActivePage }) {
  const [awb, setAwb] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [message, setMessage] = useState("");
  const [showTrackBtn, setShowTrackBtn] = useState(false);

  const schedulePickup = async () => {
    const res = await fetch("http://localhost:3000/pickup/schedulePickup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        awb,
        date,
        timeWindow: {
          from: fromTime,
          to: toTime,
        },
      }),
    });

    const data = await res.json();
    setMessage(data.message);

    // frontend demo ke liye status update
    localStorage.setItem(
      "awb",
      JSON.stringify({
        trackingNo: awb,
        status: "PICKUP_SCHEDULED",
      })
    );

    setShowTrackBtn(true);
  };

  return (
    <div className="schedule-pickup-page">
      <h2>Ready for Pickup</h2>

      <div className="pickup-form">
        <input
          type="text"
          placeholder="Enter AWB"
          onChange={(e) => setAwb(e.target.value)}
        />

        <input type="date" onChange={(e) => setDate(e.target.value)} />

        <div className="time-window">
          <input type="time" onChange={(e) => setFromTime(e.target.value)} />
          <span>to</span>
          <input type="time" onChange={(e) => setToTime(e.target.value)} />
        </div>

        <button onClick={schedulePickup}>Schedule Pickup</button>

        {message && <p className="success-msg">{message}</p>}

        {showTrackBtn && (
          <button className="track-btn" onClick={() => setActivePage("track")}>
            Track Shipment
          </button>
        )}
      </div>
    </div>
  );
}

export default SubmitDocuments;
