import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MAX_SESSION_LENGTH } from "../constants";

import { getAccessTokenFromCookie } from "../helpers/session";

export const useAccessOpen = (): [
  boolean | null,
  Dispatch<SetStateAction<boolean>>
] => {
  const [accessOpen, setAccessOpen] = useState<boolean>(null);

  useEffect(() => {
    const updateAccess = () => {
      const accessToken = getAccessTokenFromCookie();

      if (accessToken) {
        setAccessOpen(true);
      } else {
        setAccessOpen(false);
      }
    }

    updateAccess();
    const interval = setInterval(updateAccess, MAX_SESSION_LENGTH);

    return () => clearInterval(interval);
  }, []);

  return [accessOpen, setAccessOpen];
}
