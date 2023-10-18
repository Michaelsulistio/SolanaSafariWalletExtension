import SwiftUI

struct WalletView: View {
    var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                Text("Main Wallet")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .frame(maxWidth: .infinity, maxHeight: 60)
            .background(Color.blue)
            .shadow(radius: 10)

            Spacer(minLength: 40) // Adds some space
            
            // Balance Section
            VStack(spacing: 8) {
                Text("$0.00")
                    .font(.system(size: 48))
                    .fontWeight(.bold)
                Text("Balance")
                    .font(.title3)
                    .foregroundColor(.gray)
            }

            Spacer(minLength: 40) // Adds some space

            // Metadata - Wallet Address Card
            VStack(alignment: .leading, spacing: 15) {
                Text("Wallet Address:")
                    .font(.headline)
                Text("0x123...123")
                    .font(.body)
                    .foregroundColor(.gray)
                    .padding(.all, 10)
                    .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.blue, lineWidth: 1))
            }
            .padding()
            .background(Color(.secondarySystemBackground))
            .cornerRadius(15)
            .shadow(color: Color.black.opacity(0.2), radius: 10, x: 0, y: 10)
            
            Spacer()
        }
        .padding([.horizontal, .bottom])
        .background(Color(.systemBackground))
        .edgesIgnoringSafeArea(.all)
        .navigationBarBackButtonHidden(true)  // Hide the back button
        .navigationBarTitle("Wallet", displayMode: .inline)
    }
    
}

struct WalletView_Previews: PreviewProvider {
    static var previews: some View {
        WalletView()
    }
}

