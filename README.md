TODO: Add Images

# Safari Web Extension Wallet for iOS

This repository showcases an example iOS wallet that utilizes a **Safari Web Extension** to enable wallet signing within the Safari browser. The wallet
implementation is similar to Chrome extension wallets, and it uses [Wallet-standard](https://github.com/solana-labs/wallet-standard/tree/master) to subscribe and respond to requests from the dApp.

## Demo

TODO: Add demo video

## Installation

1. Download [Xcode](https://developer.apple.com/xcode/)
2. Build the Extension's JS bundle: `cd js-extension && npm install && npm run build:publish`
3. Open the project in Xcode, choose your simulator/device, build and run.

## What is a Safari Web Extension?

A [Safari Web Extension](https://developer.apple.com/documentation/safariservices/safari_web_extensions) allows an iOS app to add customized functionality to
the Safari mobile browser. Similar to a Chrome browser extension, the Safari Web Extension can run background/content scripts and inject javascript into the web page.

The **key benefit** of the web extension on mobile is that it is able to securely communicate with the native iOS app and relay information to the web page.

## Diagram

TODO: Add Diagram of transaction signing
