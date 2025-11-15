import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../styling/Profiel.css";

function Profiel() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Load profile on page load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get("/auth/profile");
                console.log("Profile loaded:", response.data);

                setName(response.data.name || "");
                setEmail(response.data.email || "");
            } catch (error) {
                console.error("Failed to load profile:", error);
                setMessage("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle update profile
    const handleSave = async () => {
        setMessage("");

        try {
            const body = {
                name,
                email,
                password: password || "" // empty means no change
            };

            const response = await apiClient.put("/auth/profile", body);

            setMessage("Profile updated successfully!");
            setPassword(""); // clear password field

            console.log("Update response:", response.data);
        } catch (error: any) {
            console.error("Update failed:", error);
            setMessage(
                error.response?.data?.message || "Failed to update profile."
            );
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">Mijn Profiel</h1>

            <div className="profile-card">
                <h2 className="profile-header">Profile settings</h2>
                <p className="profile-subtext">
                    Update your personal information or change your password.
                </p>

                {/* Feedback message */}
                {message && <p className="profile-message">{message}</p>}

                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </div>

                <div className="input-group">
                    <label>E-mailadres</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <button className="save-btn" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default Profiel;

