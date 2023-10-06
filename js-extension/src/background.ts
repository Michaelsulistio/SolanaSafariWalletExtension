/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that makes up the extension's background page.
*/
// Send a message from the Safari Web Extension to the containing app extension.
// Listens to messages from "content"
browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  console.log("Background message received");
  console.log(request);
  if (request.type === "Word replaced") {
    browser.runtime.sendNativeMessage({ message: "Word replaced" });
  }
  if (request.type === "button-click") {
    console.log("Button click received");
    browser.runtime.sendNativeMessage(
      "application.id",
      { message: "Hello from background page" },
      function (response) {
        console.log("Received sendNativeMessage response:");
        console.log(response);
      }
    );
    console.log("Button click sent");
  }
});
