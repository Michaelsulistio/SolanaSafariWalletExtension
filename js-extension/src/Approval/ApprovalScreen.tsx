import React from "react";

export default function ApprovalScreen() {
  return (
    <div>
      {/* Render other parts of your component */}
      <button onClick={() => console.log(true)}>Approve</button>
      <button onClick={() => console.log(false)}>Reject</button>
    </div>
  );
}
