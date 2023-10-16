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

export class WalletRequestEvent extends CustomEvent<WalletRequest> {
  constructor(request: WalletRequest) {
    super("page-wallet-request", { detail: request });
  }
}

export class WalletResponseEvent extends CustomEvent<WalletResponse> {
  constructor(detail: WalletResponse) {
    super("wallet-response", { detail });
  }
}
