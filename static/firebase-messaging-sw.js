importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');
var config = {
    //config
    apiKey: "AIzaSyB7dQwNuWGmxN0P4Mwu8WLqKtjxSKQRtMI",
    authDomain: "k8school.firebaseapp.com",
    databaseURL: "https://k8school-default-rtdb.firebaseio.com",
    projectId: "k8school",
    storageBucket: "k8school.appspot.com",
    messagingSenderId: "149651128105",
    appId: "1:149651128105:web:a16a96097f64b7edb00138",
    measurementId: "G-CTKT6KTR93"   
};
firebase.initializeApp(config);

let messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle = payload.title;
    const notificationOptions = {
        body: payload.body,
        icon: 'alarm.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register('/k8school/static/firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log("Registration successful, scope is:", registration.scope);
//       })
//       .catch(function(err) {
//         console.log("Service worker registration failed, error:", err);
//       });
//   }