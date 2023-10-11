import type { Wallet, WalletAccount } from "@wallet-standard/base";
import { ReadonlyWalletAccount, registerWallet } from "@wallet-standard/wallet";

import {
  SolanaSignAndSendTransaction,
  SolanaSignAndSendTransactionOutput,
  SolanaSignIn,
  SolanaSignInOutput,
  SolanaSignMessage,
  SolanaSignMessageOutput,
  SolanaSignTransaction,
  SolanaSignTransactionOutput,
  SolanaSignAndSendTransactionFeature,
  SolanaSignAndSendTransactionMethod,
  SolanaSignInFeature,
  SolanaSignInMethod,
  SolanaSignMessageFeature,
  SolanaSignMessageMethod,
  SolanaSignTransactionFeature,
  SolanaSignTransactionMethod
} from "@solana/wallet-standard-features";
import {
  StandardConnect,
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnect,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEvents,
  StandardEventsFeature,
  StandardEventsListeners,
  StandardEventsNames,
  StandardEventsOnMethod
} from "@wallet-standard/features";
import getAccounts from "./util/getAccounts";

let wallet: MyWallet;
let registered = false;

export function get(): Wallet {
  return (wallet ??= new MyWallet());
}

export function register(): boolean {
  try {
    if (registered) return true;

    const wallet = get();
    console.log("in register");
    console.log(wallet);
    registerWallet(wallet);
    registered = true;
    return true;
  } catch (error) {
    // Silently catch and return false.
    console.error("Failed to register wallet");
  }
  return false;
}

/** @internal */
const icon: Wallet["icon"] = "data:image/svg+xml;base64," as const;

/** @internal */
class MyWalletAccount extends ReadonlyWalletAccount {
  constructor(account: WalletAccount) {
    super(account);
    if (new.target === MyWalletAccount) {
      Object.freeze(this);
    }
  }
}

/** @internal */
class MyWallet implements Wallet {
  readonly #name = "My Wallet";
  readonly #version = "1.0.0" as const;
  readonly #icon = icon;
  readonly #listeners: {
    [E in StandardEventsNames]?: StandardEventsListeners[E][];
  } = {};
  #accounts: Wallet["accounts"] & readonly MyWalletAccount[] = [];
  #chains: Wallet["chains"] = [
    "solana:mainnet",
    "solana:devnet",
    "solana:testnet",
    "solana:localnet"
  ];

  get version() {
    return this.#version;
  }

  get name() {
    return this.#name;
  }

  get icon() {
    return this.#icon;
  }

  get accounts() {
    return this.#accounts.slice();
  }

  get chains() {
    return this.#chains.slice();
  }

  get features(): StandardConnectFeature &
    StandardDisconnectFeature &
    StandardEventsFeature &
    SolanaSignAndSendTransactionFeature &
    SolanaSignMessageFeature &
    SolanaSignInFeature &
    SolanaSignTransactionFeature {
    return {
      [StandardConnect]: {
        version: "1.0.0",
        connect: this.#standardConnect
      },
      [StandardDisconnect]: {
        version: "1.0.0",
        disconnect: this.#standardDisconnect
      },
      [StandardEvents]: {
        version: "1.0.0",
        on: this.#standardEventsOn
      },
      [SolanaSignAndSendTransaction]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signAndSendTransaction: this.#solanaSignAndSendTransaction
      },
      [SolanaSignIn]: {
        version: "1.0.0",
        signIn: this.#solanaSignIn
      },
      [SolanaSignMessage]: {
        version: "1.1.0",
        signMessage: this.#solanaSignMessage
      },
      [SolanaSignTransaction]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signTransaction: this.#solanaSignTransaction
      }
    };
  }

  constructor() {
    if (new.target === MyWallet) {
      Object.freeze(this);
    }
  }

  #connected = (accounts: readonly WalletAccount[]) => {
    console.log("connected");

    this.#accounts = accounts.map((account) => new MyWalletAccount(account));
    this.#standardEventsEmit("change", { accounts: this.accounts });
  };

  #disconnected = () => {
    console.log("disconnected");

    if (this.#accounts.length) {
      this.#accounts = [];
      this.#standardEventsEmit("change", { accounts: this.accounts });
    }
  };

  #standardEventsOn: StandardEventsOnMethod = <E extends StandardEventsNames>(
    event: E,
    listener: StandardEventsListeners[E]
  ) => {
    console.log("Events listener push");
    ((this.#listeners[event] ??= []) as StandardEventsListeners[E][]).push(
      listener
    );
    return () => this.#standardEventsOff(event, listener);
  };

  #standardEventsOff = <E extends StandardEventsNames>(
    event: E,
    listener: StandardEventsListeners[E]
  ) => {
    console.log("Events listener off");

    ((this.#listeners[event] ??= []) as StandardEventsListeners[E][]).filter(
      (existingListener) => listener !== existingListener
    );
  };

  #standardEventsEmit = <E extends StandardEventsNames>(
    event: E,
    ...args: Parameters<StandardEventsListeners[E]>
  ) => {
    console.log("In emitt");
    ((this.#listeners[event] ??= []) as StandardEventsListeners[E][]).forEach(
      (listener) =>
        // eslint-disable-next-line @typescript-eslint/ban-types,prefer-spread
        (listener as Function).apply(null, args)
    );
  };

  #standardConnect: StandardConnectMethod = async (input) => {
    console.log("In connect");
    if (!this.#accounts.length || !input?.silent) {
      // TODO: Implement.
      const accounts: WalletAccount[] = getAccounts();
      this.#connected(accounts);
    }
    return { accounts: this.accounts };
  };

  #standardDisconnect: StandardDisconnectMethod = async () => {
    console.log("std disconnect");

    this.#disconnected();
  };

  #solanaSignAndSendTransaction: SolanaSignAndSendTransactionMethod = async (
    ...inputs
  ) => {
    // TODO: Implement.
    const outputs = [] as SolanaSignAndSendTransactionOutput[];
    return outputs;
  };

  #solanaSignIn: SolanaSignInMethod = async (...inputs) => {
    // TODO: Implement.
    const outputs = [] as SolanaSignInOutput[];
    return outputs;
  };

  #solanaSignMessage: SolanaSignMessageMethod = async (...inputs) => {
    console.log("Sign Message");
    // TODO: Implement.
    const outputs = [] as SolanaSignMessageOutput[];
    return outputs;
  };

  #solanaSignTransaction: SolanaSignTransactionMethod = async (...inputs) => {
    // TODO: Implement.
    const outputs = [] as SolanaSignTransactionOutput[];
    return outputs;
  };
}
