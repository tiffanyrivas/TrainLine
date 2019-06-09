  var firebaseConfig = {
    apiKey: "AIzaSyC4hLRuUM5rHfWrDC2-R6VS-0cbGAEFP-Y",
    authDomain: "johngaltline-95367.firebaseapp.com",
    databaseURL: "https://johngaltline-95367.firebaseio.com",
    projectId: "johngaltline-95367",
    storageBucket: "johngaltline-95367.appspot.com",
    messagingSenderId: "1088141842219",
    appId: "1:1088141842219:web:f6bf165fef2eabc1"
  };
 
  firebase.initializeApp(firebaseConfig);




  var database = firebase.database();
  $('#addTrainBtn').on("click", function() {
    
    var trainLine = $("#trainLine").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = moment($("#time").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();
   
    var newTrain = {
        name: trainLine,
        place: destination,
        ftrain: trainTime,
        freq: frequency
      }
      

    database.ref().push(newTrain);
    console.log(newTrain.name);

    
    $("#trainLine").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
    

    return false;
  });
  // REMEMBER APPEND CHILD //

  database.ref().on("child_added", function(childSnapshot) {
    
    console.log(childSnapshot.val());
    
   
    
    var trainLine = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var trainTime = childSnapshot.val().ftrain;
    var frequency = childSnapshot.val().freq;

    
    
    
    var firstTimeConverted = moment(trainTime, "HH:mm");
    console.log(firstTimeConverted);

    // MUST HAVE MILITARY TIME
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);

  
    
    // store difference between currentTime and fisrt train converted in a variable.
    
    var militaryTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(trainTime);
    console.log("Difference in Time: " + militaryTime);
    
    
    var realTime = militaryTime % frequency;
    console.log(realTime);
    

    
    var minToTrain = frequency - realTime;
    
    var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    $("#trainTable>tbody").append("<tr><td>" + trainLine + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
  });