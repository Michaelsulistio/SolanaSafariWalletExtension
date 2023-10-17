import React from "react";
import {
  SignTransactionRequestEncoded,
  SignTransactionResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import bs58 from "bs58";
import signTransaction from "../util/signTransaction";
import { Transaction } from "@solana/web3.js";

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
    <div>
      <button onClick={() => handleSignTransaction(request)}>
        SignTransaction
      </button>
      <button onClick={() => {}}>Reject</button>
    </div>
  );
}
