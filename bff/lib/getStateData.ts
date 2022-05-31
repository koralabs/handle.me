import { fetchNodeApp } from "./fetchNodeApp";
import { StateData } from "./Responses";

export const getStateData = async (): Promise<StateData> => {
    const res = await fetchNodeApp('stateData', {
        method: 'GET',
    }).then(res => {
        return res.json();
    });

    const {
        chainLoad,
        totalHandles,
        spoPageEnabled,
        accessWindowTimeoutMinutes,
        paymentWindowTimeoutMinutes,
        accessQueueSize,
        dynamicPricingEnabled,
        mintingPageEnabled,
        handlePrices
    } = res;

    const stateResponse: StateData = {
        chainLoad,
        totalHandles,
        spoPageEnabled,
        accessWindowTimeoutMinutes,
        paymentWindowTimeoutMinutes,
        accessQueueSize,
        dynamicPricingEnabled,
        mintingPageEnabled,
        handlePrices
    }

    return stateResponse;
}