import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, get, set, update, ref, child } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"
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
const dbRef = ref(db)

auth.onAuthStateChanged(async(user)=>{
    if (user) {
        try {
            const token = localStorage.getItem("token");
            const urlMakerId = 'tokens/' + token + '/makerId';
            const makerIdRef = child(dbRef, urlMakerId);
            const makerIdSnap = await get(makerIdRef);
            const makerId = makerIdSnap.val();
            //* get izin lihat
            const urlMelihatNilai = 'teachers/' + makerId + '/questions/' + token + '/melihatNilai'
            const melihatNilaiRef = child(dbRef, urlMelihatNilai)
            const melihatNilaiSnap = await get(melihatNilaiRef)
            const melihatNilai = JSON.parse(melihatNilaiSnap.val())
            if (melihatNilai == true) {
                const uid = user.uid
                const url = 'students/' + uid + '/' + token
                const dataRef = child(dbRef, url)
                const dataSnap = await get(dataRef)
                const data = dataSnap.val()
                if (data) {
                    localStorage.setItem("detail-jawaban", JSON.stringify(data))
                    location.href = location.origin + "/exams3-answer-details"
                } else {
                    localStorage.setItem("pesan", "No data|gagal.svg")
                    location.href = location.origin + "/exams"
                }
            } else if (melihatNilai == false) {
                localStorage.setItem("pesan", "Not allowed to be seen|gagal")
                location.href = location.origin + "/exams"
            } else {
                localStorage.setItem("pesan", "Data on the teacher has been deleted|gagal")
                location.href = location.origin + "/exams"
            }
        } catch (err) {
            localStorage.setItem("pesan", err.message + "|gagal")
            location.href = location.origin + "/exams"
        }
    } else {
        localStorage.setItem("pesan", "Please signin")
        location.href = location.origin + "/login"
    }
})