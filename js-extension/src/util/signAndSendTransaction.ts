import {
  Connection,
  Keypair,
  SendOptions,
  Signer,
  TransactionSignature,
  VersionedTransaction
} from "@solana/web3.js";

export default async function signAndSendTransaction(
  transaction: VersionedTransaction,
  keypair: Keypair,
  rpcEndpoint: string,
  options?: SendOptions
): Promise<{ signature: TransactionSignature }> {
  // Sign Transaction
  const signers: Signer[] = [
    {
      publicKey: keypair.publicKey,
      secretKey: keypair.secretKey
    }
  ];
  transaction.sign(signers);

  // Send Transaction
  const connection = new Connection(rpcEndpoint);
  const signature = await connection.sendTransaction(transaction, options);

  return { signature };
}
