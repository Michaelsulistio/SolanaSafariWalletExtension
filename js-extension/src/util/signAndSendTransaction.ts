import {
  Cluster,
  Connection,
  Keypair,
  SendOptions,
  TransactionSignature,
  clusterApiUrl,
  VersionedTransaction,
  VersionedMessage
} from "@solana/web3.js";

export default async function signAndSendTransaction(
  transactionBytes: Uint8Array,
  keypair: Keypair,
  network: Cluster,
  options?: SendOptions
): Promise<{ signature: TransactionSignature }> {
  // TODO: Fix signAndSend
  const versionedMessage = VersionedMessage.deserialize(transactionBytes);
  console.log(versionedMessage.header);
  console.log(versionedMessage.version);
  console.log(versionedMessage.recentBlockhash);
  const tx: VersionedTransaction = new VersionedTransaction(versionedMessage);

  tx.sign([
    {
      publicKey: keypair.publicKey,
      secretKey: keypair.secretKey
    }
  ]);

  // Send Transaction
  const connection = new Connection(clusterApiUrl(network));
  const signature = await connection.sendTransaction(tx, options);

  // console.log("Length of bytes: ", transactionBytes.length);
  // const versionedMessage = VersionedMessage.deserialize(
  //   transactionBytes.slice(64)
  // );

  return { signature };
}
