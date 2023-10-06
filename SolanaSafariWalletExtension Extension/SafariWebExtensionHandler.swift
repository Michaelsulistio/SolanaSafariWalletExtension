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
                  let message = userInfo[SFExtensionMessageKey] else {
                context.completeRequest(returningItems: nil, completionHandler: nil)
                return
            }


            let response = NSExtensionItem()
            response.userInfo = [ SFExtensionMessageKey: [ "Response to": message ] ]
            context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
