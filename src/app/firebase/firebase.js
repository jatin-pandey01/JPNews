import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrmHtS-BDt2ObiqPq7S1jG1sDbo7ln2G4",
    authDomain: "triveous-65ead.firebaseapp.com",
    projectId: "triveous-65ead",
    storageBucket: "triveous-65ead.appspot.com",
    messagingSenderId: "485227274816",
    appId: "1:485227274816:web:caa5c539dc3c8c519035a5",
    measurementId: "G-XCVBHF2P66"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);