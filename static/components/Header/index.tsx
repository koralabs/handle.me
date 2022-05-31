import React from "react";

import Logo from './logo';
import Link from "next/link";
import { useMainDomain } from "../../hooks/useMainDomain";

interface HeaderProps {
    className?: string;
    showMint?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className, showMint = true }) => {
    const mainDomain = useMainDomain();
    return (
        <>
            <header className={`p-4 mx-auto md:p-8 -mb-1 ${className}`}>
                <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between">
                    <Link href="/">
                        <a><h1 className="flex items-center no-underline">
                            <span className="sr-only">ADA Handle</span>
                            <Logo />
                        </h1></a>
                    </Link>

                    <div className="flex items-center justify-center ml-auto relative">
                        <nav>
                            <Link
                                className={'block text-dark-300 hover:text-primary-200 no-underline mt-0 text-dark-400'}
                                href={`https://${mainDomain}/mint`}
                            >
                                <a> Get a Handle! &rarr;</a>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;