const dataUser = JSON.parse(localStorage.getItem("data"))
const email = dataUser[0]
const sandi = dataUser[1]

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBo7VtIc55QLyJR9qGrO2lm0yQR4mNRcvk",
    authDomain: "myquiz-01.firebaseapp.com",
    databaseURL: "https://myquiz-01-default-rtdb.firebaseio.com",
    projectId: "myquiz-01",
    storageBucket: "myquiz-01.appspot.com",
    messagingSenderId: "258038896605",
    appId: "1:258038896605:web:407d3b6b4dd318b12e0834",
    measurementId: "G-3DF6Q5F1F0"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

signInWithEmailAndPassword(auth, email, sandi)
    .then((credentials) => {
        localStorage.removeItem("data")
        localStorage.setItem("pesan", "Login successful")
        location.href = location.origin
    })
    .catch((err) => {
        localStorage.setItem("pesan", err.code)
        location.href = location.origin + "/login"
    })