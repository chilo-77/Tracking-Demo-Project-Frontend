import { useState } from "react";
import "./css/trackAWB.css";

function TrackAWB() {
  const [trackingNo, setTrackingNo] = useState("");
  const [awbData, setAwbData] = useState(null);

  // Button click handler
  const handleLoadAWB = () => {
    const storedAWB = JSON.parse(localStorage.getItem("awb"));
    if (storedAWB && storedAWB.trackingNo === trackingNo) {
      setAwbData(storedAWB);
    } else {
      setAwbData(null);
      alert("AWB not found in local storage!");
    }
  };

  // ✅ FINAL STEP LOGIC
  const getStepClass = (step) => {
    if (!awbData) return "";

    switch (step) {
      case "Created":
        return "step completed"; // 🟣

      case "Email":
        return "step completed"; // 🟣

      case "Documentation":
        return awbData.docVerified
          ? "step completed" // 🟣
          : "step next"; // 🟡

      case "Pickup":
        return awbData.pickupScheduled
          ? "step completed" // 🟣
          : "step";

      case "Collected":
        return awbData.pickupScheduled && !awbData.collected
          ? "step next" // 🟡 ← THIS WAS MISSING
          : awbData.collected
          ? "step completed" // 🟣 (future)
          : "step";

      default:
        return "step";
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

      {awbData && (
        <div className="awb-status-steps">
          {/* AWB Created */}
          <div className={getStepClass("Created")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>AWB Created</h4>
              <p>Shipment request has been created</p>
            </div>
          </div>

          {/* Email Sent */}
          <div className={getStepClass("Email")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Email Sent to Shipper</h4>
              <p>Shipper has been notified</p>
            </div>
          </div>

          {/* Documentation */}
          <div className={getStepClass("Documentation")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Documentation Verification</h4>
              <p>
                {awbData.docVerified
                  ? "Documentation verified"
                  : "Awaiting confirmation from shipper"}
              </p>
            </div>
          </div>

          {/* Pickup */}
          <div className={getStepClass("Pickup")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Pickup Scheduled</h4>
              <p>
                {awbData.pickupScheduled
                  ? `Pickup scheduled on ${awbData.pickupDate} from ${awbData.fromTime} to ${awbData.toTime}`
                  : "Courier pickup will be arranged"}
              </p>
            </div>
          </div>

          {/* Collected */}
          <div className={getStepClass("Collected")}>
            <span className="dot"></span>
            <div className="step-content">
              <h4>Collected</h4>
              <p>
                {awbData.collected
                  ? "Shipment has been collected"
                  : "Awaiting collection"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackAWB;
