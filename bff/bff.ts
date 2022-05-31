import { ALBEvent, ALBEventHeaders, ALBResult, Context } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
import { LookupAddressHandler } from './handlers/lookupAddress';

const runHandler = async (event: ALBEvent, context: Context): Promise<ALBResult> => {
    try {
        const lowerCaseHeaders = Object.entries(event.headers ?? []).reduce<ALBEventHeaders>((acc, [key, value]) => {
            acc[key.toLowerCase()] = value;
            return acc;
        }, {} as ALBEventHeaders);

        if (event.httpMethod == 'OPTIONS') {
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                statusCode: 200,
                body: ''
            };
        }

        event.headers = lowerCaseHeaders;
        const s3 = new AWS.S3();

        const { host } = lowerCaseHeaders;

        // If this isn't a BFF request, let's try to serve it out of the host bucket
        if (!host?.includes('bff.') && !host?.includes('localhost')) {
            let file = decodeURI(event.path);
            if (file == '/') {
                file = '/index.html';
            }
            // if (event.path == '/favicon.ico') {
            //     file = '/favicon.ico';
            // }
            const htmlEx = /^\/[a-zA-Z0-9\-_]+\.html$/;
            if (file.match(htmlEx)) {
                file = `/assets/${process.env.VERSION_HASH}/html${file}`;
            } else {
                file = `/assets/${process.env.VERSION_HASH}/html/[handle].html`;
            }

            file = file.substring(1);

            const s3 = new AWS.S3();

            return await new Promise((success, reject) => {
                s3.getObject({ Bucket: 'handle.me', Key: file || '' }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    success(data);
                });
            })
                .then((data: any) => {
                    return {
                        statusCode: 200,
                        headers: { 'Content-Type': mime.lookup(file || '') },
                        body: data.Body?.toString('base64'),
                        isBase64Encoded: true
                    };
                })
                .catch((err) => {
                    return {
                        statusCode: 500,
                        body: err,
                        isBase64Encoded: false
                    };
                });
        }

        const routes = [{ path: '/lookupAddress', method: 'GET', handler: LookupAddressHandler }];

        const route = routes.find((route) => route.path === event.path);
        if (route) {
            const response = await route.handler.handler(event, context);
            response['headers'] = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            };
            return response;
        }

        return {
            statusCode: 404,
            body: JSON.stringify({
                message: `Path ${event.path} not found`
            })
        };
    } catch (error) {
        console.error(JSON.stringify(error));
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error occurred'
            })
        };
    }
};

export const lambdaHandler = async (event: ALBEvent, context: Context): Promise<ALBResult> => {
    const result = await runHandler(event, context);
    return result;
};
