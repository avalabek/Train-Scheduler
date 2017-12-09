
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

// button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HHmm").format("X");
  var frequency = $("#frequency-input").val().trim();
 
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    place: destination,
    start: firstTrain,
    frequency: frequency,
   //I think these below are not needed here as this is only for input data
    // arrives: nextArrival,
    // minutes: minutesAway
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert 
  alert("Train successfully added.");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;
  
  //use moment.js and/or math to calculate the ones below
  var nextArrival;
  var minutesAway;
 var currentTime = moment().format(HHmm);

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(nextArrival);
  console.log(minutesAway);

  // Prettify the first train time
  var firstTrainPretty = moment.unix(firstTrain).format("HHmm");

  // Calculate the nextArrival using hardcore math
  // To calculate the nextArrival--I don't really want the difference, I 
  // want to increment from first train til I reach current time then go one more
  var nextArrival = moment().diff(moment.unix(firstTrain, "X"), "HHmm");
  console.log(nextArrival);
//the math calculations aren't right! how to figure out
  // Add frequency to thatTHIS IS ALL WRONG
  
  var addFrequency  = firstTrain + frequency// <== current time then add 1 increment of freuqency ;
  console.log(addFrequency);

var minutesAway = currentTime - nextArrival

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrainPretty + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
