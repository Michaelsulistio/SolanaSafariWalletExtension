/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that makes up the extension's background page.
*/
// Send a message from the Safari Web Extension to the containing app extension.
// Listens to messages from "content"
browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Background request received: ", request);
  console.log("From Sender: ", sender);
  console.log(sendResponse);
  if (request.type === "approval-result") {
    // // Send the result back to the original tab
    // browser.tabs.sendMessage(originalTabId, {
    //   action: "approval-outcome",
    //   approved: message.approved
    // });
    // // Optional: Close the approval tab
    // if (sender.tab && sender.tab.id) {
    //   browser.tabs.remove(sender.tab.id);
    // }
  } else if (request.type === "approval-request") {
    // Create a new tab
    // Serve UI
    // Wait for approval-result from new tab
    // If yes, get keys and sign
    // then finally sendResponse

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        sendResponse({ type: "approval-request", approved: true });
        resolve(undefined);
      }, 2000);
    });
    await promise;
  }
});

// browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
//   console.log("Background message received");
//   console.log(request);
//   if (request.type === "Word replaced") {
//     browser.runtime.sendNativeMessage({ message: "Word replaced" });
//   }
//   if (request.type === "button-click") {
//     console.log("Button click received");
// browser.runtime.sendNativeMessage(
//   "application.id",
//   { message: "Hello from background page" },
//   function (response) {
//     console.log("Received sendNativeMessage response:");
//     console.log(response);
//   }
// );
//     console.log("Button click sent");
//   }
// });
