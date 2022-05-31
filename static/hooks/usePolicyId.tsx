import { useEffect, useState } from "react";
import { useIsProduction } from "./useIsProduction";

export const usePolicyID = (): string => {
    const [policyID, setPolicyID] = useState<string>('');
    const isProduction = useIsProduction();

    useEffect(() => {
        setPolicyID(isProduction ? 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a' : '8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3');
    }, [isProduction]);

    return policyID;
}