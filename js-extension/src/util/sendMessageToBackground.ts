export default function sendMessageToBackground(type: string, message: string) {
  // @ts-ignore
  browser.runtime.sendNativeMessage(
    "application.id",
    { type, message },
    function (response: any) {
      console.log("Received sendNativeMessage response:");
      console.log(response);
    }
  );
}
