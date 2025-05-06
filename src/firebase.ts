import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyDhhFUEGmzN-q80r2ZauMEZTFsEGSXRf-c",
    authDomain: "ppfe-3192e.firebaseapp.com",
    projectId: "ppfe-3192e",
    storageBucket: "ppfe-3192e.firebasestorage.app",
    messagingSenderId: "710036206940",
    appId: "1:710036206940:web:98d602046771910f517d99",
    measurementId: "G-S7VVW5418N",
    vapidKey:"BJzhpVNmWavuTpJKPCU-OLtISJhI0M8wKtbK7yhYxKiFc_2o3A2mkNo2J78Yd_XQHRR7BtAqujF1PWm-EWdVVZs"
  };

  

const app =initializeApp(firebaseConfig);
const messaging = app ? getMessaging(app) : null;

export const requestFCMToken = async () => {
  if (!messaging) return;

  try {
    const token = await getToken(messaging, {
      vapidKey: "BJzhpVNmWavuTpJKPCU-OLtISJhI0M8wKtbK7yhYxKiFc_2o3A2mkNo2J78Yd_XQHRR7BtAqujF1PWm-EWdVVZs",
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { messaging,getToken };