import React from "react";
import {
  SignTransactionRequestEncoded,
  SignTransactionResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import bs58 from "bs58";
import signTransaction from "../util/signTransaction";
import { Transaction } from "@solana/web3.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ApprovalFooter from "./ApprovalFooter";
import ApprovalHeader from "./ApprovalHeader";
import WalletDisplay from "./WalletDisplay";

type Props = Readonly<{
  request: SignTransactionRequestEncoded;
  onApprove: (response: SignTransactionResponseEncoded) => void;
}>;

export default function SignTransactionScreen({ request, onApprove }: Props) {
  const handleSignTransaction = async (
    request: SignTransactionRequestEncoded
  ) => {
    const dummyKeypair = getDummyKeypair();

    const input = request.input;
    const signedTxBytes = await signTransaction(
      Transaction.from(bs58.decode(input.transaction)),
      dummyKeypair
    );

    if (!request.origin) {
      throw new Error("Sender origin is missing: " + request);
    }

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      origin: request.origin,
      output: {
        signedTransaction: bs58.encode(signedTxBytes)
      }
    });
  };

  return (
    <div className="flex flex-col mx-auto max-w-sm min-h-screen">
      <div className="flex-grow flex-col space-y-4">
        <ApprovalHeader
          title="Sign Transaction"
          description="A website is requesting you to approve a transaction."
          origin={request.origin}
        />

        <Separator className="mb-4" />

        <div className="text-lg font-bold">Estimated Changes</div>
        <div className="flex justify-between">
          <span className="font-bold">Network fee</span>
          <span>{"< 0.00001 SOL"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold">Network fee</span>
          <span>{"< 0.00001 SOL"}</span>
        </div>

        <Separator className="my-4" />

        <div className="text-lg font-bold">Wallet</div>
        <WalletDisplay publicKey={getDummyKeypair().publicKey} />
      </div>

      <ApprovalFooter
        onCancel={() => {}}
        onConfirm={() => handleSignTransaction(request)}
        confirmText={"Sign Transaction"}
      />
    </div>
  );
}
