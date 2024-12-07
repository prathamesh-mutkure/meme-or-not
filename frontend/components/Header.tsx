"use client";

import React from "react";
import Link from "next/link";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

const Header: React.FC = () => {
  return (
    <header className="bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold">MemeOrNot</h1>
          </Link>
        </div>

        {/* Mobile Logo (centered) */}
        <Link href="/" className="lg:hidden hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold">MemeOrNot</h1>
        </Link>

        {/* Wallet Controls */}
        <div className="flex items-center gap-2 sm:gap-4 justify-center">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownBasename />
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
              >
                Connect Wallet
              </WalletDropdownLink>
              <WalletDropdownFundLink />
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    </header>
  );
};

export default Header;