/**
 * This is a content script
 * It is used to inject other scripts into
 * the opened windows
 *
 * Read more about content scripts:
 * https://developer.chrome.com/docs/extensions/mv2/content_scripts/
 */

// document.addEventListener("DOMContentLoaded", function (event) {
//   var newElement = document.createElement("img");
//   console.log(safari);
//   newElement.src = safari.extension.baseURI + "myCat.jpg";
//   document.body.insertBefore(newElement, document.body.firstChild);
// });

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

// Script entry.
// main();

// function main() {
//   injectScript("injected.js");
// }

// // Inserts a <script> tag into the DOM.
// function injectScript(scriptName: string) {
//   try {
//     const container = document.head || document.documentElement;
//     const scriptTag = document.createElement("script");
//     scriptTag.setAttribute("async", "false");
//     console.log("Check null");
//     console.log(BrowserRuntimeExtension);
//     scriptTag.src = BrowserRuntimeExtension.getUrl(scriptName);
//     container.insertBefore(scriptTag, container.children[0]);
//     container.removeChild(scriptTag);
//   } catch (error) {
//     console.error("provider injection failed.", error);
//   }
// }

// import {
//   WalletEventsWindow,
//   WindowAppReadyEvent,
//   WindowAppReadyEventAPI
// } from "@wallet-standard/base";
// import { register, get } from "./provider";

// class ClassWithPrivate {
//   readonly #privateNumber: number;

//   constructor(num: number) {
//     this.#privateNumber = num;
//   }

//   get privateNumber() {
//     return this.#privateNumber;
//   }
// }

// function register() {
//   console.log("IN MOCK REGISTER CALL");
//   return () => {
//     console.log("IN MOCK UNREGISTER CALL");
//   };
// }

// class AppReadyEvent extends Event implements WindowAppReadyEvent {
//   readonly #detail: WindowAppReadyEventAPI;

//   get detail() {
//     return this.#detail;
//   }

//   get type() {
//     return "wallet-standard:app-ready" as const;
//   }

//   constructor(api: WindowAppReadyEventAPI) {
//     super("wallet-standard:app-ready", {
//       bubbles: false,
//       cancelable: false,
//       composed: false
//     });
//     this.#detail = api;
//   }

//   /** @deprecated */
//   preventDefault(): never {
//     throw new Error("preventDefault cannot be called");
//   }

//   /** @deprecated */
//   stopImmediatePropagation(): never {
//     throw new Error("stopImmediatePropagation cannot be called");
//   }

//   /** @deprecated */
//   stopPropagation(): never {
//     throw new Error("stopPropagation cannot be called");
//   }
// }

// function main() {
//   // console.log("starting content script23232");
//   // register();
//   // const wallet = get();
//   // console.log("MY WALLET");
//   // console.log(wallet);
//   const privateNum = new ClassWithPrivate(42);
//   console.log(privateNum);
//   console.log(privateNum.privateNumber);
//   console.log(window);
//   window.listenerFlag = true;

//   let count = 0;
//   (window as WalletEventsWindow).addEventListener(
//     "wallet-standard:app-ready",
//     (event) => {
//       count += 1;
//       console.log("in content listener");
//       console.log(event);
//       console.log(event.detail);
//       console.log("count " + count);
//       // callback(event.detail.api);
//     }
//   );

//   const api = { register };

//   const testEvent = new AppReadyEvent(api);
//   window.dispatchEvent(testEvent);
// }

// main();
