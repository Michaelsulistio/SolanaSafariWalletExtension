import React, { useEffect, useState } from "react";
import { WalletResponse, WalletRequest } from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import { WalletAccount } from "@wallet-standard/base";
import { MyWalletWalletAccount } from "../wallet/account";

type Props = Readonly<{request: WalletRequest, onApprove: () => void}>

export default function ConnectScreen({request}: Props) {
    const handleApprove = () => {
        const dummyKeypair = getDummyKeypair();
        const account: WalletAccount = {
            address: dummyKeypair.publicKey.toBase58(),
            publicKey: dummyKeypair.publicKey.toBytes(),
            chains: [
              "solana:mainnet",
              "solana:devnet",
              "solana:testnet",
              "solana:localnet"
            ],
            features: [],
            label: "Sample Safari Extension Wallet"
          };
        
        onApprove([new MyWalletWalletAccount(account)])
    }

    <div>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={onClick}>Reject</button>
    </div>
  );
}
