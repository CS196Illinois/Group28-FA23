// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//curent goal: add elements in the database for users, and under users, personal information and vaccine history.
//then fetch that and populate the table with that data.

//hopefully: add some logic that will allow for data to be enetered, and automatically upated?

const firebaseConfig = {
  apiKey: "AIzaSyBEyjYWehoj_eaUFPO8mJv0wRMRyJcE4ws",
  authDomain: "cs124h.firebaseapp.com",
  projectId: "cs124h",
  storageBucket: "cs124h.appspot.com",
  messagingSenderId: "901058912709",
  appId: "1:901058912709:web:7ffdb471a20d7638b7abac",
  measurementId: "G-TSZ3P73GJ7"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

