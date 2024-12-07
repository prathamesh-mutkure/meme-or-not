"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { LogOut, X, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { giveGas } from "@/lib/utils";

// MobileNav component remains largely the same
const MobileNav: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
}> = ({ isOpen, onClose, navLinks }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-40">
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">MemeOrNot</h1>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="p-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block py-3 text-lg ${"text-foreground/70"}`}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  const addChain = async () => {
    if (chains) {
      if (window.ethereum)
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x14A34", // Base Sepolia's chain ID in hexadecimal (84532 in decimal)
              chainName: "Base Sepolia",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia.base.org"],
              blockExplorerUrls: ["https://sepolia.basescan.org"],
            },
          ],
        });
      switchChain({ chainId: 84532 });
    }
  };

  useEffect(() => {
    if (address) giveGas(address as string);
  }, [isConnected, address]);

  const navLinks = [
    { href: "/app/memes", label: "Explore" },
    { href: "/app/memes/create", label: "Create" },
    { href: "/app/memes/settlements", label: "Settlements" },
  ];

  const truncatedAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : "";

  return (
    <header className="bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo and Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <h1 className="text-2xl font-bold">MemeOrNot</h1>
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Logo (centered) */}
        <h1 className="text-2xl font-bold lg:hidden">MemeOrNot</h1>

        {/* Wallet Controls */}
        <div className="flex items-center gap-2 sm:gap-4 justify-center">
          {isConnected ? (
            <>
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="bg-card hover:bg-card/80 px-2 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition duration-200 text-sm sm:text-base"
                >
                  <span>{truncatedAddress}</span>
                  <LogOut className="w-4 h-4" />
                </button>

                <button onClick={addChain}>
                  <Plus />
                </button>
              </div>
            </>
          ) : (
            <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  );
};

export default Header;
