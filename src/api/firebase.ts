import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage'

// Initialize Firebase
export const appFirebase = initializeApp({
    apiKey: "AIzaSyA86cHW63dfmbjCReupaxC7q5mjfdBFwkc",
    authDomain: "events-calendar-app-3720c.firebaseapp.com",
    projectId: "events-calendar-app-3720c",
    storageBucket: "events-calendar-app-3720c.appspot.com",
    messagingSenderId: "162184383847",
    appId: "1:162184383847:web:1c5212020c2fa9cb18b3c2"
});

export const storage = getStorage()