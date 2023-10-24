import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { useState, useEffect } from "react";

function parseKeypairFromNativeResponse(response: any): Keypair {
  const encodedPrivateKey = response.value.keypair.privateKey;
  const secretKeyBytes = bs58.decode(encodedPrivateKey);
  return Keypair.fromSecretKey(secretKeyBytes);
}

const useDummyKeypair = (): Keypair | null => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);

  useEffect(() => {
    const fetchKeypair = async () => {
      const response = await browser.runtime.sendNativeMessage(
        "id",
        "fetch-keypair"
      );

      console.log("In response: ", response);

      if (response?.value?.keypair && response.status === "success") {
        const parsedKeypair: Keypair = parseKeypairFromNativeResponse(response);
        console.log("parsedPubKey: ", parsedKeypair.publicKey.toBase58());
        setKeypair(parsedKeypair);
      } else if (response && response.status === "error") {
        console.error("Error fetching keypair:", response.message);
        // Handle error accordingly, for example by setting state to a default value or null
        setKeypair(null);
      } else {
        console.error("Unexpected response format from native message");
      }
    };
    setTimeout(() => {
      fetchKeypair();
    }, 5000);
  }, []);

  return keypair;
};

export default useDummyKeypair;
