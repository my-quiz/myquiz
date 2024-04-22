import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, ref, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"
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

const db = getDatabase()

auth.onAuthStateChanged((user) => {
    if (user) {
        const token = localStorage.getItem("token")
        const uid = user.uid
        const urlToken = "students/" + uid + "/" + token
        const dataStudent = ref(db, urlToken)
        remove(dataStudent)
            .then(() => {
                localStorage.removeItem('answerStatusSent_' + token)
                localStorage.removeItem('is_' + token)
                localStorage.removeItem('js_' + token)
                localStorage.removeItem('answers_' + token)
                localStorage.removeItem('bgQuiz_' + token)
                localStorage.removeItem('time_' + token)

                hapusDataIdb(token)
                localStorage.setItem("pesan", "Data successfully deleted|betul")
                location.href = location.origin + "/exams"
            })
            .catch((err) => {
                localStorage.setItem("pesan", err.message + "|gagal")
                location.href = location.origin + "/exams"
            })

    } else {
        localStorage.setItem("pesan", "Please signin")
        location.href = location.origin + "/login"
    }
})
function hapusDataIdb(token) {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    const request = indexedDB.open("MyQuiz", 1)
    request.onsuccess = function () {
        const db = request.result
        let tx = db.transaction("start", "readwrite")
        let store = tx.objectStore("start")
        store.delete(token)
    }
}