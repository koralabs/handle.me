import { useEffect, useState } from "react";
import { useIsProduction } from "./useIsProduction";

export const useMainDomain = (): string => {
    const [mainDomain, setMainDomain] = useState<string>('testnet.adahandle.com');
    const isProduction = useIsProduction();

    useEffect(() => {
        setMainDomain(isProduction ? 'adahandle.com' : 'testnet.adahandle.com');
    }, [isProduction]);

    return mainDomain;
}