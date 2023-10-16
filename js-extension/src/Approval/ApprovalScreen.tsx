import React, { useEffect, useState } from "react";
import { WalletResponse, WalletRequest } from "../types/messageTypes";

const DUMMY_PUBLIC_KEY = "BtTKesmqAEaBoKBnwFKPFtJEGiJz2Q92bnAbqb6oWN2V";
const DUMMY_SECRET_KEY =
  "4z2CZjiaKXVFaPG5G3MRDCEfAKEXBVusN9ZPB8vY4fdTLi7o6gKJrUY2Gj88UgBcALVTyiXxsTxaj6SCL8dgboBP";

export default function ApprovalScreen() {
  const [requestQueue, setRequestQueue] = useState<Array<WalletRequest>>([]);
  const [randomID, setRandomID] = useState<number>(Math.random());
  const [message, setMessage] = useState<String>("Empty");

  // This effect achieves two things:
  //    1. Initializes the wallet request listener for the approval tab
  //    2. Signals to background that the approval tab is ready to receive requests
  useEffect(() => {
    function handleWalletRequest(request: WalletRequest) {
      console.log("Approval Screen Request Received: ", request);

      if (request.type === "approval-tab-request") {
        // Add the new request to the queue
        setRequestQueue((prevQueue) => [...prevQueue, request]);
        setMessage((prevMessage) => prevMessage + "\n" + request.requestId);
        console.log(request);
      }
    }

    // Begin listening for wallet requests
    browser.runtime.onMessage.addListener(handleWalletRequest);

    // Signal approval listener is ready
    browser.runtime.sendMessage("tab-ready");

    // Clean up the listener when the component is unmounted
    return () => {
      browser.runtime.onMessage.removeListener(handleWalletRequest);
    };
  }, []);

  const handleApprove = () => {
    // Get current request
    const currentRequest = requestQueue[0];

    // Ask background for keypair

    // Sign the current request payload

    // Send response

    // Remove front of queue
    //   If queue is empty, close tab and redirect to host

    const walletResponse: WalletResponse = {
      type: "wallet-response",
      method: currentRequest.method,
      approved: true,
      requestId: currentRequest.requestId
    };
    if (!currentRequest.sender?.tab?.id) {
      throw new Error("Request has no origin sender metadata");
    }
    const originTabId = currentRequest.sender.tab.id;
    browser.tabs
      .sendMessage(originTabId, walletResponse) // TODO: Only `update` and `close` tab if its the last request in queue
      .then(() => browser.tabs.update(originTabId, { active: true }))
      .then(() => window.close());
  };

  const handleReject = () => {};

  const logRequests = () => {
    console.log(requestQueue);
  };
  return (
    <div>
      <div>My Random ID: {randomID}</div>
      <div>Messages: {message}</div>
      <button onClick={logRequests}>Log Requests</button>
      <div>Request Queue Size: {requestQueue.length}</div>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}
