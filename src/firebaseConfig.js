// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC53-JWx-NA0i0QbOs5togwXCTY4UTFECU",
    authDomain: "my-apps-077.firebaseapp.com",
    projectId: "my-apps-077",
    storageBucket: "my-apps-077.firebasestorage.app",
    messagingSenderId: "888644240432",
    appId: "1:888644240432:web:80649d7f31ee9d7a6019f5",
    measurementId: "G-PS211GRZTS"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
