import React, { useState } from "react";
import { navigate } from "gatsby-link";

import SEO from "../components/seo";
import LogoMark from "../images/logo-single.svg";
import { Button } from '../components/button';
import { isValid } from '../lib/helpers/nfts';

function IndexPage() {
  const [handle, setHandle] = useState<string>('');

  const onChange = (e) => {
    const newHandle = e.target.value;
    const valid = isValid(newHandle);
    if (!valid && 0 === handle.length) {
      return;
    }

    if (valid) {
      const newHandle = e.target.value;
      setHandle(newHandle.toLowerCase());
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid(handle)) {
      return;
    }

    navigate(`/${handle}`);
  }

  return (
    <>
      <SEO title="Home" />
      <section className="z-0 md:max-w-xl mx-auto relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 gap-4 bg-dark-200 rounded-lg shadow-lg place-content-start p-4 lg:p-8 mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Lookup a Handle
            </h2>
            <div className="col-span-6 col-start-4 mb-2">
              <form onSubmit={onSubmit}>
                <div className={`relative`}>
                  <img
                    src={LogoMark}
                    className="absolute h-full left-0 top-0 px-6 py-4 opacity-10"
                  />
                  <input
                    onChange={onChange}
                    className="focus:ring-0 focus:ring-opacity-0 border-2 focus:border-white outline-none form-input bg-dark-100 border-dark-300 rounded-lg pr-6 pl-16 py-4 text-xl w-full overflow-hidden"
                    value={handle}
                    placeholder="Search for a handle..."
                  />
                </div>
                <Button disabled={!isValid(handle) || handle.length === 0} className="w-full mt-4">Search!</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndexPage;
