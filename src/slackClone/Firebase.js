  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/database";
  import "firebase/storage";  
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDWaJVHAGr0d-gaIX0Hwglzh9-lzT-DzZA",
    authDomain: "react-slack-clone-c842c.firebaseapp.com",
    databaseURL: "https://react-slack-clone-c842c.firebaseio.com",
    projectId: "react-slack-clone-c842c",
    storageBucket: "react-slack-clone-c842c.appspot.com",
    messagingSenderId: "387479643938",
    appId: "1:387479643938:web:69f91825a175058f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;