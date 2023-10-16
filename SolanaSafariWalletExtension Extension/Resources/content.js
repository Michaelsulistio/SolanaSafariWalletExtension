(() => {
  var __assign = Object.assign;

  // src/types/messageTypes.ts
  var WalletResponseEvent = class extends CustomEvent {
    constructor(detail) {
      super("wallet-response", {detail});
    }
  };

  // src/content.ts
  var injectProvider = () => {
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
  function forwardToBackgroundScript(request) {
    browser.runtime.sendMessage(__assign(__assign({}, request), {type: "wallet-approval-request"}));
  }
  function forwardToPageScript(response) {
    window.dispatchEvent(new WalletResponseEvent(response));
  }
  window.addEventListener("page-wallet-request", async (event) => {
    console.log("Content Script Received: ", event);
    const detail = event.detail;
    forwardToBackgroundScript(detail);
  });
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("Content Script Runtime Listener: ", message);
    if (message.type === "wallet-response") {
      forwardToPageScript(message);
    }
  });
  injectProvider();
})();
