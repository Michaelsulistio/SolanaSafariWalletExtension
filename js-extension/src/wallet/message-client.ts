export default class MessageClient {
  #resolveHandler: {
    [key: string]: {
      resolve: (value?: any) => void;
      reject: (reason?: any) => void;
    };
  } = {};

  constructor() {
    // Global listener for content responses
    window.addEventListener(
      "content-response",
      this.#handleResponse.bind(this)
    );
  }

  // Handles responses from content script
  #handleResponse(event: Event) {
    const detail = (event as ContentResponseEvent).detail;
    const requestId = detail?.requestId;

    if (requestId && this.#resolveHandler[requestId]) {
      console.log("Handler for content response: ", event);
      const { resolve, reject } = this.#resolveHandler[requestId];

      if (true) {
        console.log("Resolving request: ", requestId);
        resolve(true);
      }

      delete this.#resolveHandler[requestId]; // Cleanup
    }
  }
  /**
   * Send an approval request with a payload.
   * @param {Object} payload - The data you want to send for approval.
   */
  async sendWalletRequest(payload: WalletRequest): Promise<boolean | null> {
    return new Promise((resolve, reject) => {
      const requestId = Math.random().toString(36);
      const walletRequest = new ContentRequestEvent({
        type: "wallet-request-approval",
        payload: "this is the payload",
        requestId
      });

      this.#resolveHandler[requestId] = { resolve, reject };
      console.log("Sending request: ", requestId);
      window.dispatchEvent(walletRequest);
    });
  }
}

export interface WalletRequest {
  type: string;
  payload: string;
  requestId: string;
}

export interface WalletResponse {
  approved: boolean;
  requestId: string;
}

export class ContentRequestEvent extends CustomEvent<WalletRequest> {
  constructor(detail: WalletRequest) {
    super("page-to-content", { detail });
  }
}

export class ContentResponseEvent extends CustomEvent<WalletResponse> {
  constructor(detail: WalletResponse) {
    super("content-response", { detail });
  }
}
