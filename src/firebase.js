import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBGnVuyn5THqYRoJYFF2fweXBYAjkAe7EY",
    authDomain: "invoice-6969.firebaseapp.com",
    databaseURL: "https://invoice-6969.firebaseio.com",
    projectId: "invoice-6969",
    storageBucket: "invoice-6969.appspot.com",
    messagingSenderId: "100391561866",
    appId: "1:100391561866:web:0012e89f13f3b9e4ac5b73",
    measurementId: "G-MS9LFSQP3M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
