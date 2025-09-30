import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>React Assignments</h1>

      <div className="links">
        <Link to="/ASG-01" className="alink">Assignment 1</Link>
        <Link to="/ASG-02" className="alink">Assignment 2</Link>
        <Link to="/ASG-03" className="alink">Assignment 3</Link>
        <Link to="/ASG-04" className="alink">Assignment 4</Link>
      </div>
    </div>
  );
}

export default App;
