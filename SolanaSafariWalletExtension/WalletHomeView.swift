import SwiftUI

struct WalletHomeView: View {
    @State private var walletCreated = false
    
    var body: some View {
        GeometryReader { geometry in
            VStack {
                // Header Bar
                HStack {
                    Spacer()
                    Text("Safari Web Extension Wallet")
                        .font(.title)
                        .fontWeight(.bold)
                        .multilineTextAlignment(.center)
                        .padding()
                    Spacer()
                }
                .background(Color.blue)
                .foregroundColor(.white)
                .padding(.top, geometry.safeAreaInsets.top)
                
                Spacer()
                
                if walletCreated {
                    WalletInfoView()
                } else {
                    Button(action: {
                        // Handle wallet creation action
                        print("Wallet creation button tapped!")
                        walletCreated.toggle()
                    }) {
                        Text("Create Wallet")
                            .font(.title2)
                            .fontWeight(.medium)
                            .padding(.vertical)
                            .padding(.horizontal, 40)
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }
                }
                
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.systemBackground))
            .edgesIgnoringSafeArea(.all)
        }
    }
}

struct WalletInfoView: View {
    var body: some View {
        VStack(spacing: 20) {
            // Wallet Name and Subtitle
            VStack(alignment: .center, spacing: 8) {
                Text("Wallet Name")
                    .font(.title2)
                    .fontWeight(.medium)
                Text("0x...")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            
            // Balance
            Text("Balance: 0.0")
                .font(.title)
            
            // Airdrop and Send buttons
            HStack(spacing: 20) {
                Button("Airdrop") {
                    print("Airdrop tapped!")
                }
                .padding()
                .background(Color.green)
                .foregroundColor(.white)
                .cornerRadius(8)
                
                Button("Send") {
                    print("Send tapped!")
                }
                .padding()
                .background(Color.red)
                .foregroundColor(.white)
                .cornerRadius(8)
            }
        }
    }
}

struct WalletHomeView_Previews: PreviewProvider {
    static var previews: some View {
        WalletHomeView()
    }
}
