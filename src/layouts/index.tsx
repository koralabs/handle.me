import React, { FC, useEffect, useState } from "react";

import Header from "../components/header";
import Form from '../components/mailchimp';

import '../styles/global.css';

const Layout: FC = ({ children }): JSX.Element => {
  const [mintPage, setMintPage] = useState<boolean>(false);

  useEffect(() => {
    setMintPage(window.location.pathname.includes('mint'));
  });

  return (
    <>
      <Header showMint={!mintPage} className="bg-dark-100 text-dark-400 text-gray-900" />
      <div className="flex flex-col min-h-screen font-sans bg-dark-100 text-dark-400 text-gray-900 overflow-hidden">

        <main className="w-full px-4 pt-8 mx-auto md:px-8 md:pt-16">
          {children}
        </main>

        {'undefined' !== typeof window && window.location.pathname !== '/mint' && (
          <div className="bg-dark-200 py-16">
            <div className="max-w-5xl mx-auto text-center">
              <h4 className="mb-8 text-white font-bold text-3xl">Never Miss an Update</h4>
              <Form />
            </div>
          </div>
        )}

        <footer className="bg-dark-100 pt-16">
          <nav className="flex justify-center max-w-4xl p-4 mx-auto text-sm md:p-8">
            <p className="text-white">
              Created with ❤️ by{` `}
              <a
                className="font-bold underline"
                href="https://twitter.com/CryptosCalvin"
                target="_blank"
                rel="noopener noreferrer"
              >
                @CryptosCalvin
              </a> and{` `}
              <a
                className="font-bold underline"
                href="https://twitter.com/conraddit"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Conrad
              </a>
            </p>
          </nav>
          <div id="mailchimp" className="px-8 py-4 max-w-2xl mx-auto mt-2 text-white text-xs text-center">
            <p>* We currently use Mailchimp as our marketing platform. By choosing to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. <a href="https://mailchimp.com/legal/" className="underline" target="_blank noreferrer">Learn more about Mailchimp's privacy practices here.</a></p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
