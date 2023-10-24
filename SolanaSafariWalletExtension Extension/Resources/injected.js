(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __assign = Object.assign;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // node_modules/base-x/src/index.js
  var require_src = __commonJS((exports, module) => {
    "use strict";
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode2(source) {
        if (source instanceof Uint8Array) {
        } else if (ArrayBuffer.isView(source)) {
          source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
          source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
          throw new TypeError("Expected Uint8Array");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return new Uint8Array();
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = new Uint8Array(zeroes + (size - it4));
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode2(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode2,
        decodeUnsafe,
        decode: decode2
      };
    }
    module.exports = base;
  });

  // node_modules/bs58/index.js
  var require_bs58 = __commonJS((exports, module) => {
    var basex = require_src();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  });

  // node_modules/@wallet-standard/wallet/lib/esm/register.js
  var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _RegisterWalletEvent_detail;
  function registerWallet(wallet2) {
    const callback = ({register: register2}) => {
      register2(wallet2);
    };
    try {
      window.dispatchEvent(new RegisterWalletEvent(callback));
    } catch (error) {
      console.error("wallet-standard:register-wallet event could not be dispatched\n", error);
    }
    try {
      window.addEventListener("wallet-standard:app-ready", ({detail: api}) => callback(api));
    } catch (error) {
      console.error("wallet-standard:app-ready event listener could not be added\n", error);
    }
  }
  var RegisterWalletEvent = class extends Event {
    constructor(callback) {
      super("wallet-standard:register-wallet", {
        bubbles: false,
        cancelable: false,
        composed: false
      });
      _RegisterWalletEvent_detail.set(this, void 0);
      __classPrivateFieldSet(this, _RegisterWalletEvent_detail, callback, "f");
    }
    get detail() {
      return __classPrivateFieldGet(this, _RegisterWalletEvent_detail, "f");
    }
    get type() {
      return "wallet-standard:register-wallet";
    }
    preventDefault() {
      throw new Error("preventDefault cannot be called");
    }
    stopImmediatePropagation() {
      throw new Error("stopImmediatePropagation cannot be called");
    }
    stopPropagation() {
      throw new Error("stopPropagation cannot be called");
    }
  };
  _RegisterWalletEvent_detail = new WeakMap();

  // node_modules/@solana/wallet-standard-features/lib/esm/signAndSendTransaction.js
  var SolanaSignAndSendTransaction = "solana:signAndSendTransaction";

  // node_modules/@solana/wallet-standard-features/lib/esm/signIn.js
  var SolanaSignIn = "solana:signIn";

  // node_modules/@solana/wallet-standard-features/lib/esm/signMessage.js
  var SolanaSignMessage = "solana:signMessage";

  // node_modules/@solana/wallet-standard-features/lib/esm/signTransaction.js
  var SolanaSignTransaction = "solana:signTransaction";

  // node_modules/@wallet-standard/features/lib/esm/connect.js
  var StandardConnect = "standard:connect";

  // node_modules/@wallet-standard/features/lib/esm/disconnect.js
  var StandardDisconnect = "standard:disconnect";

  // node_modules/@wallet-standard/features/lib/esm/events.js
  var StandardEvents = "standard:events";

  // src/wallet/solana.ts
  var SOLANA_MAINNET_CHAIN = "solana:mainnet";
  var SOLANA_DEVNET_CHAIN = "solana:devnet";
  var SOLANA_TESTNET_CHAIN = "solana:testnet";
  var SOLANA_LOCALNET_CHAIN = "solana:localnet";
  var SOLANA_CHAINS = [
    SOLANA_MAINNET_CHAIN,
    SOLANA_DEVNET_CHAIN,
    SOLANA_TESTNET_CHAIN,
    SOLANA_LOCALNET_CHAIN
  ];
  function isSolanaChain(chain) {
    return SOLANA_CHAINS.includes(chain);
  }

  // src/types/messageTypes.ts
  var WalletRequestMethod;
  (function(WalletRequestMethod2) {
    WalletRequestMethod2["SOLANA_CONNECT"] = "SOLANA_CONNECT";
    WalletRequestMethod2["SOLANA_SIGN_MESSAGE"] = "SOLANA_SIGN_MESSAGE";
    WalletRequestMethod2["SOLANA_SIGN_TRANSACTION"] = "SOLANA_SIGN_TRANSACTION";
    WalletRequestMethod2["SOLANA_SIGN_AND_SEND_TRANSACTION"] = "SOLANA_SIGN_AND_SEND_TRANSACTION";
  })(WalletRequestMethod || (WalletRequestMethod = {}));
  var WalletRequestEvent = class extends CustomEvent {
    constructor(request) {
      super("page-wallet-request", {detail: request});
    }
  };

  // src/util/decodeWalletResponse.ts
  var bs58 = __toModule(require_bs58());
  function decodeWalletResponse(response) {
    return __assign(__assign({}, response), {
      output: decodeOutput(response.method, response.output)
    });
  }
  function decodeOutput(method, encodedOutput) {
    switch (method) {
      case WalletRequestMethod.SOLANA_CONNECT:
        return decodeConnectOutput(encodedOutput);
      case WalletRequestMethod.SOLANA_SIGN_MESSAGE:
        return decodeSignMessageOutput(encodedOutput);
      case WalletRequestMethod.SOLANA_SIGN_TRANSACTION:
        return decodeSignTransactionOutput(encodedOutput);
      case WalletRequestMethod.SOLANA_SIGN_AND_SEND_TRANSACTION:
        console.log("IN DECODE");
        console.log(encodedOutput);
        return decodeSignAndSendTransactionOutput(encodedOutput);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
  function decodeConnectOutput(encodedOutput) {
    return {
      accounts: encodedOutput.accounts.map((account) => __assign(__assign({}, account), {
        publicKey: bs58.decode(account.publicKey)
      }))
    };
  }
  function decodeSignMessageOutput(encodedOutput) {
    return {
      signedMessage: bs58.decode(encodedOutput.signedMessage),
      signature: bs58.decode(encodedOutput.signature),
      signatureType: encodedOutput.signatureType
    };
  }
  function decodeSignTransactionOutput(encodedOutput) {
    return {
      signedTransaction: bs58.decode(encodedOutput.signedTransaction)
    };
  }
  function decodeSignAndSendTransactionOutput(encodedOutput) {
    return {
      signature: bs58.decode(encodedOutput.signature)
    };
  }

  // src/util/encodeWalletRequest.ts
  var bs582 = __toModule(require_bs58());
  function encodeWalletRequest(request) {
    return __assign(__assign({}, request), {
      input: encodeInput(request.method, request.input)
    });
  }
  function encodeInput(method, input) {
    switch (method) {
      case WalletRequestMethod.SOLANA_CONNECT:
        return input;
      case WalletRequestMethod.SOLANA_SIGN_MESSAGE:
        return encodeSignMessageInput(input);
      case WalletRequestMethod.SOLANA_SIGN_TRANSACTION:
        return encodeSignTransactionInput(input);
      case WalletRequestMethod.SOLANA_SIGN_AND_SEND_TRANSACTION:
        return encodeSignAndSendTransactionInput(input);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
  function encodeSignMessageInput(input) {
    return {
      account: __assign(__assign({}, input.account), {
        publicKey: bs582.encode(input.account.publicKey)
      }),
      message: bs582.encode(input.message)
    };
  }
  function encodeSignTransactionInput(input) {
    return {
      account: __assign(__assign({}, input.account), {
        publicKey: bs582.encode(input.account.publicKey)
      }),
      transaction: bs582.encode(input.transaction),
      chain: input.chain,
      options: input.options
    };
  }
  function encodeSignAndSendTransactionInput(input) {
    return __assign(__assign({}, encodeSignTransactionInput(input)), {
      chain: input.chain,
      options: input.options
    });
  }

  // src/wallet/message-client.ts
  var _resolveHandler, _handleResponse, handleResponse_fn;
  var MessageClient = class {
    constructor() {
      _handleResponse.add(this);
      _resolveHandler.set(this, {});
      window.addEventListener("wallet-response", __privateMethod(this, _handleResponse, handleResponse_fn).bind(this));
    }
    async sendWalletRequest(request) {
      return new Promise((resolve, reject) => {
        const walletRequest = new WalletRequestEvent(encodeWalletRequest(request));
        __privateGet(this, _resolveHandler)[request.requestId] = {resolve, reject};
        window.dispatchEvent(walletRequest);
      });
    }
  };
  _resolveHandler = new WeakMap();
  _handleResponse = new WeakSet();
  handleResponse_fn = function(event) {
    const response = event.detail;
    const requestId = response == null ? void 0 : response.requestId;
    if (requestId && __privateGet(this, _resolveHandler)[requestId]) {
      const {resolve, reject} = __privateGet(this, _resolveHandler)[requestId];
      const decodedResponse = decodeWalletResponse(response);
      resolve(decodedResponse);
      delete __privateGet(this, _resolveHandler)[requestId];
    }
  };
  var message_client_default = MessageClient;

  // src/wallet/account.ts
  var chains = SOLANA_CHAINS;
  var features = [
    SolanaSignAndSendTransaction,
    SolanaSignTransaction,
    SolanaSignMessage
  ];
  var _address, _publicKey, _chains, _features, _label, _icon;
  var _SafariExtensionDemoWalletAccount = class {
    constructor({
      address,
      publicKey,
      label,
      icon: icon2
    }) {
      _address.set(this, void 0);
      _publicKey.set(this, void 0);
      _chains.set(this, void 0);
      _features.set(this, void 0);
      _label.set(this, void 0);
      _icon.set(this, void 0);
      if (new.target === _SafariExtensionDemoWalletAccount) {
        Object.freeze(this);
      }
      __privateSet(this, _address, address);
      __privateSet(this, _publicKey, publicKey);
      __privateSet(this, _chains, chains);
      __privateSet(this, _features, features);
      __privateSet(this, _label, label);
      __privateSet(this, _icon, icon2);
    }
    get address() {
      return __privateGet(this, _address);
    }
    get publicKey() {
      return __privateGet(this, _publicKey).slice();
    }
    get chains() {
      return __privateGet(this, _chains).slice();
    }
    get features() {
      return __privateGet(this, _features).slice();
    }
    get label() {
      return __privateGet(this, _label);
    }
    get icon() {
      return __privateGet(this, _icon);
    }
  };
  var SafariExtensionDemoWalletAccount = _SafariExtensionDemoWalletAccount;
  _address = new WeakMap();
  _publicKey = new WeakMap();
  _chains = new WeakMap();
  _features = new WeakMap();
  _label = new WeakMap();
  _icon = new WeakMap();

  // src/wallet/icon.ts
  var icon = "data:image/png;base64,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";

  // src/provider.ts
  var wallet;
  var registered = false;
  function get() {
    return wallet != null ? wallet : wallet = new SafariExtensionDemoWallet();
  }
  function register() {
    try {
      if (registered)
        return true;
      const wallet2 = get();
      console.log("in register");
      console.log(wallet2);
      registerWallet(wallet2);
      registered = true;
      return true;
    } catch (error) {
      console.error("Failed to register wallet");
    }
    return false;
  }
  var _messageClient, _name, _version, _icon2, _listeners, _accounts, _chains2, _connected, _disconnected, _standardEventsOn, _standardEventsOff, _standardEventsEmit, _standardConnect, _standardDisconnect, _solanaSignAndSendTransaction, _solanaSignIn, _solanaSignMessage, _solanaSignTransaction;
  var _SafariExtensionDemoWallet = class {
    constructor() {
      _messageClient.set(this, void 0);
      _name.set(this, "Safari Web Extension Wallet");
      _version.set(this, "1.0.0");
      _icon2.set(this, icon);
      _listeners.set(this, {});
      _accounts.set(this, []);
      _chains2.set(this, [
        "solana:mainnet",
        "solana:devnet",
        "solana:testnet",
        "solana:localnet"
      ]);
      _connected.set(this, (accounts) => {
        console.log("connected");
        __privateSet(this, _accounts, accounts.map((account) => new SafariExtensionDemoWalletAccount(account)));
        console.log(__privateGet(this, _accounts));
        __privateGet(this, _standardEventsEmit).call(this, "change", {accounts: this.accounts});
      });
      _disconnected.set(this, () => {
        console.log("disconnected");
        if (__privateGet(this, _accounts).length) {
          __privateSet(this, _accounts, []);
          __privateGet(this, _standardEventsEmit).call(this, "change", {accounts: this.accounts});
        }
      });
      _standardEventsOn.set(this, (event, listener) => {
        var _a, _b;
        console.log("Events listener push");
        ((_b = (_a = __privateGet(this, _listeners))[event]) != null ? _b : _a[event] = []).push(listener);
        return () => __privateGet(this, _standardEventsOff).call(this, event, listener);
      });
      _standardEventsOff.set(this, (event, listener) => {
        var _a, _b;
        console.log("Events listener off");
        ((_b = (_a = __privateGet(this, _listeners))[event]) != null ? _b : _a[event] = []).filter((existingListener) => listener !== existingListener);
      });
      _standardEventsEmit.set(this, (event, ...args) => {
        var _a, _b;
        console.log("In emitt");
        ((_b = (_a = __privateGet(this, _listeners))[event]) != null ? _b : _a[event] = []).forEach((listener) => {
          console.log("In emssion");
          listener.apply(null, args);
        });
      });
      _standardConnect.set(this, async (input) => {
        console.log("In connect");
        if (!__privateGet(this, _accounts).length || !(input == null ? void 0 : input.silent)) {
          const response = await __privateGet(this, _messageClient).sendWalletRequest({
            type: "page-wallet-request",
            requestId: Math.random().toString(36),
            method: WalletRequestMethod.SOLANA_CONNECT,
            input: input != null ? input : {silent: false}
          });
          __privateGet(this, _connected).call(this, response.output.accounts);
        }
        return {accounts: this.accounts};
      });
      _standardDisconnect.set(this, async () => {
        console.log("std disconnect");
        __privateGet(this, _disconnected).call(this);
      });
      _solanaSignAndSendTransaction.set(this, async (...inputs) => {
        console.log("In Sign And Send Transaction");
        if (!__privateGet(this, _accounts))
          throw new Error("not connected");
        const outputs = [];
        if (inputs.length === 1) {
          const {transaction, account, chain, options} = inputs[0];
          const {minContextSlot, preflightCommitment, skipPreflight, maxRetries} = options || {};
          if (!__privateGet(this, _accounts).some((acc) => acc.address === account.address)) {
            throw new Error("invalid account");
          }
          if (!isSolanaChain(chain))
            throw new Error("invalid chain");
          const response = await __privateGet(this, _messageClient).sendWalletRequest({
            type: "page-wallet-request",
            requestId: Math.random().toString(36),
            method: WalletRequestMethod.SOLANA_SIGN_AND_SEND_TRANSACTION,
            input: inputs[0]
          });
          outputs.push(response.output);
        } else if (inputs.length > 1) {
          for (const input of inputs) {
            outputs.push(...await __privateGet(this, _solanaSignAndSendTransaction).call(this, input));
          }
        }
        return outputs;
      });
      _solanaSignIn.set(this, async (...inputs) => {
        console.log("In Sign In");
        const outputs = [];
        return outputs;
      });
      _solanaSignMessage.set(this, async (...inputs) => {
        console.log("In Sign Message");
        if (!__privateGet(this, _accounts))
          throw new Error("not connected");
        const outputs = [];
        if (inputs.length === 1) {
          const {message, account} = inputs[0];
          if (!__privateGet(this, _accounts).some((acc) => acc.address === account.address)) {
            throw new Error("invalid account");
          }
          const response = await __privateGet(this, _messageClient).sendWalletRequest({
            type: "page-wallet-request",
            requestId: Math.random().toString(36),
            method: WalletRequestMethod.SOLANA_SIGN_MESSAGE,
            input: inputs[0]
          });
          outputs.push(response.output);
        } else if (inputs.length > 1) {
          for (const input of inputs) {
            outputs.push(...await __privateGet(this, _solanaSignMessage).call(this, input));
          }
        }
        return outputs;
      });
      _solanaSignTransaction.set(this, async (...inputs) => {
        console.log("In Sign Transaction");
        if (!__privateGet(this, _accounts))
          throw new Error("not connected");
        const outputs = [];
        if (inputs.length === 1) {
          const {transaction, account, chain} = inputs[0];
          if (!__privateGet(this, _accounts).some((acc) => acc.address === account.address)) {
            throw new Error("invalid account");
          }
          if (chain && !isSolanaChain(chain))
            throw new Error("invalid chain");
          const response = await __privateGet(this, _messageClient).sendWalletRequest({
            type: "page-wallet-request",
            requestId: Math.random().toString(36),
            method: WalletRequestMethod.SOLANA_SIGN_TRANSACTION,
            input: inputs[0]
          });
          outputs.push(response.output);
        } else if (inputs.length > 1) {
          let chain = void 0;
          for (const input of inputs) {
            if (!__privateGet(this, _accounts).some((acc) => acc.address === input.account.address)) {
              throw new Error("invalid account");
            }
            if (input.chain) {
              if (!isSolanaChain(input.chain))
                throw new Error("invalid chain");
              if (chain) {
                if (input.chain !== chain)
                  throw new Error("conflicting chain");
              } else {
                chain = input.chain;
              }
            }
          }
          const signedTransactions = await Promise.all(inputs.map((input) => __privateGet(this, _solanaSignTransaction).call(this, input)));
          outputs.push(...signedTransactions.map((singleSignedOutput) => singleSignedOutput[0]));
        }
        return outputs;
      });
      __privateSet(this, _messageClient, new message_client_default());
      if (new.target === _SafariExtensionDemoWallet) {
        Object.freeze(this);
      }
    }
    get version() {
      return __privateGet(this, _version);
    }
    get name() {
      return __privateGet(this, _name);
    }
    get icon() {
      return __privateGet(this, _icon2);
    }
    get accounts() {
      return __privateGet(this, _accounts).slice();
    }
    get chains() {
      return __privateGet(this, _chains2).slice();
    }
    get features() {
      return {
        [StandardConnect]: {
          version: "1.0.0",
          connect: __privateGet(this, _standardConnect)
        },
        [StandardDisconnect]: {
          version: "1.0.0",
          disconnect: __privateGet(this, _standardDisconnect)
        },
        [StandardEvents]: {
          version: "1.0.0",
          on: __privateGet(this, _standardEventsOn)
        },
        [SolanaSignAndSendTransaction]: {
          version: "1.0.0",
          supportedTransactionVersions: ["legacy", 0],
          signAndSendTransaction: __privateGet(this, _solanaSignAndSendTransaction)
        },
        [SolanaSignIn]: {
          version: "1.0.0",
          signIn: __privateGet(this, _solanaSignIn)
        },
        [SolanaSignMessage]: {
          version: "1.1.0",
          signMessage: __privateGet(this, _solanaSignMessage)
        },
        [SolanaSignTransaction]: {
          version: "1.0.0",
          supportedTransactionVersions: ["legacy", 0],
          signTransaction: __privateGet(this, _solanaSignTransaction)
        }
      };
    }
  };
  var SafariExtensionDemoWallet = _SafariExtensionDemoWallet;
  _messageClient = new WeakMap();
  _name = new WeakMap();
  _version = new WeakMap();
  _icon2 = new WeakMap();
  _listeners = new WeakMap();
  _accounts = new WeakMap();
  _chains2 = new WeakMap();
  _connected = new WeakMap();
  _disconnected = new WeakMap();
  _standardEventsOn = new WeakMap();
  _standardEventsOff = new WeakMap();
  _standardEventsEmit = new WeakMap();
  _standardConnect = new WeakMap();
  _standardDisconnect = new WeakMap();
  _solanaSignAndSendTransaction = new WeakMap();
  _solanaSignIn = new WeakMap();
  _solanaSignMessage = new WeakMap();
  _solanaSignTransaction = new WeakMap();

  // src/injected.ts
  function main() {
    console.log("Injecting provider");
    register();
  }
  main();
})();
