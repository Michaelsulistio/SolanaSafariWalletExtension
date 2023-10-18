import { Button } from "@/components/ui/button";
import React from "react";
import { BaseWalletResponseEncoded } from "../types/messageTypes";

type FooterProps = Readonly<{
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
}>;

export default function ApprovalFooter({
  onCancel,
  onConfirm,
  confirmText
}: FooterProps) {
  return (
    <div className="mt-auto flex justify-between pb-32">
      <Button className="flex-1 mr-2" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="flex-1" onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  );
}
