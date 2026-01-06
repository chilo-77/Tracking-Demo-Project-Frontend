// props/AWBDetails.jsx
import React, { useState } from "react";
import "./../css/documentReq.css";

function AWBDetails({ setShowAWB }) {
  const awbData = JSON.parse(localStorage.getItem("awb"));
  const [shipper, setShipper] = useState(awbData?.shipper || {});
  const [consignee, setConsignee] = useState(awbData?.consignee || {});
  const [packageData, setPackageData] = useState(awbData?.packageData || {});
  const [shipmentNature, setShipmentNature] = useState(
    awbData?.shipmentNature || ""
  );
  const [b2cIndividualType, setB2cIndividualType] = useState(
    awbData?.b2cIndividualType || ""
  );

  const handleShipperChange = (e) => {
    const { name, value } = e.target;
    setShipper((prev) => ({ ...prev, [name]: value }));
  };

  const handleConsigneeChange = (e) => {
    const { name, value } = e.target;
    setConsignee((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const downloadAWB = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        JSON.stringify(
          {
            awbData,
            shipper,
            consignee,
            packageData,
            shipmentNature,
            b2cIndividualType,
          },
          null,
          2
        ),
      ],
      { type: "application/json" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `AWB_${awbData.trackingNo}.json`;
    document.body.appendChild(element);
    element.click();
  };

  const saveChanges = () => {
    const updatedAWB = {
      ...awbData,
      shipper,
      consignee,
      packageData,
      shipmentNature,
      b2cIndividualType,
    };
    localStorage.setItem("awb", JSON.stringify(updatedAWB));
    alert("AWB updated successfully!");
  };

  return (
    <div className="awb-details-page">
      <h3>AWB Details - {awbData.trackingNo}</h3>

      {/* Shipper */}
      <fieldset className="awb-fieldset">
        <legend>Shipper</legend>
        <input
          type="text"
          name="shipperName"
          value={shipper.shipperName}
          onChange={handleShipperChange}
        />
        <input
          type="email"
          name="shipperEmail"
          value={shipper.shipperEmail}
          onChange={handleShipperChange}
        />
        <input
          type="tel"
          name="shipperPhone"
          value={shipper.shipperPhone}
          onChange={handleShipperChange}
        />
        <input
          type="text"
          name="shipperAddressLine1"
          value={shipper.shipperAddressLine1}
          onChange={handleShipperChange}
          placeholder="Address Line 1"
        />
        <input
          type="text"
          name="shipperAddressLine2"
          value={shipper.shipperAddressLine2}
          onChange={handleShipperChange}
          placeholder="Address Line 2"
        />
        <input
          type="text"
          name="shipperCity"
          value={shipper.shipperCity}
          onChange={handleShipperChange}
          placeholder="City"
        />
        <input
          type="text"
          name="shipperCountry"
          value={shipper.shipperCountry}
          onChange={handleShipperChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="shipperPostalCode"
          value={shipper.shipperPostalCode}
          onChange={handleShipperChange}
          placeholder="Postal Code"
        />
      </fieldset>

      {/* Consignee */}
      <fieldset className="awb-fieldset">
        <legend>Consignee</legend>
        <input
          type="text"
          name="consigneeName"
          value={consignee.consigneeName}
          onChange={handleConsigneeChange}
        />
        <input
          type="email"
          name="consigneeEmail"
          value={consignee.consigneeEmail}
          onChange={handleConsigneeChange}
        />
        <input
          type="tel"
          name="consigneePhone"
          value={consignee.consigneePhone}
          onChange={handleConsigneeChange}
        />
        <input
          type="text"
          name="consigneeAddressLine1"
          value={consignee.consigneeAddressLine1}
          onChange={handleConsigneeChange}
          placeholder="Address Line 1"
        />
        <input
          type="text"
          name="consigneeAddressLine2"
          value={consignee.consigneeAddressLine2}
          onChange={handleConsigneeChange}
          placeholder="Address Line 2"
        />
        <input
          type="text"
          name="consigneeCity"
          value={consignee.consigneeCity}
          onChange={handleConsigneeChange}
          placeholder="City"
        />
        <input
          type="text"
          name="consigneeCountry"
          value={consignee.consigneeCountry}
          onChange={handleConsigneeChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="consigneePostalCode"
          value={consignee.consigneePostalCode}
          onChange={handleConsigneeChange}
          placeholder="Postal Code"
        />
      </fieldset>

      {/* Package */}
      <fieldset className="awb-fieldset">
        <legend>Package Details</legend>
        <label>Shipment Nature</label>
        <input
          type="text"
          value={
            shipmentNature +
            (shipmentNature === "B2C" ? ` (${b2cIndividualType})` : "")
          }
          readOnly
        />
        <input
          type="number"
          name="weight"
          value={packageData.weight}
          onChange={handlePackageChange}
          placeholder="Weight (kg)"
        />
        <input
          type="number"
          name="length"
          value={packageData.length}
          onChange={handlePackageChange}
          placeholder="Length (cm)"
        />
        <input
          type="number"
          name="width"
          value={packageData.width}
          onChange={handlePackageChange}
          placeholder="Width (cm)"
        />
        <input
          type="number"
          name="height"
          value={packageData.height}
          onChange={handlePackageChange}
          placeholder="Height (cm)"
        />
        <input
          type="number"
          name="quantity"
          value={packageData.quantity}
          onChange={handlePackageChange}
          placeholder="Quantity"
        />
        <textarea
          name="description"
          value={packageData.description}
          onChange={handlePackageChange}
          placeholder="Content Description"
        />
      </fieldset>

      <div className="form-buttons">
        <button onClick={downloadAWB}>⬇️ Download AWB</button>
        <button onClick={saveChanges}>💾 Save Changes</button>
        <button onClick={() => setShowAWB(false)}>❌ Close</button>
      </div>
    </div>
  );
}

export default AWBDetails;
