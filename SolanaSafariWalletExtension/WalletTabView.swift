import SwiftUI

struct WalletTabView: View {
    @State private var selectedTab: Int = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            WalletHomeView()
                .tabItem {
                    WalletTabItemView(iconName: "Wallet", buttonTitle: "Wallet", isSelected: selectedTab == 0)
                }
                .tag(0)
                .background(Color.blue)
            
            Text("Search View")
                .tabItem {
                    WalletTabItemView(iconName: "Activity", buttonTitle: "Activity", isSelected: selectedTab == 1)
                }
                .tag(1)

            Text("Profile View")
                .tabItem {
                    WalletTabItemView(iconName: "NFTs", buttonTitle: "NFTs", isSelected: selectedTab == 2)
                }
                .tag(2)

            Text("Settings View")
                .tabItem {
                    WalletTabItemView(iconName: "Settings", buttonTitle: "Settings", isSelected: selectedTab == 3)
                }
                .tag(3)

        }
        .navigationBarBackButtonHidden(true)
    }
}
