import React from "react";

import { PublicKey } from "@solana/web3.js";
import { Wallet as WalletIcon } from "lucide-react";

type Props = Readonly<{
  publicKey: PublicKey;
}>;

export default function WalletDisplay({ publicKey }: Props) {
  return (
    <div className="flex items-center">
      <WalletIcon className="mr-4" />
      <div className="flex flex-col">
        <div className="font-semibold">Main Wallet</div>{" "}
        <div className="text-sm text-gray-500">0x1234567780000</div>{" "}
      </div>
    </div>
  );
}
