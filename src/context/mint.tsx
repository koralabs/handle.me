import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import { SessionResponseBody } from "../../netlify/functions/session";

import { HandleResponseBody } from "../lib/helpers/search";

export interface ReservedHandlesType {
  blacklist: string[],
  twitter: string[];
  manual: string[];
  spos: string[];
}

export interface ActiveSessionType {
  phoneNumber: string;
  cost: number;
  handle: string;
  start: number;
  walletIndex: number;
  paymentAddress: string;
  txId?: string;
}

interface PaymentSession {
  sessionResponse: SessionResponseBody;
}

export interface HandleMintContextType {
  handle: string;
  handleResponse: HandleResponseBody;
  fetching: boolean;
  setFetching: Dispatch<SetStateAction<boolean>>;
  twitterToken: string;
  setHandle: Dispatch<SetStateAction<string>>;
  reservedHandles: ReservedHandlesType;
  pendingSessions: string[];
  paymentSessions: PaymentSession[];
  currentIndex: number;
  primed: boolean;
  isPurchasing: boolean;
  setPrimed: Dispatch<SetStateAction<boolean>>;
  setReservedHandles: Dispatch<SetStateAction<ReservedHandlesType>>;
  setHandleResponse: Dispatch<SetStateAction<HandleResponseBody>>;
  setTwitterToken: Dispatch<SetStateAction<string>>;
  setIsPurchasing: Dispatch<SetStateAction<boolean>>;
  setPendingSessions: Dispatch<SetStateAction<string[]>>;
  setPaymentSessions: Dispatch<SetStateAction<PaymentSession[]>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export const defaultState: HandleMintContextType = {
  handle: "",
  fetching: false,
  handleResponse: null,
  isPurchasing: false,
  reservedHandles: null,
  pendingSessions: [],
  paymentSessions: [],
  twitterToken: null,
  primed: false,
  currentIndex: 0,
  setHandleResponse: () => {},
  setFetching: () => {},
  setHandle: () => {},
  setIsPurchasing: () => {},
  setReservedHandles: () => {},
  setTwitterToken: () => {},
  setPrimed: () => {},
  setPendingSessions: () => {},
  setPaymentSessions: () => {},
  setCurrentIndex: () => {}
};

export const HandleMintContext =
  createContext<HandleMintContextType>(defaultState);

export const HandleMintContextProvider = ({ children, ...rest }) => {
  const [handle, setHandle] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [handleResponse, setHandleResponse] = useState<HandleResponseBody|null>(null);
  const [twitterToken, setTwitterToken] = useState<string|null>(null);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [reservedHandles, setReservedHandles] = useState<ReservedHandlesType|null>(null);
  const [pendingSessions, setPendingSessions] = useState<string[]>(null);
  const [paymentSessions, setPaymentSessions] = useState<PaymentSession[]>([]);
  const [primed, setPrimed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <HandleMintContext.Provider value={{
      ...defaultState,
      fetching,
      handle,
      handleResponse,
      twitterToken,
      isPurchasing,
      reservedHandles,
      pendingSessions,
      paymentSessions,
      currentIndex,
      primed,
      setFetching,
      setHandle,
      setHandleResponse,
      setTwitterToken,
      setIsPurchasing,
      setReservedHandles,
      setPrimed,
      setPendingSessions,
      setPaymentSessions,
      setCurrentIndex
    }}>
      {children}
    </HandleMintContext.Provider>
  )
}
