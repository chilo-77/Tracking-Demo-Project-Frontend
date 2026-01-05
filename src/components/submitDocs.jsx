import { useState } from "react";
import "./css/submitDocuments.css";

function SubmitDocuments() {
  const [awb, setAwb] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleSchedulePickup = () => {
    if (!awb || !pickupDate || !fromTime || !toTime) {
      alert("Please fill AWB number and pickup time!");
      return;
    }

    const storedAWB = JSON.parse(localStorage.getItem("awb"));

    if (!storedAWB || storedAWB.trackingNo !== awb) {
      alert("AWB not found!");
      return;
    }

    const updatedAWB = {
      ...storedAWB,
      docVerified: true,
      pickupScheduled: true,
      collected: false,
      pickupDate,
      fromTime,
      toTime,
    };

    localStorage.setItem("awb", JSON.stringify(updatedAWB));
    alert("Pickup Scheduled successfully!");
  };

  return (
    <div className="schedule-pickup-page">
      <h2>Submit Documents / Schedule Pickup</h2>

      <div className="pickup-form">
        <label>AWB Number</label>
        <input
          type="text"
          value={awb}
          placeholder="Enter AWB..."
          onChange={(e) => setAwb(e.target.value)}
        />

        <label>Pickup Date</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />

        <label>Pickup Time Window</label>
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

        <button onClick={handleSchedulePickup}>Schedule Pickup</button>
      </div>
    </div>
  );
}

export default SubmitDocuments;
