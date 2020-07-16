import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCiqVnpjWfm_aH8EuVXHt9lPXfKOl5RtUE",
    authDomain: "react-crud-6b7f1.firebaseapp.com",
    databaseURL: "https://react-crud-6b7f1.firebaseio.com",
    projectId: "react-crud-6b7f1",
    storageBucket: "react-crud-6b7f1.appspot.com",
    messagingSenderId: "953270217683",
    appId: "1:953270217683:web:d5387a85b147b42c099d26"
  };
  // Initialize Firebase
  var firebaseDb = firebase.initializeApp(firebaseConfig);

  export default firebaseDb.database().ref();