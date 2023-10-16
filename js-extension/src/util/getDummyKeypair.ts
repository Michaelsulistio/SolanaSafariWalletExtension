import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const DUMMY_PUBLIC_KEY = "BtTKesmqAEaBoKBnwFKPFtJEGiJz2Q92bnAbqb6oWN2V";
const DUMMY_SECRET_KEY =
  "4z2CZjiaKXVFaPG5G3MRDCEfAKEXBVusN9ZPB8vY4fdTLi7o6gKJrUY2Gj88UgBcALVTyiXxsTxaj6SCL8dgboBP";

export default function getDummyKeypair(): Keypair {
  const publicKey = bs58.decode(DUMMY_PUBLIC_KEY);
  const secretKey = bs58.decode(DUMMY_SECRET_KEY);
  return Keypair.fromSecretKey(secretKey);
}
