import React, { useState } from "react";
import "./css/getHelp.css";

function GetHelp({ setActivePage }) {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [awb, setAwb] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const issues = [
    "📦 AWB generation issue",
    "📄 Documentation related query",
    "🚚 Pickup / Collection issue",
    "📍 Tracking not updating",
  ];

  const handleSubmit = () => {
    if (!selectedIssue || !awb || !description) {
      alert("Please select issue type and fill all details");
      return;
    }

    // Demo submit (no backend)
    setSubmitted(true);
  };

  return (
    <div className="get-help-container">
      <h2>Get Help</h2>

      {!submitted ? (
        <>
          <p>Select the issue you are facing:</p>

          {/* Issue Options */}
          <div className="issue-options">
            {issues.map((issue) => (
              <div
                key={issue}
                className={`issue-card ${
                  selectedIssue === issue ? "active" : ""
                }`}
                onClick={() => setSelectedIssue(issue)}
              >
                {issue}
              </div>
            ))}
          </div>

          {/* Form appears after selecting issue */}
          {selectedIssue && (
            <div className="help-form">
              <label>AWB Number</label>
              <input
                type="text"
                placeholder="Enter AWB number"
                value={awb}
                onChange={(e) => setAwb(e.target.value)}
              />

              <label>Issue Description</label>
              <textarea
                rows="4"
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <button onClick={handleSubmit}>Submit Request</button>
            </div>
          )}
        </>
      ) : (
        /* Success Message */
        <div className="success-message">
          <h3>✅ Request Received</h3>
          <p>
            We have received your request regarding <b>{selectedIssue}</b>.
          </p>
          <p>Our team will get back to you shortly.</p>

          <button onClick={() => setActivePage("dashboard")}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default GetHelp;
