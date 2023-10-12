import { Keypair } from "@solana/web3.js";
import { sign } from "@solana/web3.js/src/utils/ed25519";

export default function signMessage(
  messageByteArray: Uint8Array,
  keypair: Keypair
): Uint8Array {
  return sign(messageByteArray, keypair.secretKey.slice(0, 32));
}
