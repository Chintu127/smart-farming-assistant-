import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phoneNumber: "",
    location: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { firstname, lastname, address, phoneNumber, location } = res.data;
        setForm({ firstname, lastname, address, phoneNumber, location });
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  }, [navigate, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("/api/user/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => alert("✅ Profile updated successfully!"))
      .catch((err) => {
        console.error("❌ Failed to update profile:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">👤 User Profile</h3>
      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { label: "First Name", name: "firstname" },
              { label: "Last Name", name: "lastname" },
              { label: "Address", name: "address" },
              { label: "Phone Number", name: "phoneNumber" },
              { label: "Location", name: "location" },
            ].map((field) => (
              <div className="col-md-6 mb-3" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;