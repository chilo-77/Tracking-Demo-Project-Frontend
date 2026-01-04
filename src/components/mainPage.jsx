function MainPage({ setActivePage }) {
  return (
    <div className="dashboard-cards">
      <div
        className="dashboard-card"
        onClick={() => setActivePage("generateawb")}
      >
        <h3>Generate AWB</h3>
        <p>Generate new AWB and send demo email</p>
      </div>

      <div className="dashboard-card" onClick={() => setActivePage("track")}>
        <h3>Get AWB</h3>
        <p>Get your shipment details using AWB number</p>
      </div>

      <div className="dashboard-card" onClick={() => setActivePage("docs")}>
        <h3>Document Requirement</h3>
        <p>Check required documents for shipment</p>
      </div>
    </div>
  );
}

export default MainPage;
