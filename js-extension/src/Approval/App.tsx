import React from "react";

export default function App() {
  const sendMessage = (approved: boolean) => {
    browser.runtime.sendMessage({
      type: "approval-result",
      approved: approved
    });
  };

  return (
    <div>
      {/* Render other parts of your component */}
      <button onClick={() => sendMessage(true)}>Approve</button>
      <button onClick={() => sendMessage(false)}>Reject</button>
    </div>
  );
}
