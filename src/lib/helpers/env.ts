export const isSSR = () => typeof window === undefined;

export const isProduction = (): boolean => {
  if (isSSR()) {
    return;
  }

  if (
    window.location.hostname.includes('testnet') ||
    window.location.hostname.includes('localhost')
  ) {
    return false;
  }

  return true;
}

export const getMainDomain = (): string => {
  if (isSSR()) {
    return;
  }

  return isProduction()
    ? 'adahandle.com'
    : 'testnet.adahandle.com';
}

export const getCardanoscanDomain = (): string => {
  if (isSSR()) {
    return;
  }

  return isProduction()
    ? `https://cardanoscan.io`
    : `https://testnet.cardanoscan.io`;
}

export const getPolicyID = (): string => {
  if (isSSR()) {
    return;
  }

  console.log(isProduction());

  return isProduction()
    ? 'd5df2ddadd04b98215f7c3ea94fd9ab8194968f94d9d32377fd26a7c'
    : '8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3';
}
