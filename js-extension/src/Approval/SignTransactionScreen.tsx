import React from "react";
import {
  SignTransactionRequestEncoded,
  SignTransactionResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import bs58 from "bs58";
import signTransaction from "../util/signTransaction";
import {
  Transaction,
  VersionedMessage,
  VersionedTransaction
} from "@solana/web3.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ApprovalFooter from "./ApprovalFooter";
import ApprovalHeader from "./ApprovalHeader";
import WalletDisplay from "./WalletDisplay";
import { Download, SendHorizontal } from "lucide-react";
import signVersionedTransaction from "../util/signVersionedTransaction";

type Props = Readonly<{
  request: SignTransactionRequestEncoded;
  onApprove: (response: SignTransactionResponseEncoded) => void;
}>;

export default function SignTransactionScreen({ request, onApprove }: Props) {
  const handleSignTransaction = async (
    request: SignTransactionRequestEncoded
  ) => {
    console.log("In sign transaction");
    const dummyKeypair = getDummyKeypair();

    const input = request.input;

    const txBytes = bs58.decode(input.transaction);

    // Asuming single byte variant
    const numOfSignatures = txBytes[0];
    const txHeaderLength = 1 + numOfSignatures * 64;

    console.log(txBytes, txBytes.length);

    const versionedMessage = VersionedMessage.deserialize(
      txBytes.slice(txHeaderLength, txBytes.length)
    );
    const versionedTx = new VersionedTransaction(versionedMessage);

    const signedTxBytes = await signVersionedTransaction(
      new VersionedTransaction(versionedMessage),
      dummyKeypair
    );
    console.log("In sign transaction 2");

    if (!request.origin) {
      throw new Error("Sender origin is missing: " + request);
    }
    console.log("In sign transaction 3");

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
          displayTitle={true}
        />

        <Separator className="mb-4" />

        <div className="text-lg font-bold">Estimated Changes</div>
        <div className="flex justify-between">
          <span className="font-bold">Network fee</span>
          <span>{"< 0.00001 SOL"}</span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-row">
            <SendHorizontal />
            <span className="font-bold ml-3">Sent</span>
          </div>
          <span className="text-red-500 font-semibold">{"0.01 SOL"}</span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-row">
            <Download />
            <span className="font-bold ml-3">Received</span>
          </div>
          <span className="text-green-500 font-semibold">{"0.236 USDC"}</span>
        </div>

        <Separator className="my-4" />

        <div className="text-lg font-bold">as:</div>
        <WalletDisplay publicKey={getDummyKeypair().publicKey} />
      </div>

      <ApprovalFooter
        onCancel={() => {}}
        onConfirm={() => handleSignTransaction(request)}
        confirmText={"Confirm"}
      />
    </div>
  );
}
