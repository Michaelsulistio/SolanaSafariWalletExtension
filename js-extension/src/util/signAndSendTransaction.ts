import {
  Cluster,
  Connection,
  Keypair,
  SendOptions,
  Signer,
  TransactionSignature,
  VersionedTransaction,
  clusterApiUrl
} from "@solana/web3.js";

export default async function signAndSendTransaction(
  transaction: VersionedTransaction,
  keypair: Keypair,
  network: Cluster,
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
  const connection = new Connection(clusterApiUrl(network));
  const signature = await connection.sendTransaction(transaction, options);

  return { signature };
}
