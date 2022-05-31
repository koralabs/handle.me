import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import "buffer";

import { HEADER_HANDLE, REACT_APP_MINTING_API_DOMAIN } from "../lib/constants";
import { isValid } from "../lib/helpers/nfts";
import { Layout } from '../components/Layout';
import { useMainDomain } from '../hooks/useMainDomain';
import { usePolicyID } from '../hooks/usePolicyId';
import Button from '../components/Button';
import { useCardanoscanDomain } from '../hooks/useCardanoscanDomain';
import { LogoMark } from '../components/Header/logo';

interface FingerprintData {
    assetName: string | null;
}

export interface LookupResponseBody {
    error: boolean;
    message?: string;
    address: string | null;
    assetName: string | null;
    isShellyAddress: boolean;
    quantity: string | null;
}


const HandlePage: NextPage = () => {
    const router = useRouter()
    const { handle } = router.query

    const [loading, setIsLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>("");
    const [fingerprintData, setFingerprintData] = useState<FingerprintData | null>(null);
    const [validHandle, setValidHandle] = useState<boolean | null>(null);
    const [copying, setCopying] = useState<boolean>(false);
    const [isShellyAddress, setIsShellyAddress] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const mainDomain = useMainDomain();
    const policyID = usePolicyID();
    const cardanoscanDomain = useCardanoscanDomain();

    useEffect(() => {
        if (validHandle) {
            return;
        }

        if (handle && !Array.isArray(handle) && isValid(handle)) {
            setValidHandle(true);
        } else {
            setValidHandle(false);
        }
    }, [handle, validHandle]);

    useEffect(() => {
        if (!handle || address || !validHandle) {
            return;
        }

        setIsLoading(true);
        const loadAddress = async () => {
            await fetch(`${REACT_APP_MINTING_API_DOMAIN}/lookupAddress`, {
                headers: {
                    [HEADER_HANDLE]: handle as string,
                },
            })
                .then(async (res) => {
                    const data: LookupResponseBody = await res.json();
                    if (data.error) {
                        setAddress(null);
                        setErrorMessage(data.message ?? '');
                        return;
                    }

                    setIsShellyAddress(data.isShellyAddress);
                    setAddress(data.address);
                    setFingerprintData({
                        assetName: data.assetName,
                    });
                    setIsLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                    setErrorMessage(e.message);
                    setAddress(null);
                    setIsLoading(false);
                });
        };

        loadAddress();
    }, [address, handle, setIsLoading, validHandle]);

    const handleCopy = async () => {
        navigator.clipboard.writeText(address as string);
        setCopying(true);
        setTimeout(() => {
            setCopying(false);
        }, 1000);
    };

    const renderDisplay = () => {
        if (errorMessage) {
            return (
                <div>
                    <hr className="w-12 border-dark-300 border-2 block my-8" />
                    <div
                        style={{ backgroundColor: "#a94848" }}
                        className=" text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 border-l-4 p-4"
                        role="error"
                    >
                        <p className="font-bold">Error</p>
                        <p>{errorMessage}</p>
                    </div>
                </div>
            );
        }

        if (address == null) {
            return (
                <>
                    <hr className="w-12 border-dark-300 border-2 block my-8" />
                    {message ? (
                        <h3>{message}</h3>
                    ) : (
                        <>
                            <h3>This Handle isn&lsquo;t Minted!</h3>
                            <Button
                                className="w-full mt-4"
                                href={`https://${mainDomain}/mint`}
                            >
                                Purchase Now &rarr;
                            </Button>
                        </>
                    )}
                </>
            );
        }

        return (
            <>
                <div className="relative">
                    <div
                        className={`focus:ring-0 focus:ring-opacity-0 border-2 focus:border-white outline-none form-input bg-dark-100 border-dark-300 rounded-lg px-6 py-4 text-lg text-dark-300 w-full overflow-hidden`}
                    >
                        {loading && "Loading..."}
                        {!loading && "string" === typeof address && (
                            <span style={{ transform: "translateX(-100%)" }}>
                                {address.substr(0, 10)}...
                                {address.substr(address.length - 5)}
                            </span>
                        )}
                        <button
                            onClick={handleCopy}
                            disabled={!address || !validHandle || loading}
                            className={`absolute top-0 right-0 h-full w-16 rounded-r-lg ${copying ? "bg-primary-200" : "bg-primary-100"
                                }`}
                        >
                            <svg
                                className={`w-full height-full p-5 ${copying ? "hidden" : "block"
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
                                className={`w-full height-full p-5 ${copying ? "block" : "hidden"
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
                {isShellyAddress ? (
                    <></>
                ) : (
                    <div>
                        <hr className="w-12 border-dark-300 border-2 block my-8" />
                        <div
                            style={{ backgroundColor: "#bd8a45" }}
                            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                            role="alert"
                        >
                            <p className="font-bold">Warning</p>
                            <p>
                                Address does not appear to be a Shelly Wallet Address. If
                                address is a smart contract, it&lsquo;s possible that any ADA sent
                                might be lost.
                            </p>
                        </div>
                    </div>
                )}
                {fingerprintData && (
                    <p>
                        <a
                            target="_blank"
                            rel="noopener nofollow noreferrer"
                            className="text-primary-100 mt-4 text-sm block"
                            href={`https://${cardanoscanDomain}/token/${policyID}.${fingerprintData.assetName}?tab=topholders`}
                        >
                            Verify on Cardanoscan &rarr;
                        </a>
                    </p>
                )}
            </>
        );
    };

    return (
        <Layout pageTitle={`$${handle}`}>
            <section id="top" className="z-0 md:max-w-xl mx-auto relative">
                <div className="grid grid-cols-12">
                    <p className="text-center w-full absolute">
                        <button
                            className="mb-4 transform -translate-y-12"
                            onClick={() => Router.push("/")}
                        >
                            &larr; Search
                        </button>
                    </p>
                    <div className="col-span-12 md:col-span-8 md:col-start-3 gap-4 bg-dark-200 rounded-lg shadow-lg place-content-start p-4 lg:p-8 mb-16">
                        <h2 className="text-4xl font-bold mb-8 text-center">
                            Send a Payment
                        </h2>
                        <div className="relative col-span-6 col-start-4 mb-2">
                            <LogoMark className="absolute h-full left-0 top-0 px-6 py-4 opacity-10" />
                            <div
                                className={`focus:ring-0 focus:ring-opacity-0 outline-none form-input bg-dark-100 border-dark-300 rounded-lg pr-6 pl-16 py-4 text-3xl w-full`}
                            >
                                {handle}
                            </div>
                        </div>
                        <div className="col-span-6 col-start-4 mb-2">{renderDisplay()}</div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default HandlePage;