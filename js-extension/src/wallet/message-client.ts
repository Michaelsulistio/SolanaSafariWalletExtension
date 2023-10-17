import {
  BaseWalletRequest,
  BaseWalletResponse,
  ConnectRequest,
  ConnectResponse,
  SignAndSendTransactionRequest,
  SignAndSendTransactionResponse,
  SignMessageRequest,
  SignMessageResponse,
  SignTransactionRequest,
  SignTransactionResponse,
  WalletRequestEvent,
  WalletResponseEvent
} from "../types/messageTypes";
import { decodeWalletResponse } from "../util/decodeWalletResponse";
import { encodeWalletRequest } from "../util/encodeWalletRequest";

export default class MessageClient {
  #resolveHandler: {
    [key: string]: {
      resolve: (value?: any) => void;
      reject: (reason?: any) => void;
    };
  } = {};

  constructor() {
    // Global listener for content responses
    window.addEventListener("wallet-response", this.#handleResponse.bind(this));
  }

  // Handles responses from content script
  #handleResponse(event: Event) {
    console.log("In MessageClient wallet handle response: ", event);
    const response = (event as WalletResponseEvent).detail;
    const requestId = response?.requestId;

    if (requestId && this.#resolveHandler[requestId]) {
      console.log("Handler for wallet response: ", event);
      const { resolve, reject } = this.#resolveHandler[requestId];

      if (true) {
        console.log("Resolving request: ", requestId);
        const decodedResponse = decodeWalletResponse(response);
        resolve(decodedResponse);
      }

      delete this.#resolveHandler[requestId]; // Cleanup
    }
  }

  async sendWalletRequest(request: ConnectRequest): Promise<ConnectResponse>;
  async sendWalletRequest(
    request: SignMessageRequest
  ): Promise<SignMessageResponse>;
  async sendWalletRequest(
    request: SignTransactionRequest
  ): Promise<SignTransactionResponse>;
  async sendWalletRequest(
    request: SignAndSendTransactionRequest
  ): Promise<SignAndSendTransactionResponse>;

  async sendWalletRequest(
    request: BaseWalletRequest
  ): Promise<BaseWalletResponse> {
    return new Promise<BaseWalletResponse>((resolve, reject) => {
      const walletRequest = new WalletRequestEvent(
        encodeWalletRequest(request)
      );

      this.#resolveHandler[request.requestId] = { resolve, reject };
      console.log("Sending request: ", request.requestId);
      window.dispatchEvent(walletRequest);
    });
  }
}
