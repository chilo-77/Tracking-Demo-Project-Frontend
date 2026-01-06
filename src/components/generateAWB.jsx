import { useState } from "react";
import "./css/generateAWB.css";
import ProfilePage from "./profilePage"; // Profile page import

function Generateawb() {
  const [awbStatus, setAwbStatus] = useState("");
  const [showProfile, setShowProfile] = useState(false); // For ProfilePage rendering
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState("");

  const [shipper, setShipper] = useState({
    shipperName: "",
    shipperEmail: "",
    shipperPhone: "",
    shipperAddressLine1: "",
    shipperAddressLine2: "",
    shipperCity: "",
    shipperCountry: "",
    shipperPostalCode: "",
  });

  const [consignee, setConsignee] = useState({
    consigneeName: "",
    consigneeEmail: "",
    consigneePhone: "",
    consigneeAddressLine1: "",
    consigneeAddressLine2: "",
    consigneeCity: "",
    consigneeCountry: "",
    consigneePostalCode: "",
  });

  const [packageData, setPackageData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    quantity: "",
    description: "",
  });

  // NEW: Shipment Nature
  const [shipmentNature, setShipmentNature] = useState("");
  const [b2cIndividualType, setB2cIndividualType] = useState("");
  const [commercialType, setCommercialType] = useState("");

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

  const createAWB = async () => {
    if (!shipmentNature) {
      alert("Please select shipment nature");
      return;
    }

    const tempAwb = {
      trackingNo: "AWB123456789",

      // NEW: Shipment Nature
      shipmentNature, // B2B | B2C | Personal

      // STEP FLAGS
      created: true,
      emailSent: true,
      docVerified: false,
      pickupScheduled: false,
      collected: false,

      shipper,
      consignee,
      packageData,
    };

    localStorage.setItem("awb", JSON.stringify(tempAwb));

    setAwbStatus("emailShared");
    alert(`AWB has been generated ${tempAwb.trackingNo}`);

    // Reset
    setShipmentNature("");

    setShipper({
      shipperName: "",
      shipperEmail: "",
      shipperPhone: "",
      shipperAddressLine1: "",
      shipperAddressLine2: "",
      shipperCity: "",
      shipperCountry: "",
      shipperPostalCode: "",
    });

    setConsignee({
      consigneeName: "",
      consigneeEmail: "",
      consigneePhone: "",
      consigneeAddressLine1: "",
      consigneeAddressLine2: "",
      consigneeCity: "",
      consigneeCountry: "",
      consigneePostalCode: "",
    });

    setPackageData({
      weight: "",
      length: "",
      width: "",
      height: "",
      quantity: "",
      description: "",
    });
  };

  const scheduleAWB = () => {
    if (!shipmentNature) {
      alert("Please select shipment nature");
      return;
    }

    if (!scheduleDateTime) {
      alert("Please select date & time");
      return;
    }

    const scheduledAWB = {
      trackingNo: null, // abhi generate nahi hua
      shipmentNature,
      b2cIndividualType,
      commercialType,

      shipper,
      consignee,
      packageData,

      scheduledAt: scheduleDateTime,
      status: "Scheduled",

      created: false,
      emailSent: false,
      docVerified: false,
      pickupScheduled: false,
      collected: false,
      responseFromShipper: false,
    };

    localStorage.setItem("scheduledAWB", JSON.stringify(scheduledAWB));

    alert("AWB scheduled successfully!");
    setShowSchedule(false);
  };

  const saveProfile = () => {
    const profileData = {
      shipper,
      consignee,
    };

    localStorage.setItem("profile", JSON.stringify(profileData));
    alert("Profile has been saved successfully!");
  };

  // Conditional rendering: show ProfilePage if showProfile is true
  if (showProfile) {
    return (
      <ProfilePage
        setShowProfile={setShowProfile}
        setSelectedProfiles={(profiles) => {
          profiles.forEach((p) => {
            // Use id or future type field
            if (p.id === 2) {
              // Shipper
              setShipper({
                shipperName: p.name,
                shipperEmail: p.email,
                shipperPhone: p.phone,
                shipperAddressLine1: p.addressLine1,
                shipperAddressLine2: p.addressLine2,
                shipperCity: p.city,
                shipperCountry: p.country,
                shipperPostalCode: p.postalCode,
              });
            } else if (p.id === 1) {
              // Consignee
              setConsignee({
                consigneeName: p.name,
                consigneeEmail: p.email,
                consigneePhone: p.phone,
                consigneeAddressLine1: p.addressLine1,
                consigneeAddressLine2: p.addressLine2,
                consigneeCity: p.city,
                consigneeCountry: p.country,
                consigneePostalCode: p.postalCode,
              });
            }
          });

          setShowProfile(false); // Close ProfilePage after selection
        }}
      />
    );
  }

  return (
    <div className="generate-awb-container">
      <h1>Generate AWB</h1>

      {/* Add / View Profile Button */}
      <button className="add-profile-btn" onClick={() => setShowProfile(true)}>
        Add / View Profile
      </button>

      <form className="awb-form">
        {/* Shipper Details */}
        <fieldset className="awb-fieldset">
          <legend>Shipper Details</legend>
          <label>Name</label>
          <input
            type="text"
            name="shipperName"
            required
            value={shipper.shipperName}
            onChange={handleShipperChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="shipperEmail"
            required
            value={shipper.shipperEmail}
            onChange={handleShipperChange}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="shipperPhone"
            required
            value={shipper.shipperPhone}
            onChange={handleShipperChange}
          />

          <label>Address Line 1</label>
          <input
            type="text"
            name="shipperAddressLine1"
            required
            value={shipper.shipperAddressLine1}
            onChange={handleShipperChange}
          />

          <label>Address Line 2</label>
          <input
            type="text"
            name="shipperAddressLine2"
            value={shipper.shipperAddressLine2}
            onChange={handleShipperChange}
          />

          <div className="form-row">
            <div>
              <label>City</label>
              <input
                type="text"
                name="shipperCity"
                required
                value={shipper.shipperCity}
                onChange={handleShipperChange}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                name="shipperCountry"
                required
                value={shipper.shipperCountry}
                onChange={handleShipperChange}
              />
            </div>
            <div>
              <label>Postal Code</label>
              <input
                type="text"
                name="shipperPostalCode"
                required
                value={shipper.shipperPostalCode}
                onChange={handleShipperChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Consignee Details */}
        <fieldset className="awb-fieldset">
          <legend>Consignee Details</legend>
          <label>Name</label>
          <input
            type="text"
            name="consigneeName"
            required
            value={consignee.consigneeName}
            onChange={handleConsigneeChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="consigneeEmail"
            value={consignee.consigneeEmail}
            onChange={handleConsigneeChange}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="consigneePhone"
            required
            value={consignee.consigneePhone}
            onChange={handleConsigneeChange}
          />

          <label>Address Line 1</label>
          <input
            type="text"
            name="consigneeAddressLine1"
            required
            value={consignee.consigneeAddressLine1}
            onChange={handleConsigneeChange}
          />

          <label>Address Line 2</label>
          <input
            type="text"
            name="consigneeAddressLine2"
            value={consignee.consigneeAddressLine2}
            onChange={handleConsigneeChange}
          />

          <div className="form-row">
            <div>
              <label>City</label>
              <input
                type="text"
                name="consigneeCity"
                required
                value={consignee.consigneeCity}
                onChange={handleConsigneeChange}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                name="consigneeCountry"
                required
                value={consignee.consigneeCountry}
                onChange={handleConsigneeChange}
              />
            </div>
            <div>
              <label>Postal Code</label>
              <input
                type="text"
                name="consigneePostalCode"
                required
                value={consignee.consigneePostalCode}
                onChange={handleConsigneeChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Package Details */}
        <fieldset className="awb-fieldset">
          <legend>Package Details</legend>

          {/* Shipment Nature */}
          <label>Shipment Nature</label>
          <select
            value={shipmentNature}
            onChange={(e) => {
              setShipmentNature(e.target.value);
              setB2cIndividualType("");
              setCommercialType("");
            }}
            required
          >
            <option value="">Select</option>
            <option value="B2B">B2B (Company → Company)</option>
            <option value="B2C">B2C (Company ↔ Individual)</option>
            <option value="Personal">Personal (Non-Commercial)</option>
          </select>

          {/* B2C Expansion */}
          {shipmentNature === "B2C" && (
            <div className="b2c-individual-container">
              <label>Who is the Individual?</label>
              <select
                value={b2cIndividualType}
                onChange={(e) => setB2cIndividualType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Receiver">Receiver (Individual Customer)</option>
                <option value="Shipper">Shipper (Individual Sender)</option>
              </select>
            </div>
          )}

          {/* Commercial Type (Only if not Personal) */}
          {shipmentNature !== "Personal" && (
            <>
              <label>Shipment Purpose</label>
              <select
                value={commercialType}
                onChange={(e) => setCommercialType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Sale">Sale (Commercial Invoice)</option>
                <option value="Sample">Sample (Proforma Invoice)</option>
                <option value="NonCommercial">
                  Non-Commercial (No Sale Value)
                </option>
              </select>
            </>
          )}

          {/* Weight */}
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            step="0.01"
            required
            value={packageData.weight}
            onChange={handlePackageChange}
          />

          {/* Quantity */}
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            step="1"
            required
            value={packageData.quantity}
            onChange={handlePackageChange}
          />

          {/* Dimensions */}
          <div className="form-row">
            <div>
              <label>Length (cm)</label>
              <input
                type="number"
                name="length"
                step="0.1"
                required
                value={packageData.length}
                onChange={handlePackageChange}
              />
            </div>

            <div>
              <label>Width (cm)</label>
              <input
                type="number"
                name="width"
                step="0.1"
                required
                value={packageData.width}
                onChange={handlePackageChange}
              />
            </div>

            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                step="0.1"
                required
                value={packageData.height}
                onChange={handlePackageChange}
              />
            </div>
          </div>

          {/* Content */}
          <label>Content Description</label>
          <textarea
            name="description"
            rows="3"
            required
            value={packageData.description}
            onChange={handlePackageChange}
          />
        </fieldset>

        <div className="form-buttons">
          <button type="button" onClick={createAWB}>
            Create AWB
          </button>

          <button
            type="button"
            onClick={saveProfile}
            className="save-profile-btn"
          >
            Save Profile
          </button>

          <button
            type="button"
            onClick={() => setShowSchedule(true)}
            className="schedule-later-btn"
          >
            Schedule for Later
          </button>
        </div>
        {showSchedule && (
          <div className="schedule-box">
            <label>Schedule AWB Generation</label>

            <input
              type="datetime-local"
              value={scheduleDateTime}
              onChange={(e) => setScheduleDateTime(e.target.value)}
            />

            <div className="schedule-actions">
              <button type="button" onClick={scheduleAWB}>
                Confirm Schedule
              </button>

              <button type="button" onClick={() => setShowSchedule(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Generateawb;
