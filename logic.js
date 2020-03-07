$(document).ready(function () {

    // Initialize Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyDOJsd4btGI-IP98n2fZH-pSlLFb2Q5uuE",
      authDomain: "train-schedule-fa558.firebaseapp.com",
      databaseURL: "https://train-schedule-fa558.firebaseio.com",
      projectId: "train-schedule-fa558",
      storageBucket: "train-schedule-fa558.appspot.com",
      messagingSenderId: "965172104114",
      appId: "1:965172104114:web:c4cbf25281c5ab303a32ab",
      measurementId: "G-VHW4TBPK87"
    };
     firebase.initializeApp(firebaseConfig);
     firebase.analytics();
  
    var database = firebase.database();
  
    // Capture Button Click
    $("#addTrain").on("click", function (event) {
      event.preventDefault();
  
     
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var freq = $("#interval").val().trim();
  
      
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
      });
    });
  
  
  
    database.ref().on("child_added", function (childSnapshot) {
  
      var newTrain = childSnapshot.val().trainName;
      var newLocation = childSnapshot.val().destination;
      var newFirstTrain = childSnapshot.val().firstTrain;
      var newFreq = childSnapshot.val().frequency;
  
     
      var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
  
      var currentTime = moment();
      
      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
      var tRemainder = diffTime % newFreq;
  
      
      var tMinutesTillTrain = newFreq - tRemainder;
  
    
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  
      // Display On Page
      $("#all-display").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
      // Clear input fields
      $("#trainName, #destination, #firstTrain, #interval").val("");
      return false;
    },
      
      function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
  }); 