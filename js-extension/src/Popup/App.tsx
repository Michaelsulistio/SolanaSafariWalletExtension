import React from "react";
import Card from "../Card/Card";

export default function App() {
  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // for full viewport height centering
    backgroundColor: "#f4f4f4" // background color for the entire viewport
  };

  const contentStyle = {
    backgroundColor: "white", // background color of the card
    padding: "20px 40px",
    borderRadius: "10px", // to make it rounded
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" // some shadow for the floating effect
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <h1>React App Popup</h1>
        <Card title="Card 1" content="Body 1" />
        <Card title="Card 2" content="Body 2" />
      </div>
    </div>
  );
}
