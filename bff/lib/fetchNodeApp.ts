import { fetch } from 'cross-fetch';

export const fetchNodeApp = async <T>(endpoint: string, params: any = {}): Promise<Response> => {
    const token = Buffer.from(`${process.env.NODEJS_APP_USERNAME}:${process.env.NODEJS_APP_PASSWORD}`).toString(
        'base64'
    );

    const { headers, ...rest } = params;
    const baseUrl = process.env.NODEJS_APP_ENDPOINT;
    const url = `${baseUrl}/${endpoint}`;

    console.log('URLLLLLL', url);

    return fetch(url, {
        headers: {
            Authorization: `Basic ${token}`,
            ...headers
        },
        ...rest
    });
};
