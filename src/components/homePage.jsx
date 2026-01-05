import React, { useState } from "react";
import MainPage from "./mainPage";
import Generateawb from "./generateAWB";
import TrackAWB from "./trackAWb";
import DocumentRequirement from "./documentReq";
import SubmitDocuments from "./submitDocs";
import GetHelp from "./getHelp";
import "./css/homePage.css";

function HomePage() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="main-page">
      {/* Top bar */}
      <div className="top-bar-home">
        <h1>RPI Dashboard</h1>

        {/* ✅ Get Help button now works */}
        <button
          className="get-help-button"
          onClick={() => setActivePage("gethelp")}
        >
          Get Help
        </button>
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
      {activePage === "gethelp" && <GetHelp setActivePage={setActivePage} />}

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
