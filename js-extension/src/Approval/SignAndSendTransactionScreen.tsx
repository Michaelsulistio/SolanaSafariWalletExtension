import React from "react";
import {
  SignAndSendTransactionRequestEncoded,
  SignAndSendTransactionResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import bs58 from "bs58";
import signAndSendTransaction from "../util/signAndSendTransaction";
import {
  Transaction,
  VersionedMessage,
  VersionedTransaction
} from "@solana/web3.js";
import { SolanaChain, getClusterForChain } from "../wallet/solana";

type Props = Readonly<{
  request: SignAndSendTransactionRequestEncoded;
  onApprove: (response: SignAndSendTransactionResponseEncoded) => void;
}>;

export default function SignAndSendTransactionScreen({
  request,
  onApprove
}: Props) {
  const handleSignAndSendTransaction = async (
    request: SignAndSendTransactionRequestEncoded
  ) => {
    if (!request.origin) {
      throw new Error("Sender origin is missing: " + request);
    }
    const dummyKeypair = getDummyKeypair();

    const input = request.input;
    const { signature } = await signAndSendTransaction(
      bs58.decode(input.transaction),
      dummyKeypair,
      getClusterForChain(input.chain as SolanaChain),
      input.options
    );

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      origin: request.origin,
      output: {
        signature
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleSignAndSendTransaction(request)}>
        SignAndSendTransaction
      </button>
      <button onClick={() => {}}>Reject</button>
    </div>
  );
}
