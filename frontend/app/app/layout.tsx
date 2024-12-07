import "@coinbase/onchainkit/styles.css";
import BottomHeader from "@/components/BottomHeader";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <BottomHeader />
    </>
  );
}
