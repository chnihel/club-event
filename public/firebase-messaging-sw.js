importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyDhhFUEGmzN-q80r2ZauMEZTFsEGSXRf-c",
    authDomain: "ppfe-3192e.firebaseapp.com",
    projectId: "ppfe-3192e",
    storageBucket: "ppfe-3192e.firebasestorage.app",
    messagingSenderId: "710036206940",
    appId: "1:710036206940:web:98d602046771910f517d99",

  };

  firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Notification en arrière-plan :", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});