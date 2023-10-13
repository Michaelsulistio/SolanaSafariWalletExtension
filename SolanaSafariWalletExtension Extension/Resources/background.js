(() => {
  // src/background.ts
  browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log("Background request received: ", request);
    console.log("From Sender: ", sender);
    console.log(sendResponse);
    if (request.type === "approval-result") {
    } else if (request.type === "approval-request") {
      browser.tabs.create({
        url: browser.runtime.getURL("approval.html")
      }).then((tab) => {
        console.log("Tab fullfillment: ", tab);
      });
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          sendResponse({type: "approval-request", approved: true});
          resolve(void 0);
        }, 2e3);
      });
      await promise;
    }
  });
})();
