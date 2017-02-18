var express = require('express');
var app = express();
var port = process.argv[2]||process.env.PORT;
var results = {};

function isValidTimestamp(timestamp){
  //will return 0 in the timestamp provided is not valid.
  return (new Date(timestamp)).getTime();
}

function unixtimeToNatural(timestamp){
  //converts the supplied unixtime to a nartual languge date string of the format month date, year.
  //For example December 15, 2015
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var date = new Date(timestamp*1000);
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

app.get('/:input', function (req, res) {
  var input = req.params.input;
  var results = { "unix": null, "natural": null };
  console.log('call recieved, input was ' + input);
  //res.send('the input string was ' + input);
  if(isNaN(input)){
    //if the input is not a number try to pharse it as a date string
  } else {
    input = Number(input);
    console.log('input is a number. time value is ' + isValidTimestamp(input));
    if(isValidTimestamp(input) > 0) {
    //if the input is a number verify it is a valid unix time then return the results
    results.unix = input;
    results.natural = unixtimeToNatural(input);
    }
  }
  res.send(results);
})

app.get('/', function (req, res) {
  res.send('<H1>Timestamp API</H1>');
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
})
