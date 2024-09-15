import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
 apiKey: "AIzaSyAS5VJF4KFgKpo09RsjYgk5Fm5Wt_9QJ70",
  authDomain: "bancopoe-67076.firebaseapp.com",
  databaseURL: "https://bancopoe-67076-default-rtdb.firebaseio.com",
  projectId: "bancopoe-67076",
  storageBucket: "bancopoe-67076.appspot.com",
  messagingSenderId: "979167512397",
  appId: "1:979167512397:web:2e42b82367b3a5323ad904",
  measurementId: "G-QX51890MYZ"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
export const database = firebase.database();
