import { useEffect, useState } from "react";

export const useSSR = () => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(typeof window === undefined);
  }, []);

  return isSSR;
};

export const useIsProduction = (): boolean => {
  const [isProduction, setIsProduction] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.hostname === 'handle.me') {
      setIsProduction(true);
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
  const [policyID, setPolicyID] = useState<string>('');
  const isProduction = useIsProduction();

  useEffect(() => {
    setPolicyID(isProduction ? 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a' : '8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3');
  }, [isProduction]);

  return policyID;
}
