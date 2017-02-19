var express = require('express');
var app = express();
var path    = require("path");
var port = process.argv[2]||process.env.PORT;
var results = {};

function isValidDate(theDate){
  //input is either a unix timestamp, or a natral language string
  //is a unix timestamp or 0 if the input could not be pharsed to a date.
  if(isNaN(theDate)){
    return (new Date(theDate)).getTime()/1000;
  } else {
    return (new Date(Number(theDate))).getTime();
  }
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
  var ts = isValidDate(input)
  console.log('ts is ' + ts);
    if(ts > 0) {
      results.unix = ts;
      results.natural = unixtimeToNatural(results.unix);
    }
  res.send(results);
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  //res.send('<H1>Timestamp API</H1>');
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
})
