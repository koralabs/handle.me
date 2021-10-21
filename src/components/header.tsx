import { Link } from "gatsby";
import React, { useState, FC, useEffect } from "react";
import { getAccessTokenFromCookie, getSessionTokenFromCookie } from "../lib/helpers/session";
import { useAccessOpen } from "../lib/hooks/access";
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
    route: `/faq`,
    title: `FAQ`,
  },
  {
    route: '/team',
    title: 'Team'
  },
  {
    route: '/tou',
    title: 'Terms of Use'
  }
];

const Header: FC<HeaderProps> = ({ className, showMint = true }) => {
  const [isExpanded, toggleExpansion] = useState<boolean>(false);

  return (
    <>
      <header className={`p-4 mx-auto md:p-8 ${className}`} style={{ minHeight: 120 }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between">
          <Link to="/">
            <h1 className="flex items-center no-underline">
              <span className="sr-only">$handle</span>
              <Logo />
            </h1>
          </Link>

          <div className="flex items-center justify-center mr-auto relative">
            <button
              className="items-center block px-3 py-2 border-dark-100 text-white border border-white rounded md:hidden"
              onClick={() => toggleExpansion(!isExpanded)}
            >
              <svg
                className="w-3 h-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>

            <nav
              className={`${
                isExpanded ? `block absolute top-full left-0 bg-dark-100 p-8 z-50 shadow-lg w-48` : `hidden w-full`
              } md:block md:items-center md:w-auto`}
            >
              {navItems.map((link) => {
                return (
                  <Link
                    className={'block mt-4 text-dark-300 hover:text-primary-200 no-underline md:inline-block md:mt-0 md:ml-6 text-dark-400'}
                    activeClassName="border-primary-200"
                    key={link.title}
                    to={link.route}
                  >
                    {link.title}
                  </Link>
                )
              })}
            </nav>
          </div>
          {showMint && (
            <Button
              animate
              href={'/mint'}
            >
              Beta Sale Open! &rarr;
            </Button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
