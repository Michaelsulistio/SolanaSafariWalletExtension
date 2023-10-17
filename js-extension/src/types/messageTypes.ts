import {
  SolanaSignAndSendTransactionInput,
  SolanaSignAndSendTransactionOutput,
  SolanaSignMessageInput,
  SolanaSignMessageOutput,
  SolanaSignTransactionInput,
  SolanaSignTransactionOutput
} from "@solana/wallet-standard-features";
import { WalletAccount } from "@wallet-standard/base";
import {
  StandardConnectInput,
  StandardConnectOutput
} from "@wallet-standard/features";

type AppIdentity = Readonly<{
  originTabId: number;
  originUrl: string;
}>;

export enum WalletRequestMethod {
  SOLANA_CONNECT = "SOLANA_CONNECT",
  SOLANA_SIGN_MESSAGE = "SOLANA_SIGN_MESSAGE",
  SOLANA_SIGN_TRANSACTION = "SOLANA_SIGN_TRANSACTION",
  SOLANA_SIGN_AND_SEND_TRANSACTION = "SOLANA_SIGN_AND_SEND_TRANSACTION"
}

export interface WalletRequest {
  type: string;
  method: string;
  payload: string;
  requestId: string;
  sender?: browser.runtime.MessageSender;
}

export interface WalletResponse {
  type: string;
  method: string;
  approved: boolean;
  requestId: string;
}

export class WalletRequestEvent extends CustomEvent<BaseWalletRequest> {
  constructor(request: BaseWalletRequest) {
    super("page-wallet-request", { detail: request });
  }
}

export class WalletResponseEvent extends CustomEvent<WalletResponse> {
  constructor(detail: WalletResponse) {
    super("wallet-response", { detail });
  }
}

type WalletRequestInput =
  | StandardConnectInput
  | SolanaSignMessageInput
  | SolanaSignTransactionInput
  | SolanaSignAndSendTransactionInput;

export type WalletRequestOutputEncoded =
  | StandardConnectOutputEncoded
  | SolanaSignMessageOutputEncoded
  | SolanaSignTransactionOutputEncoded
  | SolanaSignAndSendTransactionOutputEncoded;

export interface BaseWalletRequest {
  type: string;
  requestId: string;
  method: WalletRequestMethod;
  input: WalletRequestInput;
  origin?: browser.runtime.MessageSender;
}

export interface BaseWalletResponse {
  type: string;
  requestId: string;
  method: WalletRequestMethod;
  output: WalletRequestOutputEncoded;
  origin: browser.runtime.MessageSender;
}

export interface ConnectRequest extends BaseWalletRequest {
  input: StandardConnectInput;
  method: WalletRequestMethod.SOLANA_CONNECT;
}

export interface ConnectResponseEncoded extends BaseWalletResponse {
  output: StandardConnectOutputEncoded;
  method: WalletRequestMethod.SOLANA_CONNECT;
}

type WalletAccountEncoded = Omit<WalletAccount, "publicKey"> & {
  publicKey: string;
};

export type StandardConnectOutputEncoded = {
  accounts: readonly WalletAccountEncoded[];
};

export interface SignMessageRequest extends BaseWalletRequest {
  input: SolanaSignMessageInput;
  method: WalletRequestMethod.SOLANA_SIGN_MESSAGE;
}

export interface SignMessageResponseEncoded extends BaseWalletResponse {
  output: SolanaSignMessageOutputEncoded;
  method: WalletRequestMethod.SOLANA_SIGN_MESSAGE;
}

export interface SolanaSignMessageOutputEncoded {
  readonly signedMessage: string;
  readonly signature: string;
  readonly signatureType?: "ed25519";
}

export interface SignTransactionRequest extends BaseWalletRequest {
  input: SolanaSignTransactionInput;
  method: WalletRequestMethod.SOLANA_SIGN_TRANSACTION;
}

export interface SignTransactionResponseEncoded extends BaseWalletResponse {
  output: SolanaSignTransactionOutputEncoded;
  method: WalletRequestMethod.SOLANA_SIGN_TRANSACTION;
}

export interface SolanaSignTransactionOutputEncoded {
  readonly signedTransaction: string;
}

export interface SignAndSendTransactionRequest extends BaseWalletRequest {
  input: SolanaSignAndSendTransactionInput;
  method: WalletRequestMethod.SOLANA_SIGN_AND_SEND_TRANSACTION;
}

export interface SignAndSendTransactionResponseEncoded
  extends BaseWalletResponse {
  output: SolanaSignAndSendTransactionOutputEncoded;
  method: WalletRequestMethod.SOLANA_SIGN_AND_SEND_TRANSACTION;
}

export interface SolanaSignAndSendTransactionOutputEncoded {
  readonly signature: string;
}
