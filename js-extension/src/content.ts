/**
 * This is a content script
 * It is used to inject other scripts into
 * the opened windows
 *
 * Read more about content scripts:
 * https://developer.chrome.com/docs/extensions/mv2/content_scripts/
 */

import {
  ContentRequestEvent,
  ContentResponseEvent,
  WalletResponse
} from "./wallet/message-client";

export const injectProvider = () => {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("async", "false");
    var request = new XMLHttpRequest();
    request.open("GET", browser.runtime.getURL("injected.js"), false);
    request.send();
    scriptTag.textContent = request.responseText;
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (error) {
    console.error("Wallet provider injection failed.", error);
  }
};

async function getResponseFromApprovalUI(): Promise<boolean> {
  console.log("Getting response from approval tab...");
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true);
    }, 5000)
  );
}

async function getResponseFromBackground(): Promise<boolean> {
  console.log("Getting response from background...");
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true);
    }, 5000)
  );
}

window.addEventListener("page-to-content", async (event) => {
  console.log("Content Script Received: ", event);
  const detail = (event as ContentRequestEvent).detail;

  // do a bunch of tab stuff
  const approvalResponse = await getResponseFromApprovalUI();

  // get "keypair" from background
  const backgroundResponse = await getResponseFromBackground();

  if (approvalResponse && backgroundResponse) {
    const responseEvent = new ContentResponseEvent({
      approved: approvalResponse,
      requestId: detail.requestId
    });
    window.dispatchEvent(responseEvent);
  }
});

injectProvider();
