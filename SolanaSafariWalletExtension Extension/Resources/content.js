(() => {
  var __assign = Object.assign;

  // src/types/messageTypes.ts
  var WalletRequestMethod;
  (function(WalletRequestMethod2) {
    WalletRequestMethod2["SOLANA_CONNECT"] = "SOLANA_CONNECT";
    WalletRequestMethod2["SOLANA_SIGN_MESSAGE"] = "SOLANA_SIGN_MESSAGE";
    WalletRequestMethod2["SOLANA_SIGN_TRANSACTION"] = "SOLANA_SIGN_TRANSACTION";
    WalletRequestMethod2["SOLANA_SIGN_AND_SEND_TRANSACTION"] = "SOLANA_SIGN_AND_SEND_TRANSACTION";
  })(WalletRequestMethod || (WalletRequestMethod = {}));
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
    const walletRequest = event.detail;
    forwardToBackgroundScript(walletRequest);
  });
  browser.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
    console.log("Content Script Runtime Listener: ", message);
    if (message.type === "wallet-response") {
      forwardToPageScript(message);
    }
  });
  injectProvider();
})();
