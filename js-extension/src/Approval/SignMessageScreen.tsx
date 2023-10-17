import React from "react";
import { SignMessageRequest, SignMessageResponse } from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import { WalletAccount } from "@wallet-standard/base";
import signMessage from "../util/signMessage";

type Props = Readonly<{
  request: SignMessageRequest;
  onApprove: (response: SignMessageResponse) => void;
}>;

export default function SignMessageScreen({ request, onApprove }: Props) {
  const handleSignMessage = async (request: SignMessageRequest) => {
    const dummyKeypair = getDummyKeypair();

    const input = request.input;

    const { signature } = await signMessage(input.message, dummyKeypair);

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      output: {
        signedMessage: input.message,
        signature
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
