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
              Almost...
            </h2>
            <div className="col-span-6 col-start-4 mb-2">
              <p className="text-lg">We're putting the final touches on this feature. Please check back later.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndexPage;
