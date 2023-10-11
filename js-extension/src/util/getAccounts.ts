import type { WalletAccount } from "@wallet-standard/base";
import { Keypair } from "@solana/web3.js";
import { MyWalletWalletAccount } from "../wallet/account";

export default function getAccounts(): MyWalletWalletAccount[] {
  const randomKeypair = Keypair.generate();
  const account: WalletAccount = {
    address: randomKeypair.publicKey.toBase58(),
    publicKey: randomKeypair.publicKey.toBytes(),
    chains: [
      "solana:mainnet",
      "solana:devnet",
      "solana:testnet",
      "solana:localnet"
    ],
    features: [],
    label: "Sample Safari Extension Wallet"
  };
  return [new MyWalletWalletAccount(account)];
}
