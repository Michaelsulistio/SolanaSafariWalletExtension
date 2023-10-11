(() => {
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
  injectProvider();
})();
