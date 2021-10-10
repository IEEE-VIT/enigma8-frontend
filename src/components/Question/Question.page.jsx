import React, { useState, useEffect } from "react";
import "./Question.styles.css";

const Question = () => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const room = params.get("room");
    setQuestion(`Question of Room ${room} fetched from Backend`);
  });
  return (
    <div>
      Question
      <div className="question-container">
        <div className="question question-card">{question}</div>
        <div className="question-image question-card">Input Answer</div>
      </div>
    </div>
  );
};

export default Question;
