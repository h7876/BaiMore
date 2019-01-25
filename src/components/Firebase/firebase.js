import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/database';

var config = {
    apiKey: "AIzaSyCj0l2oh60VEXjqrRXuRAsEtKuAfzLnlVA",
    authDomain: "baimore.firebaseapp.com",
    databaseURL: "https://baimore.firebaseio.com",
    projectId: "baimore",
    storageBucket: "",
    messagingSenderId: "961675422835"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// const db = firebase.database(config);
const auth = firebase.auth();


export {

  auth
  
};
