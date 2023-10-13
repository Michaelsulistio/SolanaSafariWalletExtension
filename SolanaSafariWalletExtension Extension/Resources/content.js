(() => {
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // src/wallet/message-client.ts
  var _resolveHandler, _handleResponse, handleResponse_fn;
  var MessageClient = class {
    constructor() {
      _handleResponse.add(this);
      _resolveHandler.set(this, {});
      window.addEventListener("content-response", __privateMethod(this, _handleResponse, handleResponse_fn).bind(this));
    }
    async sendWalletRequest(request) {
      return new Promise((resolve, reject) => {
        const requestId = Math.random().toString(36);
        const walletRequest = new ContentRequestEvent({
          method: request.method,
          payload: request.payload,
          requestId
        });
        __privateGet(this, _resolveHandler)[requestId] = {resolve, reject};
        console.log("Sending request: ", requestId);
        window.dispatchEvent(walletRequest);
      });
    }
  };
  _resolveHandler = new WeakMap();
  _handleResponse = new WeakSet();
  handleResponse_fn = function(event) {
    const detail = event.detail;
    const requestId = detail == null ? void 0 : detail.requestId;
    if (requestId && __privateGet(this, _resolveHandler)[requestId]) {
      console.log("Handler for content response: ", event);
      const {resolve, reject} = __privateGet(this, _resolveHandler)[requestId];
      if (true) {
        console.log("Resolving request: ", requestId);
        resolve(true);
      }
      delete __privateGet(this, _resolveHandler)[requestId];
    }
  };
  var message_client_default = MessageClient;
  var ContentRequestEvent = class extends CustomEvent {
    constructor(detail) {
      super("page-to-content", {detail});
    }
  };
  var ContentResponseEvent = class extends CustomEvent {
    constructor(detail) {
      super("content-response", {detail});
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
  async function getResponseFromApprovalUI(event) {
    console.log("Getting response from approval tab...");
    browser.runtime.sendMessage({
      type: "approval-request"
    });
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve(true);
    }, 5e3));
  }
  async function getResponseFromBackground() {
    console.log("Getting response from background...");
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve(true);
    }, 5e3));
  }
  window.addEventListener("page-to-content", async (event) => {
    console.log("Content Script Received: ", event);
    const detail = event.detail;
    const approvalResponse = await getResponseFromApprovalUI();
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
})();
