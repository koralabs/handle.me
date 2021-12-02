import React, { useState, FC } from "react";
import { Link } from "gatsby";
import Button from "./button";

import Logo from './logo';
import { getMainDomain, useMainDomain } from "../lib/helpers/env";

interface HeaderProps {
  className?: string;
  showMint?: boolean;
}

interface NavItem {
  route: string;
  title: string;
  highlight?: boolean;
}

const Header: FC<HeaderProps> = ({ className, showMint = true }) => {
  const mainDomain = useMainDomain();
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
            <nav>
              <Link
                className={'block text-dark-300 hover:text-primary-200 no-underline mt-0 text-dark-400'}
                activeClassName="border-primary-200"
                to={`https://${mainDomain}/mint`}
              >
                Get a Handle! &rarr;
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
