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

auth.onAuthStateChanged(async (user) => {
    if (user) {
        try {
            const token = localStorage.getItem("token")
            const urlTokens = 'tokens/' + token
            const tokensRef = child(dbRef, urlTokens)
            const tokensSnap = await get(tokensRef)
            if (!tokensSnap.exists()) {
                localStorage.setItem("pesan", "Unregistered token")
                location.href = location.origin + "/"
            }
            if (tokensSnap.exists()) {
                const uid = user.uid
                const url = 'students/' + uid
                const ref = child(dbRef, url)
                const snap = await get(ref)
                const project = snap.val()
                if (project) {
                    const jumlahProject = Object.keys(project).length
                    if (jumlahProject > 1) {
                        localStorage.setItem("pesan", "Maximum 2 projects")
                        location.href = location.origin + "/index"
                    } else {
                        konfirmasiIdentitasSoal(token)
                    }
                } else {
                    konfirmasiIdentitasSoal(token)
                }
            }
        } catch (err) {
            localStorage.setItem("pesan", err.message)
            location.href = location.origin + "/index"
        }
    } else {
        localStorage.setItem("pesan", "Please signin")
        location.href = location.origin + "/login"
    }
})
async function konfirmasiIdentitasSoal(token) {
    try {
        const urlMakerId = 'tokens/' + token + '/makerId'
        const makerIdRef = child(dbRef, urlMakerId)
        const makerIdSnap = await get(makerIdRef);
        const makerId = makerIdSnap.val()

        const urlOpenQuiz = 'teachers/' + makerId + '/questions/' + token + '/openQuiz'
        const openQuizRef = child(dbRef, urlOpenQuiz)
        const openQuizSnap = await get(openQuizRef)
        const openQuiz = JSON.parse(openQuizSnap.val())
        if (openQuiz == true) {
            const urlIS = 'teachers/' + makerId + '/questions/' + token + '/identitasSoal'
            const isRef = child(dbRef, urlIS)
            const isSnap = await get(isRef)
            const identitasSoal = isSnap.val()
            localStorage.setItem('is_' + token, JSON.stringify(identitasSoal))
            location.href = location.origin + "/index3-question-identity"
        } else if (openQuiz == false) {
            localStorage.setItem("pesan", "Locked exam")
            location.href = location.origin
        } else {
            localStorage.setItem("pesan", "Broken data")
            location.href = location.origin
        }
    } catch (err) {
        localStorage.setItem("pesan", err.message)
        location.href = location.origin
    }
}