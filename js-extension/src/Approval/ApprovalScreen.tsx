import React, { useEffect, useState } from "react";
import {
  BaseWalletRequest,
  WalletRequestMethod,
  ConnectRequest,
  BaseWalletResponse,
  SignMessageRequest,
  BaseWalletRequestEncoded,
  BaseWalletResponseEncoded,
  SignTransactionRequestEncoded,
  SignMessageRequestEncoded,
  SignAndSendTransactionRequestEncoded
} from "../types/messageTypes";
import ConnectScreen from "./ConnectScreen";
import SignMessageScreen from "./SignMessageScreen";
import ErrorBoundary from "./ErrorBoundary";
import SignTransactionScreen from "./SignTransactionScreen";
import SignAndSendTransactionScreen from "./SignAndSendTransactionScreen";

function getRequestScreenComponent(
  request: BaseWalletRequestEncoded,
  onApprove: (response: BaseWalletResponseEncoded) => void
) {
  switch (request.method) {
    case WalletRequestMethod.SOLANA_CONNECT:
      return (
        <ConnectScreen
          request={request as ConnectRequest}
          onApprove={onApprove}
        />
      );
    case WalletRequestMethod.SOLANA_SIGN_MESSAGE:
      return (
        <SignMessageScreen
          request={request as SignMessageRequestEncoded}
          onApprove={onApprove}
        />
      );
    case WalletRequestMethod.SOLANA_SIGN_AND_SEND_TRANSACTION:
      return (
        <SignAndSendTransactionScreen
          request={request as SignAndSendTransactionRequestEncoded}
          onApprove={onApprove}
        />
      );
    case WalletRequestMethod.SOLANA_SIGN_TRANSACTION:
      return (
        <SignTransactionScreen
          request={request as SignTransactionRequestEncoded}
          onApprove={onApprove}
        />
      );
    default:
      return <div> loading </div>;
  }
}

export default function ApprovalScreen() {
  const [requestQueue, setRequestQueue] = useState<
    Array<BaseWalletRequestEncoded>
  >([]);
  const [randomID, setRandomID] = useState<number>(Math.random());
  const [message, setMessage] = useState<String>("Empty");

  // This effect achieves two things:
  //    1. Initializes the wallet request listener for the approval tab
  //    2. Signals to background that the approval tab is ready to receive requests
  useEffect(() => {
    function handleWalletRequest(request: BaseWalletRequestEncoded) {
      console.log("Approval Screen Request Received: ", request);

      if (request.type === "approval-tab-request") {
        // Add the new request to the queue
        setRequestQueue((prevQueue) => [...prevQueue, request]);
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

  const handleApprove = (response: BaseWalletResponseEncoded) => {
    // Get current request
    const currentRequest = requestQueue[0];

    if (!response.origin?.tab?.id) {
      throw new Error("Request has no origin sender metadata");
    }
    const originTabId = response.origin.tab.id;
    browser.tabs
      .sendMessage(originTabId, response) // TODO: Only `update` and `close` tab if its the last request in queue
      .then(() => browser.tabs.update(originTabId, { active: true }));
    // .then(() => window.close());
  };

  const handleReject = () => {};

  const logRequests = () => {
    console.log(requestQueue);
  };
  console.log(requestQueue);
  return (
    <div className="p-6">
      {/* <div>My Random ID: {randomID}</div>
      <div>Messages: {message}</div>
      <button onClick={logRequests}>Log Requests</button>
      <div>Request Queue Size: {requestQueue.length}</div> */}
      {requestQueue.length > 0
        ? getRequestScreenComponent(requestQueue[0], handleApprove)
        : null}
    </div>
  );
}
