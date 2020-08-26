import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyCVXBBBpz2UKY8_Pbmw0mUdW2QN0Br4SqM',
    authDomain: 'fakeinstaaa.firebaseapp.com',
    databaseURL: 'https://fakeinstaaa.firebaseio.com',
    projectId: 'fakeinstaaa',
    storageBucket: 'fakeinstaaa.appspot.com',
    messagingSenderId: '1098232971382',
    appId: '1:1098232971382:web:647c7db9b1b7ff9cd21f57',
}

firebase.initializeApp(firebaseConfig)
export default firebase
