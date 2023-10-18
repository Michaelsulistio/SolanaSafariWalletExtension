import React from "react";

import { PublicKey } from "@solana/web3.js";
import { Wallet as WalletIcon } from "lucide-react";

type Props = Readonly<{
  publicKey: PublicKey;
}>;

export default function WalletDisplay({ publicKey }: Props) {
  return (
    <div className="flex items-center">
      <WalletIcon className="mr-2" />
      <span className="font-bold">
        Main Wallet{" "}
        <span className="text-sm font-medium text-gray-500">XNH4...1Wsj</span>
      </span>
    </div>
  );
}
