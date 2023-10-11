/**
 * This is a content script
 * It is used to inject other scripts into
 * the opened windows
 *
 * Read more about content scripts:
 * https://developer.chrome.com/docs/extensions/mv2/content_scripts/
 */

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

injectProvider();
