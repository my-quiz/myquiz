const dataUser = JSON.parse(localStorage.getItem("data"))
const nama = dataUser[0]
const email = dataUser[1]
const sandi = dataUser[2]

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
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

createUserWithEmailAndPassword(auth, email, sandi)
    .then(() => {
        updateProfile(auth.currentUser, { displayName: nama, appName: 'MyQuiz' })
            .then(() => {
                localStorage.removeItem("data")
                localStorage.setItem("pesan", "Registration successful")
                location.href = location.origin
            })
            .catch((err) => {
                localStorage.setItem("pesan", err.code)
                location.href = location.origin + "/registration"
            })
    })
    .catch((err) => {
        localStorage.setItem("pesan", err.code)
        location.href = location.origin + "/registration"
    })