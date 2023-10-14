(() => {
  var __assign = Object.assign;

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
    browser.runtime.sendMessage(__assign({type: "approval-request"}, request));
  }
  window.addEventListener("page-to-content", async (event) => {
    console.log("Content Script Received: ", event);
    const detail = event.detail;
    forwardToBackgroundScript(detail);
  });
  injectProvider();
})();
