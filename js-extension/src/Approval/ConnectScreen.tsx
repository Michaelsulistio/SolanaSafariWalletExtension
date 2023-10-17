import React, { useEffect, useState } from "react";
import { ConnectRequest, ConnectResponse } from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import { WalletAccount } from "@wallet-standard/base";
import { MyWalletWalletAccount } from "../wallet/account";

type Props = Readonly<{
  request: ConnectRequest;
  onApprove: (response: ConnectResponse) => void;
}>;

function uint8ArrayToNumberArray(typedArray: Uint8Array): number[] {
  return Array.from(typedArray);
}

export default function ConnectScreen({ request, onApprove }: Props) {
  const handleConnect = (request: ConnectRequest) => {
    const dummyKeypair = getDummyKeypair();
    const account: WalletAccount = {
      address: dummyKeypair.publicKey.toBase58(),
      publicKey: dummyKeypair.publicKey.toBase58(),
      chains: [
        "solana:mainnet",
        "solana:devnet",
        "solana:testnet",
        "solana:localnet"
      ],
      features: [],
      label: "Sample Safari Extension Wallet"
    };

    console.log("Connected account: ", account);

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      origin: request.origin!,
      output: {
        accounts: [account]
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleConnect(request)}>Connect</button>
      <button onClick={() => {}}>Reject</button>
    </div>
  );
}
