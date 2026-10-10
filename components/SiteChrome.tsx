"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ChatbotTurismo } from "@/components/ChatbotTurismo";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <ChatbotTurismo />
    </>
  );
}
