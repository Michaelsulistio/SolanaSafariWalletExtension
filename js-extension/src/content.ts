/**
 * This is a content script
 * It is used to inject other scripts into
 * the opened windows
 *
 * Read more about content scripts:
 * https://developer.chrome.com/docs/extensions/mv2/content_scripts/
 */

import {
  BaseWalletRequest,
  WalletRequest,
  WalletRequestEvent,
  WalletResponse,
  WalletResponseEvent
} from "./types/messageTypes";

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

function forwardToBackgroundScript(request: BaseWalletRequest) {
  // Overwrite `type` to wallet-approval-request before forwarding
  browser.runtime.sendMessage({ ...request, type: "wallet-approval-request" });
}

function forwardToPageScript(response: WalletResponse) {
  // Overwrite `type` to wallet-approval-request before forwarding
  window.dispatchEvent(new WalletResponseEvent(response));
}

window.addEventListener("page-wallet-request", async (event) => {
  console.log("Content Script Received: ", event);
  const walletRequest = (event as WalletRequestEvent).detail;
  forwardToBackgroundScript(walletRequest);
});

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("Content Script Runtime Listener: ", message);
  if (message.type === "wallet-response") {
    forwardToPageScript(message as WalletResponse);
  }
});

injectProvider();
