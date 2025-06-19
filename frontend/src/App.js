// src/App.js
import React, { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
// No direct CSS imports here, as components handle their modules,
// and global styles are imported in index.js.

function App() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const handleNewFeedback = () => {
    setTriggerRefresh(!triggerRefresh);
  };

  return (
    // Use global classes
    <div className="app-container">
      <h1 className="app-title">Feedback Application</h1>
      <FeedbackForm onSuccess={handleNewFeedback} />
      <hr className="main-separator" /> {/* Use global separator class */}
      <FeedbackList refresh={triggerRefresh} />
    </div>
  );
}

export default App;