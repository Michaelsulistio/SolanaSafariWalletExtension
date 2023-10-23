//
//  SafariWebExtensionHandler.swift
//  SolanaSafariWalletExtension Extension
//
//  Created by Mike Sulistio on 10/3/23.
//

import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    
    private let logger = OSLog(subsystem: "solanamobile.SolanaSafariWalletExtension", category: "ExtensionHandler")

    func beginRequest(with context: NSExtensionContext) {
        os_log("in beginRequest", log: logger, type: .default)

        guard let item = context.inputItems.first as? NSExtensionItem,
              let userInfo = item.userInfo as? [String: Any],
              let message = userInfo[SFExtensionMessageKey] as? String else {
            onError(context: context, errorMessage: "Invalid message format received by Extension handler")
            return
        }
        
        if message == "fetch-keypair" {
            onSuccess(context: context, value: [
                "keypair": [
                    "publicKey": "123",
                    "privateKey": "456"
                ]
            ])
        } else {
            onError(context: context, errorMessage: "Invalid message type received by Extension handler")
        }
}
    
    // Success handler
    func onSuccess(context: NSExtensionContext, value: [String: Any]) {
        let response = NSExtensionItem()
        response.userInfo = [
            SFExtensionMessageKey: [
                "status": "success",
                "value": value
            ]
        ]
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

    // Error handler
    func onError(context: NSExtensionContext, errorMessage: String) {
        let response = NSExtensionItem()
        response.userInfo = [
            SFExtensionMessageKey: [
                "status": "error",
                "message": errorMessage
            ]
        ]
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

    
    
}
