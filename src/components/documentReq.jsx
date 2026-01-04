import React, { useState } from "react";
import DisplayDoc from "./props/displayDoc";
import "./css/documentReq.css";

function DocumentRequirement({ setActivePage }) {
  const [searchType, setSearchType] = useState("awb"); // "awb" | "manual"
  const [awb, setAwb] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [docReq, setDocReq] = useState(null);

  // TEMP HANDLER FOR DOCUMENT REQUIREMENT
  const docRequest = async () => {
    // TEMP RESPONSE SIMULATION
    const tempDocuments = [
      { name: "Invoice", required: true },
      { name: "Packing List", required: true },
      { name: "Customs Form", required: true },
      { name: "Insurance", required: false },
      { name: "Other Document", required: false },
    ];

    const tempResponse = {
      awb: searchType === "awb" ? awb : null,
      origin: searchType === "manual" ? origin : "N/A",
      destination: searchType === "manual" ? destination : "N/A",
      requiredDocuments: tempDocuments,
    };

    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setDocReq(tempResponse);
  };

  return (
    <div className="document-req-page">
      <div className="top-bar">
        <h2>Check Required Documents</h2>
      </div>

      {/* Search Type Toggle */}
      <div className="toggle-container">
        <button
          className={searchType === "awb" ? "active" : ""}
          onClick={() => setSearchType("awb")}
        >
          Search with AWB
        </button>

        <button
          className={searchType === "manual" ? "active" : ""}
          onClick={() => setSearchType("manual")}
        >
          Search without AWB
        </button>
      </div>

      {/* Inputs */}
      <div className="input-container">
        {searchType === "awb" ? (
          <input
            type="text"
            placeholder="Enter AWB..."
            className="input-box"
            value={awb}
            onChange={(e) => setAwb(e.target.value)}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter Origin..."
              className="input-box"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Destination..."
              className="input-box"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </>
        )}

        <button className="search-button" onClick={docRequest}>
          🔍 Check
        </button>
      </div>

      {/* Results */}
      <div className="results">
        {docReq ? (
          <>
            <DisplayDoc data={docReq} />

            {/* NEXT STEP BUTTON */}
            <button
              className="next-button"
              onClick={() => setActivePage("submit")}
            >
              Submit Documents
            </button>
          </>
        ) : (
          <p>Search to see required documents.</p>
        )}
      </div>
    </div>
  );
}

export default DocumentRequirement;
