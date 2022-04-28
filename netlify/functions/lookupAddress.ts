import {
    Handler,
    HandlerEvent,
    HandlerContext,
    HandlerResponse,
} from "@netlify/functions";

import { HEADER_HANDLE } from "../../src/lib/constants";
import { fetchNodeApp } from "../helpers/util";

export interface LookupResponseBody {
    error: boolean;
    message?: string;
    address: string | null;
    assetName: string | null;
    isShellyAddress: boolean;
    quantity: string | null;
}

const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
): Promise<HandlerResponse> => {
    const { headers } = event;

    const handle = headers[HEADER_HANDLE];
    if (!handle) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: true,
                message: 'Missing handle name.'
            } as LookupResponseBody)
        }
    }

    try {
        const data: LookupResponseBody = await fetchNodeApp('lookupAddress', {
            method: 'GET',
            headers: {
                [HEADER_HANDLE]: handle,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .catch(e => console.log(e));

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: true,
                message: e.toString()
            } as LookupResponseBody)
        };
    }
};

export { handler };
