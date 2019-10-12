import firebase from 'firebase'
import Vue from 'vue'

const firebaseConfig = {
  apiKey: 'AIzaSyDx45GQ7pvHCuAdNyKMcPZyHcWq4xAtcGo',
  authDomain: 'onemachine-b930b.firebaseapp.com',
  databaseURL: 'https://onemachine-b930b.firebaseio.com',
  projectId: 'onemachine-b930b',
  storageBucket: 'onemachine-b930b.appspot.com',
  messagingSenderId: '349742656112',
  appId: '1:349742656112:web:23b74e9d48c2d5d610a2b5'
}

let app
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

Vue.prototype.$firebase = app && app.database()
