import React, { useState } from "react";

type Props = Readonly<{
  title: string;
  content: string;
}>;

function Card({ title, content }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const baseCardStyle = {
    width: "200px",
    padding: "16px",
    border: "1px solid #e8fa91",
    borderRadius: "8px",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    transform: isHovered ? "translateY(-5px)" : "none",
    boxShadow: isHovered
      ? "0 6px 12px rgba(0, 0, 0, 0.2)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)"
  };

  const cardTitleStyle = {
    fontSize: "20px",
    marginBottom: "8px"
  };

  const cardContentStyle = {
    fontSize: "16px"
  };

  const handleButtonClick = () => {
    console.log("Hello Button Click");
    browser.runtime.sendMessage({
      type: "button-click",
      payload: "this is the payload"
    });
  };

  return (
    <div
      style={baseCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={cardTitleStyle}>{title}</h3>
      <p style={cardContentStyle}>{content}</p>
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
}

export default Card;
