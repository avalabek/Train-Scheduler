
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyAvd-4kBlWP3MjjeWRZrY0BNufIlsyCiDk",
    authDomain: "train-scheduler-900dd.firebaseapp.com",
    databaseURL: "https://train-scheduler-900dd.firebaseio.com",
    projectId: "train-scheduler-900dd",
    storageBucket: "train-scheduler-900dd.appspot.com",
    messagingSenderId: "982052479760"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// add trains on submit button
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HHmm").format("X");
  var frequency = $("#frequency-input").val().trim();
 
  // local object to put train times in
  var newTrain = {
    name: trainName,
    place: destination,
    start: firstTrain,
    frequency: frequency,
   
  };//semicolon or no?

  // send train data to database
  database.ref().push(newTrain);

  
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  
  alert("Train successfully added.");

  // Clear all text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
//not sure why false here or return but not broken
  return false;
});

// Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;
  
  //use moment.js and/or math to calculate the ones below
  var nextArrival;
  var minutesAway;
  var currentTime;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  

//convert first time(push back one year to make it prior to now)
var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1,"years");
console.log(firstTrainConverted);

  // Prettify the first train time
  // var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

  var currentTime = moment();
  console.log (currentTime);
  var difference = moment().diff(moment(firstTrainConverted), "minutes");
  console.log (difference);

  var remainder = difference % frequency;
  console.log (remainder);

  var minutesAway = frequency - remainder; 
  console.log("Minutes away: "+ minutesAway);

  var nextTrain = moment().add(minutesAway, "minutes");
  var nextTrainConverted = moment(nextTrain).format("HH:mm");

  
  
  var addFrequency  = firstTrain + frequency// <== current time then add 1 increment of freuqency ;
  console.log(addFrequency);


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrainConverted + "</td><td>" + minutesAway +  "</td></tr>");
});

