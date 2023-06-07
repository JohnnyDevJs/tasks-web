import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBsh6hxmS8g6A_LxHRlej2BM59OEBZSzmc',
  authDomain: 'task-fd586.firebaseapp.com',
  projectId: 'task-fd586',
  storageBucket: 'task-fd586.appspot.com',
  messagingSenderId: '54153692175',
  appId: '1:54153692175:web:2923bb21e0f2536d56cf7a',
  measurementId: 'G-54YHC65BK3',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

export { db }
