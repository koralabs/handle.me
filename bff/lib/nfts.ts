import { ALLOWED_CHAR } from './constants';

export const isValid = (handle: string) => handle.match(ALLOWED_CHAR) && handle.length <= 15;

export const normalizeNFTHandle = (handle: string): string => handle.toLowerCase();

export const isNumeric = (n: string) => {
    return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};
