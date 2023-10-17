import * as bs58 from "bs58";
import {
  StandardConnectOutputEncoded,
  SolanaSignMessageOutputEncoded,
  SolanaSignTransactionOutputEncoded,
  SolanaSignAndSendTransactionOutputEncoded
} from "../types/messageTypes";
import {
  SolanaSignMessageOutput,
  SolanaSignTransactionOutput,
  SolanaSignAndSendTransactionOutput
} from "@solana/wallet-standard-features";
import { StandardConnectOutput } from "@wallet-standard/features";

export function decodeConnectOutput(
  encodedOutput: StandardConnectOutputEncoded
): StandardConnectOutput {
  return {
    accounts: encodedOutput.accounts.map((account) => ({
      ...account,
      publicKey: bs58.decode(account.publicKey)
    }))
  };
}

export function decodeSignMessageOutput(
  encodedOutput: SolanaSignMessageOutputEncoded
): SolanaSignMessageOutput {
  return {
    signedMessage: bs58.decode(encodedOutput.signedMessage),
    signature: bs58.decode(encodedOutput.signature),
    signatureType: encodedOutput.signatureType
  };
}

export function decodeSignTransactionOutput(
  encodedOutput: SolanaSignTransactionOutputEncoded
): SolanaSignTransactionOutput {
  return {
    signedTransaction: bs58.decode(encodedOutput.signedTransaction)
  };
}

export function decodeSignAndSendTransactionOutput(
  encodedOutput: SolanaSignAndSendTransactionOutputEncoded
): SolanaSignAndSendTransactionOutput {
  return {
    signature: bs58.decode(encodedOutput.signature)
  };
}
``;
