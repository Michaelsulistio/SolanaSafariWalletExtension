import React from "react";
import {
  SignMessageRequest,
  SignMessageRequestEncoded,
  SignMessageResponseEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";
import signMessage from "../util/signMessage";
import bs58 from "bs58";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OriginHeader from "./OriginHeader";

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
    <div className="flex flex-col mx-auto max-w-sm min-h-screen">
      <div className="flex-grow flex-col space-y-4">
        <CardHeader>
          <CardTitle className="text-xxl">Message Signature</CardTitle>
          <CardDescription>
            A website is requesting you to sign a message.
          </CardDescription>
        </CardHeader>
        <OriginHeader
          title={request.origin?.tab?.title}
          url={request.origin?.tab?.url}
          favIconUrl={request.origin?.tab?.favIconUrl}
        />
        <Separator className="mb-4" />
        <div className="text-lg font-bold">Sign this message:</div>
        <div className="p-4 bg-gray-100 rounded-md shadow">
          <p className="text-sm text-muted-foreground mt-2">
            This is your message content. You can provide any details or
            information here.
          </p>
        </div>
        <Separator className="my-4" />
      </div>
      <div className="mt-auto flex justify-between pb-32">
        <Button className="flex-1 mr-2" variant="outline">
          Cancel
        </Button>
        <Button className="flex-1" onClick={() => handleSignMessage(request)}>
          Sign Message
        </Button>
      </div>
    </div>
  );
}
