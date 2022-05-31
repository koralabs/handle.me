import { ALBEvent, ALBResult, Context } from 'aws-lambda';
import { HEADER_HANDLE, HEADER_JWT_ALL_SESSIONS_TOKEN } from '../../lib/constants';
import { fetchNodeApp } from '../../lib/fetchNodeApp';

export interface LookupResponseBody {
    error: boolean;
    message?: string;
    address: string | null;
    assetName: string | null;
    isShellyAddress: boolean;
    quantity: string | null;
}

export class LookupAddressHandler {
    static async handler(event: ALBEvent, context: Context): Promise<ALBResult> {
        const { headers } = event;

        if (!headers) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: true,
                    message: 'Missing headers.'
                } as LookupResponseBody)
            };
        }

        const handle = headers[HEADER_HANDLE];
        if (!handle) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: true,
                    message: 'Missing handle name.'
                } as LookupResponseBody)
            };
        }
        const res: LookupResponseBody = await fetchNodeApp('lookupAddress', {
            method: 'GET',
            headers: {
                [HEADER_HANDLE]: handle,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log('RESSSSSS', JSON.stringify(res));
                return res.json();
            })
            .catch((e) => console.log(e));

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        };
    }
}
