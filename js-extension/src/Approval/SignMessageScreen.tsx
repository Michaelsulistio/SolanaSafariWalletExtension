import React from "react";
import {
  SignMessageRequest,
  SignMessageRequestEncoded,
  SignMessageResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import signMessage from "../util/signMessage";
import bs58 from "bs58";

type Props = Readonly<{
  request: SignMessageRequestEncoded;
  onApprove: (response: SignMessageResponseEncoded) => void;
}>;

export default function SignMessageScreen({ request, onApprove }: Props) {
  const handleSignMessage = async (request: SignMessageRequestEncoded) => {
    const dummyKeypair = getDummyKeypair();

    const input = request.input;
    const { signature } = await signMessage(
      bs58.decode(input.message),
      dummyKeypair
    );

    if (!request.origin) {
      throw new Error("Sender origin is missing: " + request);
    }

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      origin: request.origin,
      output: {
        signedMessage: input.message,
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
