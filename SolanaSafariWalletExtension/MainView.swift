//
//  MainView.swift
//  SolanaSafariWalletExtension
//
//  Created by Mike Sulistio on 10/18/23.
//

import SwiftUI

struct MainView
: View {
    var body: some View {
        NavigationView {
            OnboardingView()
        }
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
