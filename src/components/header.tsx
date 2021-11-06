import React, { useState, FC } from "react";
import { Link } from "gatsby";
import Button from "./button";

import Logo from './logo';

interface HeaderProps {
  className?: string;
  showMint?: boolean;
}

interface NavItem {
  route: string;
  title: string;
  highlight?: boolean;
}

const navItems: NavItem[] = [
  {
    route: `https://adahandle.com/mint`,
    title: `Get a Handle!`,
    highlight: true
  },
];

const Header: FC<HeaderProps> = ({ className, showMint = true }) => {
  return (
    <>
      <header className={`p-4 mx-auto md:p-8 -mb-1 ${className}`}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between">
          <Link to="/">
            <h1 className="flex items-center no-underline">
              <span className="sr-only">ADA Handle</span>
              <Logo />
            </h1>
          </Link>

          <div className="flex items-center justify-center ml-auto relative">
            <nav
              className={`block p-8`}
            >
              {navItems.map((link) => {
                return (
                  <Link
                    className={'block mt-4 text-dark-300 hover:text-primary-200 no-underline md:inline-block md:mt-0 md:ml-6 text-dark-400'}
                    activeClassName="border-primary-200"
                    key={link.title}
                    to={link.route}
                  >
                    {link.title} {link.highlight && <>&rarr;</>}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
