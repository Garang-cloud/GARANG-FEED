// src/components/FeedbackForm.js
import React, { useState } from "react";
import axios from "axios";
import styles from "./FeedbackForm.module.css"; // Import the CSS Module

function FeedbackForm({ onSuccess }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      return setError("All fields are required.");
    }

    try {
      setLoading(true);
      // Ensure API_URL is correctly defined or hardcoded if needed
      // const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
      await axios.post("http://localhost:5000/api/feedbacks", formData); // Use the correct full URL
      setSuccess("Feedback submitted successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form on success
      if (onSuccess) {
        onSuccess(); // Trigger refresh in parent (App.js)
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Error submitting feedback: ${err.response.data.error}`);
      } else {
        setError("Error submitting feedback. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Submit Feedback</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        type="email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
      {/* Use global classes for messages */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
}

export default FeedbackForm;