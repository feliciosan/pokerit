import { Metadata } from "next";
import { Providers } from "./providers";
import PortalHeader from "@/components/PortalHeader";

export const metadata: Metadata = {
  title: "PokerIt | Planning Poker",
  description: "PokerIt is a planning poker tool for agile teams.",
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen w-full">
        <PortalHeader />
        <main className="flex flex-col flex-grow w-full max-w-6xl mx-auto px-4 py-4">
          {children}
        </main>
      </div>
    </Providers>
  );
}
