export const MAX_SESSION_LENGTH = 600000; // 10 minutes
export const MAX_SESSION_LENGTH_SPO = 3600000; // 24 hours
export const MAX_ACCESS_LENGTH = 1800000; // 30 minutes
export const MAX_ACCESS_LENGTH_SPO = 3600000; // 24 hours
export const STATE_INTERVAL = 60000 // 1 Minute
export const MAX_CHAIN_LOAD = 0.8;
export const RECAPTCHA_SITE_KEY = '6Ld0QUkcAAAAAN-_KvCv8R_qke8OYxotNJzIg2RP';
export const RECAPTCHA_SITE_KEY_FALLBACK = '6LejHmcdAAAAAG2537Bd-_uM2f-hazWd-Q8rFO_L';
export const MAX_TOTAL_SESSIONS = 3;
export const SPO_MAX_TOTAL_SESSIONS = 1;

// Keys
export const COOKIE_SESSION_PREFIX = 'CURRENT_HANDLE_SESSION';
export const COOKIE_ACCESS_KEY = 'ADAHANDLE_HAS_ACCESS';

export const COOKIE_ALL_SESSIONS_KEY = 'ADAHANDLE_ALL_SESSIONS';

export const SPO_COOKIE_SESSION_PREFIX = 'SPO_CURRENT_HANDLE_SESSION';
export const SPO_COOKIE_ACCESS_KEY = 'SPO_ADAHANDLE_HAS_ACCESS';

// Headers.
export const HEADER_HANDLE = 'x-handle';
export const HEADER_HANDLE_COST = 'x-handle-cost';
export const HEADER_IS_SPO = 'x-is-spo';
export const HEADER_RECAPTCHA = 'x-recaptcha';
export const HEADER_RECAPTCHA_FALLBACK = 'x-recaptcha-fallback';
export const HEADER_TWITTER_ACCESS_TOKEN = 'x-twitter-token';
export const HEADER_ID_TOKEN = 'x-id-token';
export const TWITTER_UNLOCK_HEADER = 'x-twitter-credentials';
export const HEADER_EMAIL = 'x-email';
export const HEADER_EMAIL_AUTH = 'x-email-authcode';
export const HEADER_PASSWORD_PROTECTION = 'x-password-protection';

export const HEADER_JWT_ACCESS_TOKEN = 'x-access-token';
export const HEADER_JWT_SESSION_TOKEN = 'x-session-token';

export const HEADER_JWT_SPO_ACCESS_TOKEN = 'x-spo-access-token';
export const HEADER_JWT_SPO_SESSION_TOKEN = 'x-spo-session-token';
export const HEADER_JWT_ALL_SESSIONS_TOKEN = 'x-all-sessions-token';
export const HEADER_ALL_SESSIONS = 'x-all-sessions';

export const HEADER_CLIENT_IP = 'x-nf-client-connection-ip';
export const REFUND_POLICY_DATE = '14 days';
export const BASIC_ERROR_TEXT = "Error occurred. We're looking into the issue."

export const API_ENDPOINT = 'https://adahandle.com/.netlify/functions';

/**
 * a-z
 * 0-9
 * _
 * -
 * .
 */
export const ALLOWED_CHAR = new RegExp(/^[a-zA-Z|0-9|\-|\_|\.]*$/g);

/**
 * Must match all:
 * - 4 characters or more
 */
export const BETA_PHASE_MATCH: RegExp = new RegExp(/.{2,}/g);
