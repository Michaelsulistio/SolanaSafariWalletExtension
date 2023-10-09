import { registerWallet } from './register.js';
import { SolanaSafariWalletExtensionWallet } from './wallet.js';
import type { SolanaSafariWalletExtension } from './window.js';

export function initialize(solanaSafariWalletExtension: SolanaSafariWalletExtension): void {
    registerWallet(new SolanaSafariWalletExtensionWallet(solanaSafariWalletExtension));
}
