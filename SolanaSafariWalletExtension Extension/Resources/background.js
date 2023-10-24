(() => {
  var __assign = Object.assign;

  // src/background.ts
  async function initializeApprovalTab() {
    return new Promise((resolve, reject) => {
      const onApproveTabReady = (_tabId, changeInfo, tab) => {
        if (tab.url === browser.runtime.getURL("approval.html") && changeInfo.status === "complete") {
          browser.tabs.onUpdated.removeListener(onApproveTabReady);
          resolve(tab);
        }
      };
      browser.tabs.onUpdated.addListener(onApproveTabReady);
      browser.tabs.create({
        url: browser.runtime.getURL("approval.html")
      }).catch((error) => {
        browser.tabs.onUpdated.removeListener(onApproveTabReady);
        reject(error);
      });
    });
  }
  async function forwardWalletRequestToApproval(request) {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const activeTab = tabs[0];
    const isApprovalUIActive = browser.runtime.getURL("approval.html") === activeTab.url;
    const targetTab = isApprovalUIActive ? activeTab : await initializeApprovalTab();
    if (targetTab.id) {
      browser.tabs.sendMessage(targetTab.id, __assign(__assign({}, request), {
        type: "approval-tab-request"
      }));
    } else {
      console.error("Approval tab is missing tab id");
    }
  }
  browser.runtime.onMessage.addListener(async (request, sender, _sendResponse) => {
    if (request.type === "wallet-approval-request") {
      forwardWalletRequestToApproval(__assign(__assign({}, request), {
        origin: sender
      }));
    }
  });
})();
