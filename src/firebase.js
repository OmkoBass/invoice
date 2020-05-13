import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyCj4znKPiNbR-LB0bs9EJpXiOcGusRWrpU",
    authDomain: "testdb-f0cff.firebaseapp.com",
    databaseURL: "https://testdb-f0cff.firebaseio.com",
    projectId: "testdb-f0cff",
    storageBucket: "testdb-f0cff.appspot.com",
    messagingSenderId: "890976399799",
    appId: "1:890976399799:web:5a61e120d98bddd40b3832"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
