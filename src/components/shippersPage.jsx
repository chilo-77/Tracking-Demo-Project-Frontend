import { useState, useEffect } from "react";
import "./css/shipperPage.css";

function ShipperPage() {
  const [awbData, setAwbData] = useState(null);

  // Link click se localStorage ya API se data load
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("awb"));
    if (data) {
      setAwbData(data);
    }
  }, []);

  const handleApprove = () => {
    const updatedData = { ...awbData, status: "DOCUMENTATION_APPROVED" };
    setAwbData(updatedData);
    localStorage.setItem("awb", JSON.stringify(updatedData));
    alert("Documents Approved ✅");
  };

  const handleReject = () => {
    const updatedData = { ...awbData, status: "DOCUMENTATION_REJECTED" };
    setAwbData(updatedData);
    localStorage.setItem("awb", JSON.stringify(updatedData));
    alert("Documents Rejected ❌");
  };

  if (!awbData) return <p>Loading AWB data...</p>;

  return (
    <div className="shipper-container">
      <h2>AWB Verification for Shipper</h2>
      <div className="awb-info">
        <p>
          <strong>Tracking No:</strong> {awbData.trackingNo}
        </p>
        <p>
          <strong>Consignee:</strong> {awbData.consigneeName}
        </p>
        <p>
          <strong>Status:</strong> {awbData.status}
        </p>
      </div>

      {awbData.status === "EMAIL_SENT" && (
        <div className="docs-verification">
          <h3>Documents Verification</h3>
          <button onClick={handleApprove}>Approve ✅</button>
          <button onClick={handleReject}>Reject ❌</button>
        </div>
      )}

      {(awbData.status === "DOCUMENTATION_APPROVED" ||
        awbData.status === "DOCUMENTATION_REJECTED") && (
        <p>Verification Completed: {awbData.status}</p>
      )}
    </div>
  );
}

export default ShipperPage;
