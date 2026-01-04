import React, { useState } from "react";
import "./css/submitDocuments.css";

function SubmitDocuments({ setActivePage }) {
  const [awb, setAwb] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [message, setMessage] = useState("");
  const [showTrackBtn, setShowTrackBtn] = useState(false);

  // TEMP HANDLER FOR PICKUP SCHEDULING
  const schedulePickup = async () => {
    if (!awb || !date || !fromTime || !toTime) {
      setMessage("Please fill all fields.");
      return;
    }

    // TEMP RESPONSE SIMULATING BACKEND
    const tempResponse = {
      message: "Pickup Scheduled Successfully!",
      awbInfo: {
        trackingNo: awb,
        status: "PICKUP_SCHEDULED",
        date,
        timeWindow: { from: fromTime, to: toTime },
        documentsSubmitted: true, // simulate docs submitted by shipper
      },
    };

    // Save to localStorage like real backend
    localStorage.setItem("awb", JSON.stringify(tempResponse.awbInfo));

    setMessage(tempResponse.message);
    setShowTrackBtn(true);

    // Reset form
    setAwb("");
    setDate("");
    setFromTime("");
    setToTime("");
  };

  return (
    <div className="schedule-pickup-page">
      <h2>Ready for Pickup</h2>

      <div className="pickup-form">
        <input
          type="text"
          placeholder="Enter AWB"
          value={awb}
          onChange={(e) => setAwb(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="time-window">
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
          <span>to</span>
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
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
