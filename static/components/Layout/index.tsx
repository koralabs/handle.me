import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import { usePolicyID } from "../../hooks/usePolicyId";
import Header from "../Header";

interface Props {
    pageTitle: string;
    children?: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<Props> = ({ pageTitle, children }) => {
    const [mintPage, setMintPage] = useState<boolean>(false);
    const policyID = usePolicyID();

    useEffect(() => {
        setMintPage(window.location.pathname.includes('mint'));
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
            </Head>
            <Header showMint={!mintPage} className="bg-dark-100 text-dark-400 text-gray-900" />
            <div className="flex flex-col min-h-screen font-sans bg-dark-100 text-dark-400 text-gray-900 overflow-hidden">

                <main className="w-full px-4 pt-12 mx-auto md:px-8 md:pt-16">
                    {children}
                </main>

                <footer className="bg-dark-100 pt-16 text-dark-350 text-center">
                    &copy; ADA Handle • {policyID}
                </footer>
            </div>
        </>
    );
}