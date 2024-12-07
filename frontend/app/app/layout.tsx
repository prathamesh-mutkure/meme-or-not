import "@coinbase/onchainkit/styles.css";
import BottomHeader from "@/components/BottomHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomHeader />
    </>
  );
}
