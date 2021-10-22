// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyBdQus3_uV79h9jNrK8ns0COt1mg0DoCYM",
  authDomain: "enigma-8.firebaseapp.com",
  projectId: "enigma-8",
  storageBucket: "enigma-8.appspot.com",
  messagingSenderId: "485828193401",
  appId: "1:485828193401:web:0b7b438c2ff367f58a38a8",
  measurementId: "G-PNXDBTZBX0",
});

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals, no-undef
  self.registration.showNotification(notificationTitle, notificationOptions);
});
