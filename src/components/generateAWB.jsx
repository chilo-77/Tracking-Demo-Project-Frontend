import { useState } from "react";
import "./css/generateAWB.css";

function Generateawb() {
  const [awbStatus, setAwbStatus] = useState("");

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

  const handleShipperChange = (e) => {
    const { name, value } = e.target;
    setShipper((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleConsigneeChange = (e) => {
    const { name, value } = e.target;
    setConsignee((prev) => ({ ...prev, [name]: value }));
  };

  const [packageData, setPackageData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    quantity: "",
    description: "",
  });

  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const createAWB = async () => {
    // const req = await fetch(
    //   `${process.env.REACT_APP_BACKEND_URL}/awb/createAWB`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify([shipper, consignee, packageData]),
    //   }
    // );

    const req = await fetch(
      `http://localhost:3000/awb/createAWB
`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([shipper, consignee, packageData]),
      }
    );

    const res = await req.json();

    localStorage.setItem("awb", JSON.stringify(res.awbGeneration));

    if (res.awbGeneration.status === "CREATED") {
      // const informParties = await fetch(
      //   `${process.env.REACT_APP_BACKEND_URL}/party/sendEmail`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(JSON.parse(localStorage.getItem("awb"))),
      //   }
      // );

      const informParties = await fetch(
        `http://localhost:3000/party/sendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(JSON.parse(localStorage.getItem("awb"))),
        }
      );

      const resParties = await informParties.json();

      if (resParties.message === "Email Sent successfully") {
        setAwbStatus("emailShared");
        alert(`AWB has been generated ${res.awbGeneration.trackingNo}`);

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
      }
    }
  };

  return (
    <div className="generate-awb-container">
      <h1>Generate AWB</h1>
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

          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            step="0.01"
            required
            value={packageData.weight}
            onChange={handlePackageChange}
          />

          <label>Quantity (kg)</label>
          <input
            type="number"
            name="quantity"
            step="0.01"
            required
            value={packageData.quantity}
            onChange={handlePackageChange}
          />

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

          <label>Content Description</label>
          <textarea
            name="description"
            rows="3"
            required
            value={packageData.description}
            onChange={handlePackageChange}
          ></textarea>
        </fieldset>

        <button type="button" onClick={createAWB}>
          Create AWB
        </button>
      </form>
    </div>
  );
}

export default Generateawb;
