import {
  Handler,
  HandlerEvent,
  HandlerContext,
  HandlerResponse,
} from "@netlify/functions";
import { fetch } from 'cross-fetch';

import { HEADER_HANDLE } from "../../src/lib/constants";

export interface LookupResponseBody {
  error: boolean;
  message?: string;
  address: string | null;
  policyId: string | null;
  assetName: string | null;
}

const getNodeEndpointUrl = () => process.env.NODEJS_APP_ENDPOINT;

const fetchNodeApp = async (
  endpoint: string,
  params: any = {}
): Promise<Response> => {
  const token = Buffer.from(
    `${process.env.NODEJS_APP_USERNAME}:${process.env.NODEJS_APP_PASSWORD}`
  ).toString('base64');

  const { headers, ...rest } = params;

  return fetch(
    `${getNodeEndpointUrl()}${endpoint}`,
    {
      headers: {
        'Authorization': `Basic ${token}`,
        ...headers || {},
        ...rest || {}
      }
    }
  )
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
    const data: LookupResponseBody = await fetchNodeApp(`/location`, {
      method: 'GET',
      headers: {
        [HEADER_HANDLE]: handle
      }
    }).then(res => res.json());

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
