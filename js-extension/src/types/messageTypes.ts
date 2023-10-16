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

type WalletRequestOutput =
  | StandardConnectOutput
  | SolanaSignMessageOutput
  | SolanaSignTransactionOutput
  | SolanaSignAndSendTransactionOutput;

export interface BaseWalletRequest {
  type: string;
  requestId: string;
  method: string;
  input: WalletRequestInput;
  origin?: browser.runtime.MessageSender;
}

export interface BaseResponse {
  type: string;
  requestId: string;
  method: string;
  output: WalletRequestOutput;
}

export interface ConnectRequest extends BaseWalletRequest {
  input: StandardConnectInput;
  method: "SOLANA_CONNECT";
}

export interface ConnectResponse extends BaseResponse {
  output: StandardConnectOutput;
}

export interface SignMessageRequest extends BaseWalletRequest {
  input: SolanaSignMessageInput;
  method: "SOLANA_SIGN_MESSAGE";
}

export interface SignMessageResponse extends BaseResponse {
  output: SolanaSignMessageOutput;
}

export interface SignTransactionRequest extends BaseWalletRequest {
  input: SolanaSignTransactionInput;
  method: "SOLANA_SIGN_TRANSACTION";
}

export interface SignTransactionResponse extends BaseResponse {
  output: SolanaSignTransactionOutput;
}

export interface SignAndSendTransactionRequest extends BaseWalletRequest {
  input: SolanaSignAndSendTransactionInput;
  method: "SOLANA_SIGN_AND_SEND_TRANSACTION";
}

export interface SignAndSendTransactionResponse extends BaseResponse {
  output: SolanaSignAndSendTransactionOutput;
}
