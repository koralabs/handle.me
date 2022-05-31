import { useEffect, useState } from "react";

export const useIsProduction = (): boolean => {
    const [isProduction, setIsProduction] = useState<boolean>(false);

    useEffect(() => {
        if (window.location.hostname === 'handle.me') {
            setIsProduction(true);
        }
    }, []);

    return isProduction;
}