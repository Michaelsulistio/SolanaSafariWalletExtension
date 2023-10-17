import React from "react";
import {
  SignMessageRequest,
  SignMessageResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import signMessage from "../util/signMessage";
import bs58 from "bs58";

type Props = Readonly<{
  request: SignMessageRequest;
  onApprove: (response: SignMessageResponseEncoded) => void;
}>;

export default function SignMessageScreen({ request, onApprove }: Props) {
  const handleSignMessage = async (request: SignMessageRequest) => {
    const dummyKeypair = getDummyKeypair();

    const input = request.input;
    console.log(input);
    const { signature } = await signMessage(input.message, dummyKeypair);

    if (!request.origin) {
      throw new Error("Sender origin is missing: " + request);
    }

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      origin: request.origin,
      output: {
        signedMessage: bs58.encode(input.message),
        signature: bs58.encode(signature)
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleSignMessage(request)}>SignMessage</button>
      <button onClick={() => {}}>Reject</button>
    </div>
  );
}
