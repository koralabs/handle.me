import { useEffect, useState } from "react";
import { useIsProduction } from "./useIsProduction";

export const useCardanoscanDomain = (): string => {
    const [cardanoscanDomain, setCardanoscanDomain] = useState<string>('testnet.cardanoscan.io');
    const isProduction = useIsProduction();

    useEffect(() => {
        setCardanoscanDomain(isProduction ? 'cardanoscan.io' : 'testnet.cardanoscan.io');
    }, [isProduction]);

    return cardanoscanDomain;
}