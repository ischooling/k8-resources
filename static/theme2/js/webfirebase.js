const firebaseConfig = {
  apiKey: "AIzaSyB7dQwNuWGmxN0P4Mwu8WLqKtjxSKQRtMI",
  authDomain: "k8school.firebaseapp.com",
  databaseURL: "https://k8school-default-rtdb.firebaseio.com",
  projectId: "k8school",
  storageBucket: "k8school.appspot.com",
  messagingSenderId: "149651128105",
  appId: "1:149651128105:web:a16a96097f64b7edb00138",
  measurementId: "G-CTKT6KTR93"
};

localStorage.setItem('devicetoken', '');

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BDGstP42R3zRJexVExFmDXSxaDS8c4Kfys2PpOPJmazpkN11uds0SVnwut1ziqj8yRbHQ6L_6rUZabdOD9PT6cQ')

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
    console.log('Notification permission granted static.');
        messaging.getToken().then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            localStorage.setItem('devicetoken', currentToken);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');

          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  } else {
    console.log('Unable to get permission to notify.');
  }
});


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/k8school/static/firebase-messaging-sw.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is:');
//     }).catch(function(err) {
//       console.log('Service worker registration failed, error:', err);
//     });
//   }
  
// messaging.requestPermission().then(function() {
// console.log('Notification permission granted.');
// if(isTokenSentToServer()){
//   // console.log("Token Already sent");
// }else{
//     getRegisterToken();
// }
// // TODO(developer): Retrieve an Instance ID token for use with FCM.
// // ...
// }).catch(function(err) {
// console.log('Unable to get permission to notify.', err);
// });
// function getRegisterToken(){
//   // Get Instance ID token. Initially this makes a network call, once retrieved
//   // subsequent calls to getToken will return from cache.
// messaging.getToken({ vapidKey: 'BDGstP42R3zRJexVExFmDXSxaDS8c4Kfys2PpOPJmazpkN11uds0SVnwut1ziqj8yRbHQ6L_6rUZabdOD9PT6cQ' })
// .then(function(currentToken) {
//   if (currentToken) {
//         //saveToken(currentToken);
//         console.log('currentToken',currentToken);
//         //sendTokenToServer(currentToken);
//     // updateUIForPushEnabled(currentToken);
//   } else {
//     // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.');
//     // Show permission UI.
//   // updateUIForPushPermissionRequired();
//     setTokenSentToServer(false);
//   }
// }).catch(function(err) {
//   console.log('An error occurred while retrieving token. ', err);
//   //showToken('Error retrieving Instance ID token. ', err);
//   setTokenSentToServer(false);
// });
// }


// function setTokenSentToServer(sent) {
//   window.localStorage.setItem('sentToServer', sent ? '1' : '0');
// }

// function sendTokenToServer(currentToken) {
//   if (!isTokenSentToServer()) {
//     console.log('Sending token to server...');
//     // TODO(developer): Send the current token to your server.
//     setTokenSentToServer(true);
//   } else {
//     console.log('Token already sent to server so won\'t send it again ' +
//         'unless it changes');
//   }
// }

// function isTokenSentToServer() {
//   return window.localStorage.getItem('sentToServer') === '1';
// }

// function saveToken(currentToken){
//     console.log(currentToken);
//   //    jQuery.ajax({
//   //      data: {"token":currentToken},
//   //      type: "post",
//   //      url: "savefcmtoken.php",
//   //      success: function(result){
//   //          console.log(result);
//   //      }
      
//   // });
// }
// messaging.onMessage(function(payload) {
// //console.log('Message received. ', payload);
// var  title =payload.data.title;

// var options ={
//       body: payload.data.body,
//       icon: payload.data.icon,
//       image: payload.data.image,
//       data:{
//           time: new Date(Date.now()).toString(),
//           click_action: payload.data.click_action
//       }
// };
// var myNotification = new Notification(title, options);
// });