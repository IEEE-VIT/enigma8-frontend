import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Question.styles.css";

const Question = () => {
  const [question, setQuestion] = useState("");
  const location = useLocation();
  useEffect(() => {
    const { roomNo } = location.state;
    setQuestion(`Question of Room ${roomNo} fetched from Backend`);
  }, []);
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
