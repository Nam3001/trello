import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const apiKey = import.meta.env.VITE_API_KEY

const firebaseConfig = {
    apiKey,
    authDomain: 'trello-b4baf.firebaseapp.com',
    databaseURL:
        'https://trello-b4baf-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'trello-b4baf',
    storageBucket: 'trello-b4baf.appspot.com',
    messagingSenderId: '908134044297',
    appId: '1:908134044297:web:3b973bff886c7eb067ec58',
    measurementId: 'G-QRG91FZBK2',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
