import CryptoKit
import Foundation

func generateEd25519KeyPair() -> (privateKey: Curve25519.Signing.PrivateKey, publicKey: Curve25519.Signing.PublicKey) {
    let privateKey = Curve25519.Signing.PrivateKey()
    let publicKey = privateKey.publicKey
    
    return (privateKey, publicKey)
}


func storeKeyPair(privateKey: Curve25519.Signing.PrivateKey, publicKey: Curve25519.Signing.PublicKey) {
    let base64PublicKey = publicKey.rawRepresentation.base64EncodedString()
    let base64PrivateKey = privateKey.rawRepresentation.base64EncodedString()

    let keysDictionary: [String: String] = [
        "publicKey": base64PublicKey,
        "privateKey": base64PrivateKey
    ]

    do {
        let jsonData = try JSONSerialization.data(withJSONObject: keysDictionary, options: .prettyPrinted)
        if let jsonString = String(data: jsonData, encoding: .utf8) {
            UserDefaults.standard.set(jsonString, forKey: "keyPair")
        }
    } catch {
        print("Error serializing JSON: \(error)")
    }
}

func logKeypairFromUserDefaults() {
    let defaults = UserDefaults.standard

    // Attempt to get the stored JSON string and convert it to Data
    if let jsonString = defaults.string(forKey: "keyPair"),
       let jsonData = jsonString.data(using: .utf8) {

        do {
            // Try to deserialize the JSON data
            if let deserialized = try JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: String],
               let savedPublicString = deserialized["publicKey"],
               let savedPrivateString = deserialized["privateKey"] {

                // Log the base64 encoded representations
                print("Public Key (Base64): \(savedPublicString)")
                print("Private Key (Base64): \(savedPrivateString)")
            } else {
                print("Public Key: null")
                print("Private Key: null")
            }
        } catch {
            print("Error deserializing JSON: \(error)")
        }
    } else {
        print("Public Key: null")
        print("Private Key: null")
    }
}


