import SwiftUI

struct WalletView: View {
    
    var body: some View {
        VStack(spacing: 10) {
            HStack(spacing: 0) {
                ZStack(alignment: .leading) {
                    Image("WalletLogo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 50, height: 50)
                        .clipShape(Circle())

                    Circle()
                        .frame(width: 15, height: 15)
                        .foregroundColor(Color.black)
                        .overlay(
                            Image(systemName: "chevron.down")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 8, height: 8)
                                .font(Font.title.weight(.bold))
                                .foregroundColor(.white)
                                .padding(.top, 2)
                        )
                        .offset(x: 42) 
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                
                

                HStack(alignment: .center) {
                    Text("XNH4...1Wsj")
                        .font(.system(size: 12))
                        .foregroundColor(.black)

                    Image(systemName: "doc.on.doc")
                        .font(.caption)
                        .foregroundColor(.black)
                }
                .frame(maxWidth: .infinity, alignment: .center)
                .padding(.horizontal, 10)  // Adds 10 points of horizontal padding
                .padding(.vertical, 6)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(50)
                
                
                VStack(alignment: .trailing) {
                    Image(systemName: "qrcode.viewfinder")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 24, height: 24)
                }
                .frame(maxWidth: .infinity, alignment: .trailing) // Ensure the HStack expands fully across the width
            }
            .frame(maxWidth: .infinity) // Ensure the HStack expands fully across the width
            .padding(.bottom, 12) // Some padding to give the shadow space to show
            .padding(.horizontal)
            .background(Color(.systemBackground))
            
            
            Text("Main Wallet")
                .font(.subheadline)
                .fontWeight(.bold)
                .foregroundColor(.black)

        

                        
            // Balance Section
            VStack(alignment: .center, spacing: 8) {
                Text("Balance")
                    .font(.title3)
                    .foregroundColor(.gray)
                Text("$0.00")
                    .font(.system(size: 48))
                    .fontWeight(.bold)
            }
            .padding(.horizontal)

            Spacer(minLength: 40) // Adds some space

        }
        .padding(.bottom)
        .background(Color(.systemBackground))
        .navigationBarBackButtonHidden(true)  // Hide the back button
    }
}

struct WalletView_Previews: PreviewProvider {
    static var previews: some View {
        WalletView()
    }
}
