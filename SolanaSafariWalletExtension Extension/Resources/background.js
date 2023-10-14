(() => {
  // src/background.ts
  async function initializeApprovalTab_noRaceCondition() {
    const getReadyTabPromise = new Promise((resolve, reject) => {
      const onApproveTabReady = (_tabId, changeInfo, tab) => {
        if (tab.url === browser.runtime.getURL("approval.html") && changeInfo.status === "complete") {
          browser.tabs.onUpdated.removeListener(onApproveTabReady);
          resolve(tab);
        }
      };
      browser.tabs.onUpdated.addListener(onApproveTabReady);
    });
    browser.tabs.create({
      url: browser.runtime.getURL("approval.html")
    });
    return getReadyTabPromise;
  }
  browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log("Background request received: ", request);
    console.log("From Sender: ", sender);
    console.log(sendResponse);
    if (request.type === "approval-result") {
    } else if (request.type === "approval-request") {
      const detail = request.detail;
      const isApprovalUIActive = await browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        const activeTab = tabs[0];
        console.log(activeTab.url);
        console.log(browser.runtime.getURL("approval.html") === activeTab.url);
        return browser.runtime.getURL("approval.html") === activeTab.url;
      });
      if (isApprovalUIActive) {
        console.log("Approval UI is Active");
      } else {
        console.log("Approval UI is not Active");
        initializeApprovalTab_noRaceCondition().then((approveTab) => {
          if (approveTab.id) {
            browser.tabs.sendMessage(approveTab.id, {
              type: "approval-tab-request",
              method: request.method,
              payload: request.payload,
              requestId: request.requestId
            });
          } else {
            console.error("Approval tab missing id");
          }
        });
      }
    }
  });
})();
