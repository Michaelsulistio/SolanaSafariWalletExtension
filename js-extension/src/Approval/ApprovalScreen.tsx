import React from "react";

export default function ApprovalScreen() {
  return (
    <div className="flex flex-col bg-green-300">
      <div className="p-12 bg-red-400">Hello</div>
      <button onClick={() => console.log(true)}>Approve</button>
      <button onClick={() => console.log(false)}>Reject</button>
    </div>
  );
}
