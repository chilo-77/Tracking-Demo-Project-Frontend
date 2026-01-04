import React from "react";
import MainPage from "./mainPage";
import Generateawb from "./generateAWB";
import TrackAWB from "./trackAWb";
import DocumentRequirement from "./documentReq";
import SubmitDocuments from "./submitDocs";
import { useState } from "react";
import "./css/homePage.css"; // CSS file me Get Help ka style rakhenge

function HomePage() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="main-page">
      {/* Top bar with title + Get Help */}
      <div className="top-bar-home">
        <h1>Shipment Dashboard</h1>
        <button className="get-help-button">Get Help</button>
      </div>

      {/* Page content */}
      {activePage === "dashboard" && <MainPage setActivePage={setActivePage} />}
      {activePage === "track" && <TrackAWB setActivePage={setActivePage} />}
      {activePage === "docs" && (
        <DocumentRequirement setActivePage={setActivePage} />
      )}
      {activePage === "submit" && (
        <SubmitDocuments setActivePage={setActivePage} />
      )}
      {activePage === "generateawb" && (
        <Generateawb setActivePage={setActivePage} />
      )}

      {/* Back button */}
      {activePage !== "dashboard" && (
        <button
          className="back-button"
          onClick={() => setActivePage("dashboard")}
        >
          Back
        </button>
      )}
    </div>
  );
}

export default HomePage;
