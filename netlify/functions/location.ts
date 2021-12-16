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
  assetName: string | null;
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
    const assetName = Buffer.from(handle).toString('hex');
    console.log(`https://cardano-${process.env.CARDANO_CONTEXT}.blockfrost.io/api/v0/assets/${process.env.POLICY_ID}${assetName}/addresses`);
    const data = await fetch(
      `https://${slug}.blockfrost.io/api/v0/assets/${process.env.POLICY_ID}${assetName}/addresses`,
      {
        headers: {
          project_id: process.env.BLOCKFROST_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json());

    return {
      statusCode: 200,
      body: JSON.stringify({
        error: 404 === data?.status_code,
        ...data[0],
        assetName
      }),
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
