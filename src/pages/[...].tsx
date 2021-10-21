import React, { useEffect, useState } from "react";
import SEO from "../components/seo";

import LogoMark from "../images/logo-single.svg";

function IndexPage({ params }) {
  const route = params["*"];
  const paths = route.split("/");
  const [loading, setIsLoading] = useState<boolean>(true);
  const [handle, setHandle] = useState<string>(null);
  const [address, setAddress] = useState<string>(null);
  const [validHandle, setValidHandle] = useState<boolean>(null);
  const [copying, setCopying] = useState<boolean>(false);

  useEffect(() => {
    if (paths.length > 1) {
      setValidHandle(false);
    } else {
      setHandle(paths[0]);
    }
  }, [handle, validHandle, setIsLoading, paths]);

  const handleCopy = async () => {
    navigator.clipboard.writeText(address);
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
    }, 1000);
  };

  return (
    <>
      <SEO title="Home" />

      <section id="top" className="z-0 max-w-xl mx-auto relative">
        <div className="grid grid-cols-12">
          <div className="col-span-8 col-start-3 gap-4 bg-dark-200 rounded-lg shadow-lg place-content-start p2 lg:p-8 mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Send a Payment
            </h2>
            <div className="relative col-span-6 col-start-4 mb-2">
              <img
                src={LogoMark}
                className="absolute h-full left-0 top-0 px-6 py-4 opacity-10"
              />
              <div
                className={`focus:ring-0 focus:ring-opacity-0 border-2 focus:border-white outline-none form-input bg-dark-100 border-dark-300 rounded-lg pr-6 pl-16 py-4 text-3xl w-full`}
              >
                {handle}
              </div>
            </div>
            <div className="relative col-span-6 col-start-4 mb-2">
              <div
                className={`focus:ring-0 focus:ring-opacity-0 border-2 focus:border-white outline-none form-input bg-dark-100 border-dark-300 rounded-lg px-6 py-4 text-lg text-dark-300 w-full`}
              >
                {loading ? "Loading..." : address}
                <button
                  disabled={loading}
                  onClick={handleCopy}
                  className="absolute top-0 right-0 h-full w-16 bg-primary-100 rounded-r-lg hover:bg-primary-200"
                >
                  <svg
                    className={`w-full height-full p-5 ${
                      copying ? "hidden" : "block"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#fff"
                      d="M18.783 13.198H15.73a.78.78 0 010-1.559h2.273V3.652H7.852v.922c0 .433-.349.78-.78.78a.778.778 0 01-.78-.78V2.872c0-.43.349-.78.78-.78h11.711c.431 0 .78.35.78.78v9.546a.781.781 0 01-.78.78z"
                    />
                    <path
                      fill="#fff"
                      d="M12.927 17.908H1.217a.781.781 0 01-.78-.78V7.581c0-.43.349-.78.78-.78h11.709c.431 0 .78.35.78.78v9.546c0 .43-.349.781-.779.781zm-10.93-1.56h10.15V8.361H1.997v7.987z"
                    />
                  </svg>

                  <svg
                    className={`w-full height-full p-5 ${
                      copying ? "block" : "hidden"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#fff"
                      d="M7.197 16.963h-.002a.773.773 0 01-.544-.227L.612 10.654a.769.769 0 011.09-1.084l5.495 5.536L18.221 4.083a.767.767 0 011.087 0c.301.3.301.787 0 1.087L7.741 16.738a.772.772 0 01-.544.225z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndexPage;