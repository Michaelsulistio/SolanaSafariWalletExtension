/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that makes up the extension's background page.
*/
// Send a message from the Safari Web Extension to the containing app extension.
// Listens to messages from "content"

import { ContentRequestEvent } from "./wallet/message-client";

function forwardRequestToApprovalUI(request) {
  console.log("Forwarding request to approval UI: ", request);
  browser.runtime.sendMessage({
    type: "approval-tab-request",
    method: request.method,
    payload: request.payload,
    requestId: request.requestId
  });
}

async function initializeApprovalTab_old(initialRequest) {
  return browser.tabs
    .create({
      url: browser.runtime.getURL("approval.html")
    })
    .then((tab) => {
      const forwardHandler = (
        tabId: number,
        changeInfo: browser.tabs._OnUpdatedChangeInfo,
        tab: browser.tabs.Tab
      ) => {
        console.log("In forward handler: ", changeInfo);
        console.log(changeInfo);
        if (tabId === tab.id && changeInfo.status === "complete") {
          console.log("right before forward");
          forwardRequestToApprovalUI(initialRequest);
          browser.tabs.onUpdated.removeListener(forwardHandler);
        }
      };
      browser.tabs.onUpdated.addListener(forwardHandler);
    });
}

async function initializeApprovalTab_noRaceCondition(): Promise<browser.tabs.Tab> {
  const getReadyTabPromise = new Promise<browser.tabs.Tab>(
    (resolve, reject) => {
      const onApproveTabReady = (
        _tabId: number,
        changeInfo: browser.tabs._OnUpdatedChangeInfo,
        tab: browser.tabs.Tab
      ) => {
        if (
          tab.url === browser.runtime.getURL("approval.html") &&
          changeInfo.status === "complete"
        ) {
          browser.tabs.onUpdated.removeListener(onApproveTabReady);
          resolve(tab);
        }
      };
      browser.tabs.onUpdated.addListener(onApproveTabReady);
    }
  );

  browser.tabs.create({
    url: browser.runtime.getURL("approval.html")
  });

  return getReadyTabPromise;
}

async function initializeApprovalTab(): Promise<browser.tabs.Tab> {
  const tab = await browser.tabs.create({
    url: browser.runtime.getURL("approval.html")
  });

  return new Promise<browser.tabs.Tab>((resolve, reject) => {
    const forwardHandler = (
      tabId: number,
      changeInfo: browser.tabs._OnUpdatedChangeInfo
    ) => {
      if (tabId === tab.id && changeInfo.status === "complete") {
        browser.tabs.onUpdated.removeListener(forwardHandler);
        resolve(tab); // Resolving with the tab once it's ready
      }
    };

    // Potential race condition if listener is set, after the approval tab has already changed to "complete".
    browser.tabs.onUpdated.addListener(forwardHandler);
  });
}

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Background request received: ", request);
  console.log("From Sender: ", sender);
  console.log(sendResponse);
  if (request.type === "approval-result") {
  } else if (request.type === "approval-request") {
    const detail = (request as ContentRequestEvent).detail;

    const isApprovalUIActive = await browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        const activeTab = tabs[0];
        console.log(activeTab.url);
        console.log(browser.runtime.getURL("approval.html") === activeTab.url);
        return browser.runtime.getURL("approval.html") === activeTab.url;
      });

    if (isApprovalUIActive) {
      console.log("Approval UI is Active");
      // Forward to approval UI
    } else {
      console.log("Approval UI is not Active");
      // Initialize and forward
      initializeApprovalTab_noRaceCondition().then((approveTab) => {
        if (approveTab.id) {
          browser.tabs.sendMessage(approveTab.id, {
            type: "approval-tab-request",
            method: request.method,
            payload: request.payload,
            requestId: request.requestId
          });
        } else {
          console.error("Approval tab missing id");
        }
      });
    }
  }
});

async function getResponseFromApprovalUI_old(): Promise<boolean> {
  console.log("Getting response from approval tab...");
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true);
    }, 5000)
  );
}

// browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
//   console.log("Background message received");
//   console.log(request);
//   if (request.type === "Word replaced") {
//     browser.runtime.sendNativeMessage({ message: "Word replaced" });
//   }
//   if (request.type === "button-click") {
//     console.log("Button click received");
// browser.runtime.sendNativeMessage(
//   "application.id",
//   { message: "Hello from background page" },
//   function (response) {
//     console.log("Received sendNativeMessage response:");
//     console.log(response);
//   }
// );
//     console.log("Button click sent");
//   }
// });
