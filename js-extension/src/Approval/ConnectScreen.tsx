import React, { useEffect, useState } from "react";
import {
  ConnectRequest,
  ConnectResponse,
  ConnectResponseEncoded,
  WalletAccountEncoded
} from "../types/messageTypes";
import getDummyKeypair from "../util/getDummyKeypair";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OriginHeader from "./OriginHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

type Props = Readonly<{
  request: ConnectRequest;
  onApprove: (response: ConnectResponseEncoded) => void;
}>;

export default function ConnectScreen({ request, onApprove }: Props) {
  const handleConnect = (request: ConnectRequest) => {
    const dummyKeypair = getDummyKeypair();
    const account: WalletAccountEncoded = {
      address: dummyKeypair.publicKey.toBase58(),
      publicKey: dummyKeypair.publicKey.toBase58(),
      chains: [
        "solana:mainnet",
        "solana:devnet",
        "solana:testnet",
        "solana:localnet"
      ],
      features: [],
      label: "Sample Safari Extension Wallet"
    };

    console.log("Connected account: ", account);

    if (!request.origin) {
      throw new Error("Sender origin is missing: " + request);
    }

    onApprove({
      type: "wallet-response",
      method: request.method,
      requestId: request.requestId,
      origin: request.origin,
      output: {
        accounts: [account]
      }
    });
  };

  return (
    <div className="flex flex-col mx-auto max-w-sm min-h-screen">
      <div className="flex-grow flex-col space-y-4">
        <CardHeader>
          <CardTitle className="text-xxl">Connect</CardTitle>
          <CardDescription>
            A website is requesting to connect your wallet.
          </CardDescription>
        </CardHeader>
        <OriginHeader
          title={request.origin?.tab?.title}
          url={request.origin?.tab?.url}
          favIconUrl={request.origin?.tab?.favIconUrl}
        />
        <Separator className="mb-4" />
        <div className="space-y-1">
          <div className="text-lg font-bold">Permissions: </div>
          <div className="text-sm pl-0 text-muted-foreground">
            • View your wallet's public key.
          </div>
          <div className="text-sm pl-0 text-muted-foreground">
            • Request approval for transactions.
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      <div className="mt-auto flex justify-between pb-32">
        <Button className="flex-1 mr-2" variant="outline">
          Reject
        </Button>
        <Button className="flex-1" onClick={() => handleConnect(request)}>
          Approve
        </Button>
      </div>
    </div>
  );
}
