
import firebase from 'firebase';
  
const firebaseConfig = {
  apiKey: "AIzaSyAg-ViYa56oAvhluv9jzVWHg2UObvK3KUI",
  authDomain: "elite-reserve-328110.firebaseapp.com",
  projectId: "elite-reserve-328110",
  storageBucket: "elite-reserve-328110.appspot.com",
  messagingSenderId: "449283701910",
  appId: "1:449283701910:web:491d471accf16e3abe96b7",
  measurementId: "G-N7595HRGM1"
};
  
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase};