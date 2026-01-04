import "./../css/displayAWB.css";

function DisplayAWB({ data }) {
  return (
    <div className="awb-container">
      <div className="awb-details">
        {console.log(data)}
        <h2>AWB Details</h2>
        <p>
          <strong>Tracking No:</strong> {data.trackingNo}
        </p>
        <p>
          <strong>Service:</strong> {data.service}
        </p>
        <p>
          <strong>Status:</strong> Created
        </p>
        <p>
          <strong>Created At:</strong> 2025-12-22
        </p>
        <p>
          <strong>Updated At:</strong> 2025-12-22
        </p>
      </div>

      <div className="package-details">
        <h2>Package Details</h2>
        <p>
          <strong>Package Number:</strong> {data.packages[0].packageNumber}
        </p>
        <p>
          <strong>Weight:</strong>{" "}
          {[
            String(data.packages[0].weight.value),
            String(data.packages[0].weight.unit),
          ].join(" ")}
        </p>
        <p>
          <strong>Dimensions:</strong> 30 x 20 x 10 cm
        </p>
        <p>
          <strong>Quantity:</strong> {data.packages[0].quantity}
        </p>
        <p>
          <strong>Description:</strong> {data.packages[0].description}
        </p>
        <p>
          <strong>Declared Value:</strong>
          {[
            String(data.packages[0].declaredValue.amount),
            String(data.packages[0].declaredValue.currency),
          ].join(" ")}
        </p>
        <p>
          <strong>Status:</strong> CREATED
        </p>
      </div>

      <div className="shipper-details">
        <h2>Shipper</h2>
        <p>
          <strong>Name:</strong> {data.shipper.name}
        </p>
        <p>
          <strong>Contact:</strong> {data.shipper.contact}
        </p>
        <p>
          <strong>Email:</strong> {data.shipper.email}
        </p>
        <p>
          <strong>Address:</strong>
          {[
            String(data.shipper.address.line1),
            String(data.shipper.address.line2),
            String(data.shipper.address.country),
            String(data.shipper.address.city),
            String(data.shipper.address.postalCode),
          ].join(" ")}
        </p>
      </div>

      <div className="receiver-details">
        <h2>Receiver</h2>
        <p>
          <strong>Name:</strong> {data.receiver.name}
        </p>
        <p>
          <strong>Contact:</strong> {data.receiver.contact}
        </p>
        <p>
          <strong>Email:</strong> {data.receiver.email}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {[
            String(data.receiver.address.line1),
            String(data.receiver.address.line2),
            String(data.receiver.address.country),
            String(data.receiver.address.city),
            String(data.receiver.address.postalCode),
          ].join(" ")}
        </p>
      </div>
    </div>
  );
}

export default DisplayAWB;
