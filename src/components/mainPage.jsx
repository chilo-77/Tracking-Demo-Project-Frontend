function MainPage({ setActivePage }) {
  return (
    <div className="dashboard-cards">
      <div
        className="dashboard-card"
        onClick={() => setActivePage("generateawb")}
      >
        <h3>Create a Shipment</h3>
        <p>Create new RPI entry and send demo notification</p>
      </div>

      <div className="dashboard-card" onClick={() => setActivePage("track")}>
        <h3>Track Shipment</h3>
        <p>Check your RPI details using RPI number</p>
      </div>

      <div className="dashboard-card" onClick={() => setActivePage("docs")}>
        <h3>Document Requirement</h3>
        <p>Check required documents for RPI process</p>
      </div>

      <div
        className="dashboard-card"
        onClick={() => setActivePage("verifyShipment")}
      >
        <h3>Verify Shipment</h3>
        <p>
          Confirm shipment awareness and verify details before submitting the
          documents
        </p>
      </div>
    </div>
  );
}

export default MainPage;
