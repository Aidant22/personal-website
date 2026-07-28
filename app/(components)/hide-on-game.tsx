"use client";

import { usePathname } from "next/navigation";

export default function HideOnGame({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/game") return null;
  return <>{children}</>;
}
