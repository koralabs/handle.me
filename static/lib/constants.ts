export const HEADER_HANDLE = 'x-handle';

export const REACT_APP_MINTING_API_DOMAIN = process.env.NEXT_PUBLIC_MINTING_API_DOMAIN;

/**
 * a-z
 * 0-9
 * _
 * -
 * .
 */
export const ALLOWED_CHAR = new RegExp(/^[a-zA-Z|0-9|\-|\_|\.]*$/g);
