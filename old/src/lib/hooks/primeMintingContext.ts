import { getApp } from 'firebase/app';
import { get, onValue } from 'firebase/database'
import { useContext, useEffect } from 'react';

import { HandleMintContext } from '../../context/mint';
import { getReservedHandlesRef, getPendingSessionsRef } from '../firebase';

export const usePrimeMintingContext = async () => {
  const { setReservedHandles, setPendingSessions, setPrimed } = useContext(HandleMintContext);

  useEffect(() => {
    (async () => {
      fetch('/.netlify/functions/queue').catch();
      fetch('/.netlify/functions/verify').catch();

      // Retrieve reserved handle data store.
      const reservedHandlesRef = getReservedHandlesRef();
      const reservedHandlesRes = await get(reservedHandlesRef).then(res => res.val());
      reservedHandlesRes && setReservedHandles(reservedHandlesRes);

      setPrimed(true);
    })();

    // Stay in sync with active sessions by subscribing.
    const pendingSessionsRef = getPendingSessionsRef();
    const unsubscribePending = onValue(pendingSessionsRef, (snapshot) => {
      if (!snapshot) {
        return;
      }

      setPendingSessions(snapshot.val());
    });

    return () => unsubscribePending();
  }, []);
}
