"use client";

import { Button } from "@/components/ui/button";

export default function RetryButton() {
  return <Button onClick={() => location.reload()}>Retry</Button>;
}
