import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyA509kMbF8WLh_CN7fpQE4Conoehv86KiM",
    authDomain: "time-management-a2f4e.firebaseapp.com",
    databaseURL: "https://time-management-a2f4e.firebaseio.com",
    projectId: "time-management-a2f4e",
    storageBucket: "time-management-a2f4e.appspot.com",
    messagingSenderId: "1055659372237"
};

firebase.initializeApp(config);

const database = firebase.database()
const goolgeProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, goolgeProvider, database as default};