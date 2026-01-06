import { useState } from "react";
import "./css/verifyShipment.css";

function VerifyShipment() {
  const [awbNumber, setAwbNumber] = useState("");
  const [response, setResponse] = useState(null);
  const [awbDetails, setAwbDetails] = useState(null);

  const handleVerify = (status) => {
    setResponse(status);
  };

  const viewAwbDetails = () => {
    const storedAwb = JSON.parse(localStorage.getItem("awb"));

    if (storedAwb && storedAwb.trackingNo === awbNumber) {
      setAwbDetails(storedAwb);
    } else {
      alert("AWB details not found");
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify Shipment Awareness</h2>
      <p className="subtitle">
        Please review shipment details before confirming awareness.
      </p>

      <label>Enter AWB Number</label>
      <input
        type="text"
        placeholder="AWB / RPI Number"
        value={awbNumber}
        onChange={(e) => setAwbNumber(e.target.value)}
      />

      {awbNumber && (
        <button
          className="search-button"
          style={{ marginTop: "1rem" }}
          onClick={viewAwbDetails}
        >
          View AWB Details
        </button>
      )}

      {awbDetails && (
        <div className="awareness-box">
          <h4>Shipment Overview</h4>

          <p>
            <strong>AWB:</strong> {awbDetails.trackingNo}
          </p>
          <p>
            <strong>Shipment Nature:</strong> {awbDetails.shipmentNature}
          </p>

          <hr />

          <h5>Shipper Details</h5>
          <p>
            <strong>Name:</strong> {awbDetails.shipper.shipperName}
          </p>
          <p>
            <strong>Email:</strong> {awbDetails.shipper.shipperEmail}
          </p>
          <p>
            <strong>Phone:</strong> {awbDetails.shipper.shipperPhone}
          </p>
          <p>
            <strong>Address:</strong> {awbDetails.shipper.shipperAddressLine1},{" "}
            {awbDetails.shipper.shipperAddressLine2},{" "}
            {awbDetails.shipper.shipperCity},{" "}
            {awbDetails.shipper.shipperCountry} -{" "}
            {awbDetails.shipper.shipperPostalCode}
          </p>

          <hr />

          <h5>Consignee Details</h5>
          <p>
            <strong>Name:</strong> {awbDetails.consignee.consigneeName}
          </p>
          <p>
            <strong>Email:</strong> {awbDetails.consignee.consigneeEmail}
          </p>
          <p>
            <strong>Phone:</strong> {awbDetails.consignee.consigneePhone}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {awbDetails.consignee.consigneeAddressLine1},{" "}
            {awbDetails.consignee.consigneeAddressLine2},{" "}
            {awbDetails.consignee.consigneeCity},{" "}
            {awbDetails.consignee.consigneeCountry} -{" "}
            {awbDetails.consignee.consigneePostalCode}
          </p>

          <hr />

          <h5>Package Details</h5>
          <p>
            <strong>Description:</strong> {awbDetails.packageData.description}
          </p>
          <p>
            <strong>Weight:</strong> {awbDetails.packageData.weight} kg
          </p>
          <p>
            <strong>Dimensions:</strong> {awbDetails.packageData.length} ×{" "}
            {awbDetails.packageData.width} × {awbDetails.packageData.height} cm
          </p>
          <p>
            <strong>Quantity:</strong> {awbDetails.packageData.quantity}
          </p>

          <div className="action-buttons">
            <button className="yes-btn" onClick={() => handleVerify("aware")}>
              Yes, details are correct
            </button>

            <button className="issue-btn" onClick={() => handleVerify("issue")}>
              I have an issue
            </button>
          </div>
        </div>
      )}

      {response === "aware" && (
        <div className="success-msg">
          ✅ Shipment awareness confirmed. Status updated successfully.
        </div>
      )}

      {response === "issue" && (
        <div className="error-msg">
          ⚠ Issue raised. Consignee & support will be notified automatically.
        </div>
      )}
    </div>
  );
}

export default VerifyShipment;
