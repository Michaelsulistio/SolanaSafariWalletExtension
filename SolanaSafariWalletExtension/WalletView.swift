import SwiftUI

struct WalletView: View {
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            
            WalletTopBarView()
            
            
            Text("Main Wallet")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.black)
                .padding(.top)

        

                        
            // Balance Section
            VStack(alignment: .leading, spacing: 8) {
                Text("Current Balance")
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.secondary)
                Text("$0.00")
                    .font(.system(size: 44))
                    .fontWeight(.semibold)
            }
            .padding(.top)

            Divider()
            
            Text("Tokens").font(.subheadline).fontWeight(.semibold) .foregroundColor(.secondary).padding(.top)

            VStack(spacing: 32) {
                TokenRowView(tokenImage: "SolToken", tokenName: "Solana", tokenAmount: "0", tokenSymbol: "SOL", usdAmount: "0.00")
                
                TokenRowView(tokenImage: "USDCToken", tokenName: "USDC", tokenAmount: "0", tokenSymbol: "USDC", usdAmount: "0.00")
            }
            
            Spacer()
            
            Divider()
            
            Text("Footer bar")
        }
        .padding(.bottom)
        .padding(.horizontal)
        .background(Color(.systemBackground))
        .navigationBarBackButtonHidden(true)  // Hide the back button
    }
}

struct WalletView_Previews: PreviewProvider {
    static var previews: some View {
        WalletView()
    }
}
