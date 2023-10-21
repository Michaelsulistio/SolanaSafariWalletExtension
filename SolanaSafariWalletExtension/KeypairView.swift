import SwiftUI
import CryptoKit

struct KeypairView: View {
    @State private var privateKey: Curve25519.Signing.PrivateKey?
    @State private var publicKey: Curve25519.Signing.PublicKey?

    var body: some View {
        VStack(spacing: 20) {
            Button("Generate Keypair") {
                let keypair = generateEd25519KeyPair()
                privateKey = keypair.privateKey
                publicKey = keypair.publicKey
            }
            
            Button("Log stored keypairs") {
                logKeypairFromUserDefaults();
            }
            
            if let unwrappedPrivateKey = privateKey, let unwrappedPublicKey = publicKey {
                Button("Store Keypair") {
                    storeKeyPair(privateKey: unwrappedPrivateKey, publicKey: unwrappedPublicKey)
                }
            }
            
            
            
            
            Group {
                Text("Private Key:")
                    .bold()
                
                if let privateKeyData = privateKey?.rawRepresentation {
                    Text(privateKeyData.base64EncodedString())
                        .font(.footnote)
                        .padding()
                        .background(Color.gray.opacity(0.2))
                        .cornerRadius(8)
                } else {
                    Text("Not Generated")
                }
            }
            
            Group {
                Text("Public Key:")
                    .bold()
                
                if let publicKeyData = publicKey?.rawRepresentation {
                    Text(publicKeyData.base64EncodedString())
                        .font(.footnote)
                        .padding()
                        .background(Color.gray.opacity(0.2))
                        .cornerRadius(8)
                } else {
                    Text("Not Generated")
                }
            }
            
        }
        .padding()
    }
}

struct KeypairView_Previews: PreviewProvider {
    static var previews: some View {
        KeypairView()
    }
}
