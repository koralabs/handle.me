import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check';
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { ref, getDatabase as getFirebaseDatabase } from 'firebase/database';
import { RECAPTCHA_SITE_KEY } from './constants';

// export const config: FirebaseOptions = {
//   apiKey: "AIzaSyAjLfhecwnZJyl-lv8FdXasQZGmYEEJ-wc",
//   authDomain: "ada-handle-reserve.firebaseapp.com",
//   databaseURL: "https://ada-handle-reserve-default-rtdb.firebaseio.com",
//   projectId: "ada-handle-reserve",
//   storageBucket: "ada-handle-reserve.appspot.com",
//   messagingSenderId: "995478242710",
//   appId: "1:995478242710:web:7b01129b47c6e82e1e49b7"
// }

export const getPendingSessionsRef = () => {
  const database = getFirebaseDatabase();
  const dbRef = ref(database, '/pendingSessions');
  return dbRef;
}

export const getReservedHandlesRef = () => {
  const database = getFirebaseDatabase();
  const dbRef = ref(database, '/reservedHandles');
  return dbRef;
}

export const getMintedHandlesRef = () => {
  const database = getFirebaseDatabase();
  const dbRef = ref(database, '/mintedHandles');
  return dbRef;
}
