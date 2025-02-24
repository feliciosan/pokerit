import { RoomProvider } from "@/context/room";

export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RoomProvider>{children}</RoomProvider>;
}
