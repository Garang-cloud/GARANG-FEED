// src/components/FeedbackList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FeedbackList.module.css"; // Import the CSS Module

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function FeedbackList({ refresh }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        const res = await axios.get(`${API_URL}/feedbacks`);
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Failed to load feedback:", err);
        setError("Failed to load feedback. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }
    setDeleting(id);
    try {
      await axios.delete(`${API_URL}/feedbacks/${id}`);
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Failed to delete feedback:", err);
      alert("Failed to delete feedback. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <p className={styles.loadingMessage}>Loading feedbacks...</p>;
  // Use global error-message class
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className={styles.listContainer}>
      <h2>Feedback List</h2>
      {feedbacks.length === 0 ? (
        <p className={styles.noFeedback}>No feedbacks yet. Submit one above!</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb._id} className={styles.feedbackItem}>
            <div className={styles.feedbackHeader}>
              <strong>{fb.name}</strong>
              <span>{fb.email}</span>
            </div>
            <p className={styles.feedbackMessage}>{fb.message}</p>
            <div className={styles.feedbackMeta}>
              <small>{new Date(fb.createdAt).toLocaleString()}</small>
              <button
                onClick={() => handleDelete(fb._id)}
                disabled={deleting === fb._id}
                className={styles.deleteButton}
              >
                {deleting === fb._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackList;