import { useEffect, useState } from "react";

export const useSSR = () => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(typeof window === undefined);
  }, []);

  return isSSR;
};

export const useIsProduction = (): boolean => {
  const [isProduction, setIsProduction] = useState<boolean>(true);

  useEffect(() => {
    if (
      window.location.hostname.includes('testnet') ||
      window.location.hostname.includes('localhost')
    ) {
      setIsProduction(false);
    }
  }, []);

  return isProduction;
}

export const useMainDomain = (): string => {
  const [mainDomain, setMainDomain] = useState<string>('testnet.adahandle.me');
  const isProduction = useIsProduction();

  useEffect(() => {
    setMainDomain(isProduction ? 'adahandle.com' : 'testnet.adahandle.com');
  }, [isProduction]);

  return mainDomain;
}

export const useCardanoscanDomain = (): string => {
  const [cardanoscanDomain, setCardanoscanDomain] = useState<string>('testnet.cardanoscan.io');
  const isProduction = useIsProduction();

  useEffect(() => {
    setCardanoscanDomain(isProduction ? 'cardanoscan.io' : 'testnet.cardanoscan.io');
  }, [isProduction]);

  return cardanoscanDomain;
}

export const usePolicyID = (): string => {
  const [policyID, setPolicyID] = useState<string>('8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3');
  const isProduction = useIsProduction();

  useEffect(() => {
    setPolicyID(isProduction ? 'd5df2ddadd04b98215f7c3ea94fd9ab8194968f94d9d32377fd26a7c' : '8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3');
  }, [isProduction]);

  return policyID;
}
