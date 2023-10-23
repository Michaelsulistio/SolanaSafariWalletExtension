import SwiftUI
import CryptoKit
import Base58Swift

struct KeypairView: View {
    @State private var keypair: Keypair?;

    var body: some View {
        VStack(spacing: 20) {
            Button("Generate Keypair") {
                keypair = generateEd25519KeyPair()
            }
            
            Button("Get Keypair") {
                keypair = fetchStoredKeypair() ?? keypair
            }
            
            Button("Log stored keypairs") {
                logKeypairFromUserDefaults();
            }
            
            if let keypair {
                Button("Store Keypair") {
                    storeKeyPair(keypair)
                }
            }
            
            
            Group {
                Text("Public Key:")
                    .bold()
                
                if let keypair {
                    Text(keypair.publicKeyToBase58String())
                        .font(.footnote)
                        .padding()
                        .background(Color.gray.opacity(0.2))
                        .cornerRadius(8)
                } else {
                    Text("Not Generated")
                }
            }

            Group {
                Text("Private Key:")
                    .bold()
                
                if let keypair {
                    Text(keypair.privateKeyToBase58String())
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
