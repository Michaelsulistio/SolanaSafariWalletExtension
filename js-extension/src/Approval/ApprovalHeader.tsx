import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import OriginHeader from "./OriginHeader";

type Props = Readonly<{
  title: string;
  description: string;
  origin?: browser.runtime.MessageSender;
  displayTitle: boolean;
}>;

export default function ApprovalHeader({
  title,
  description,
  origin,
  displayTitle
}: Props) {
  return (
    <>
      {displayTitle ? (
        <CardHeader>
          <CardTitle className="text-xxl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      ) : null}
      <OriginHeader
        title={origin?.tab?.title}
        url={origin?.tab?.url}
        favIconUrl={origin?.tab?.favIconUrl}
      />
    </>
  );
}
