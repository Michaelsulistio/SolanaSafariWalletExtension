import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import React, { ReactChildren } from "react";
import { BaseWalletResponseEncoded } from "../types/messageTypes";

type Props = Readonly<{
  title: string;
  description: string;
  onApprove: (response: BaseWalletResponseEncoded) => void;
  children: ReactChildren;
}>;

export default function ApprovalCard({
  title,
  description,
  onApprove,
  children
}: Props) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Sender:</span>
            <span>0x123...789</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Recipient:</span>
            <span>0xabc...xyz</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Amount:</span>
            <span>2.5 ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Transaction Fee:</span>
            <span>0.01 ETH</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reject</Button>
        <Button>Approve</Button>
      </CardFooter>
      <div className="px-4 py-2 mt-4 bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-between">
          <span className="font-bold">Current Balance:</span>
          <span>5.0 ETH</span>
        </div>
      </div>
    </Card>
  );
}
