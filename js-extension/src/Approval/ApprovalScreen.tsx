import React, { useEffect, useState } from "react";

type ApprovalRequest = {
  type: string;
  payload: string;
  method: string;
  requestId: string;
};

export default function ApprovalScreen() {
  const [requestQueue, setRequestQueue] = useState<Array<ApprovalRequest>>([]);
  const [randomID, setRandomID] = useState<number>(Math.random());
  const [message, setMessage] = useState<String>("Empty");

  useEffect(() => {
    function handleIncomingMessage(request: ApprovalRequest) {
      console.log("Approval Screen Request Received: ", request);

      if (request.type === "approval-tab-request") {
        // Add the new request to the queue
        setRequestQueue((prevQueue) => [...prevQueue, request]);
        setMessage((prevMessage) => prevMessage + "\n" + request.requestId);
        console.log(request);
      }
    }

    browser.runtime.onMessage.addListener(handleIncomingMessage);

    // Signal approval listener is ready
    browser.runtime.sendMessage("tab-ready");

    // Clean up the listener when the component is unmounted
    return () => {
      console.log("Unmount");
      browser.runtime.onMessage.removeListener(handleIncomingMessage);
    };
  }, []);

  const sendMessage = () => {
    browser.runtime.sendMessage({
      type: "from-approval",
      payload: "hello message"
    });
  };

  const sendNativeMessage = () => {
    browser.runtime.sendNativeMessage(
      "application-id",
      { message: "Word replaced" },
      function (response) {
        console.log("THIS IS THE NATIVE RESPONSE: ", response);
      }
    );
  };

  const logRequests = () => {
    console.log(requestQueue);
  };
  return (
    <div>
      {/* Render other parts of your component */}
      <div>My Random ID: {randomID}</div>
      <div>Messages: {message}</div>
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={sendNativeMessage}>Send Native Message</button>
      <button onClick={logRequests}>Log Requests</button>
      <div>Request Queue Size: {requestQueue.length}</div>
    </div>
  );
}
