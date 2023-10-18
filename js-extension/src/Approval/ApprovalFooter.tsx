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
    <div className="mt-auto flex justify-evenly pb-32 space-x-2">
      <Button className="rounded-full w-2/5 mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="rounded-full w-2/5 px-4" onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  );
}
