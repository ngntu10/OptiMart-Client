// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCMug5XwbBGKDDUngVXOX2d1dnxduSVXMs',
  authDomain: 'optimart-firebase.firebaseapp.com',
  projectId: 'optimart-firebase',
  storageBucket: 'optimart-firebase.firebasestorage.app',
  messagingSenderId: '26815539408',
  appId: '1:26815539408:web:0cd7bedf19a7e05170d6d5',
  measurementId: 'G-34PG7SKB3R'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
