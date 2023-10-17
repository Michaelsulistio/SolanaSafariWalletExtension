import {
  BaseWalletRequest,
  BaseWalletResponse,
  ConnectRequest,
  ConnectResponse,
  ConnectResponseEncoded,
  SignAndSendTransactionRequest,
  SignAndSendTransactionResponse,
  SignAndSendTransactionResponseEncoded,
  SignMessageRequest,
  SignMessageResponse,
  SignMessageResponseEncoded,
  SignTransactionRequest,
  SignTransactionResponse,
  SignTransactionResponseEncoded,
  WalletRequestEvent,
  WalletResponseEvent
} from "../types/messageTypes";

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
    const request = (event as WalletResponseEvent).detail;
    const requestId = request?.requestId;

    if (requestId && this.#resolveHandler[requestId]) {
      console.log("Handler for wallet response: ", event);
      const { resolve, reject } = this.#resolveHandler[requestId];

      if (true) {
        console.log("Resolving request: ", requestId);
        resolve(request);
      }

      delete this.#resolveHandler[requestId]; // Cleanup
    }
  }

  /**
   * Send a wallet request to content script
   */
  // async sendWalletRequest_old(
  //   requestId: string,
  //   method: string,
  //   payload: string
  // ): Promise<boolean | null> {
  //   return new Promise((resolve, reject) => {
  //     const walletRequest = new WalletRequestEvent({
  //       type: "page-wallet-request",
  //       method,
  //       payload,
  //       requestId
  //     });

  //     this.#resolveHandler[requestId] = { resolve, reject };
  //     console.log("Sending request: ", requestId);
  //     window.dispatchEvent(walletRequest);
  //   });
  // }

  async sendWalletRequest(
    request: ConnectRequest
  ): Promise<ConnectResponseEncoded>;
  async sendWalletRequest(
    request: SignMessageRequest
  ): Promise<SignMessageResponseEncoded>;
  async sendWalletRequest(
    request: SignTransactionRequest
  ): Promise<SignTransactionResponseEncoded>;
  async sendWalletRequest(
    request: SignAndSendTransactionRequest
  ): Promise<SignAndSendTransactionResponseEncoded>;

  async sendWalletRequest(
    request: BaseWalletRequest
  ): Promise<BaseWalletResponse> {
    return new Promise<BaseWalletResponse>((resolve, reject) => {
      const walletRequest = new WalletRequestEvent(request);

      this.#resolveHandler[request.requestId] = { resolve, reject };
      console.log("Sending request: ", request.requestId);
      window.dispatchEvent(walletRequest);
    });
  }
}
