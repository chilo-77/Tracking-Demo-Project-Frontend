import { useState } from "react";
import "./css/profilePage.css";

function ProfilePage({ setShowProfile, setSelectedProfiles }) {
  const [selected, setSelected] = useState([]);

  // Predefined profiles
  const consigneeProfiles = [
    {
      id: 1,
      name: "Aman Sherpa",
      email: "aman.sherpa@example.ae",
      phone: "+971501234567",
      addressLine1: "Al Wasl Street",
      addressLine2: "Building 5",
      city: "Dubai",
      country: "UAE",
      postalCode: "00000",
    },
  ];

  const shipperProfiles = [
    {
      id: 2,
      name: "Protyush Mukhopadhaya",
      email: "protyush.mukhopadhaya@example.in",
      phone: "+91 9876543210",
      addressLine1: "MG Road",
      addressLine2: "Block 10",
      city: "Bangalore",
      country: "India",
      postalCode: "560001",
    },
  ];

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleConfirm = () => {
    const profilesToSend = [...consigneeProfiles, ...shipperProfiles].filter(
      (p) => selected.includes(p.id)
    );

    setSelectedProfiles(profilesToSend);
    setShowProfile(false);
  };

  return (
    <div className="profile-page-container">
      <h1>Select Profile</h1>

      {/* Receiver Row */}
      <div className="row-section">
        <h2>Receiver</h2>
        <div className="cards-container">
          {consigneeProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-card ${
                selected.includes(profile.id) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(profile.id)}
            >
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Address:</strong> {profile.addressLine1},{" "}
                {profile.addressLine2}, {profile.city}, {profile.country},{" "}
                {profile.postalCode}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipper Row */}
      <div className="row-section">
        <h2>Shipper</h2>
        <div className="cards-container">
          {shipperProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-card ${
                selected.includes(profile.id) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(profile.id)}
            >
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Address:</strong> {profile.addressLine1},{" "}
                {profile.addressLine2}, {profile.city}, {profile.country},{" "}
                {profile.postalCode}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="confirm-container">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm {selected.length} Profile{selected.length > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
