import { useState } from "react";
import "./css/trackAWB.css";

function TrackAWB() {
  const [trackingNo, setTrackingNo] = useState("");
  const [awbData, setAwbData] = useState(null);

  // Function to get CSS class for each step
  const getStepClass = (step) => {
    if (!awbData) return "";
    const statusOrder = [
      "CREATED",
      "EMAIL_SENT",
      "DOCUMENTATION_PENDING",
      "PICKUP_SCHEDULED",
      "COLLECTED",
    ];

    let currentStatus = awbData.status;

    // Demo logic: agar pickup scheduled hai, turant collected dikhao
    if (currentStatus === "PICKUP_SCHEDULED") {
      currentStatus = "COLLECTED";
    }

    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(step);

    if (stepIndex < currentIndex) return "step completed";
    if (stepIndex === currentIndex) return "step active";
    return "step";
  };

  // 🔍 Button click handler
  const handleLoadAWB = () => {
    const data = JSON.parse(localStorage.getItem("awb"));
    if (data && data.trackingNo === trackingNo) {
      setAwbData(data);
    } else {
      setAwbData(null); // agar match na ho
      alert("AWB not found in local storage!");
    }
  };

  return (
    <div className="awb-status-container">
      <h2 className="awb-title">Shipment Status</h2>

      <div className="awb-tracking-box">
        <span className="label">Tracking Number</span>
        <input
          type="text"
          placeholder="Enter AWB..."
          value={trackingNo}
          onChange={(e) => setTrackingNo(e.target.value)}
        />
        <button onClick={handleLoadAWB}>🔍</button>
      </div>

      {awbData ? (
        <div className="awb-status-steps">
          <div className={getStepClass("CREATED")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>AWB Created</h4>
              <p>Shipment request has been created</p>
            </div>
          </div>

          <div className={getStepClass("EMAIL_SENT")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Email Sent to Shipper</h4>
              <p>Shipper has been notified</p>
            </div>
          </div>

          <div className={getStepClass("DOCUMENTATION_PENDING")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Documentation Verification Pending</h4>
              <p>Awaiting confirmation from shipper</p>
            </div>
          </div>

          <div className={getStepClass("PICKUP_SCHEDULED")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Pickup Scheduled</h4>
              <p>Courier pickup will be arranged</p>
            </div>
          </div>

          <div className={getStepClass("COLLECTED")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Collected</h4>
              <p>Shipment has been collected</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Search for your AWB to see shipment details.</p>
      )}
    </div>
  );
}

export default TrackAWB;
