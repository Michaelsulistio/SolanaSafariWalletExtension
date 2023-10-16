/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that makes up the extension's background page.
*/
// Send a message from the Safari Web Extension to the containing app extension.
// Listens to messages from "content"

import { WalletRequest, WalletResponse } from "./types/messageTypes";

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

async function forwardWalletRequestToApproval(request: WalletRequest) {
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
          ...request,
          type: "approval-tab-request"
        });
      } else {
        console.error("Approval tab missing id");
      }
    });
  }
}

async function forwardApprovalResponseToContent(
  approvalResponse: WalletResponse
) {
  browser.runtime.sendMessage(approvalResponse);
}

browser.runtime.onMessage.addListener(
  async (request, sender: browser.runtime.MessageSender, sendResponse) => {
    console.log("Background request received: ", request);
    console.log("From Sender: ", sender);
    console.log(sendResponse);
    if (request.type === "wallet-response") {
      // forwardApprovalResponseToContent(request as WalletResponse);
    } else if (request.type === "wallet-approval-request") {
      // Attach sender identity metadata before forwarding
      forwardWalletRequestToApproval({ ...request, sender } as WalletRequest);
    }
  }
);
