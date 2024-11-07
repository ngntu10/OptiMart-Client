importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js')
const firebaseConfig = {
  apiKey: "AIzaSyCMug5XwbBGKDDUngVXOX2d1dnxduSVXMs",
  authDomain: "optimart-firebase.firebaseapp.com",
  projectId: "optimart-firebase",
  storageBucket: "optimart-firebase.firebasestorage.app",
  messagingSenderId: "26815539408",
  appId: "1:26815539408:web:0cd7bedf19a7e05170d6d5",
  measurementId: "G-34PG7SKB3R"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()
messaging.onBackgroundMessage(payload => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png'
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
