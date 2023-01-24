// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/
app.get('/api/:date?', (req, res) => {

 
   const time = isNaN(Number(req.params.date)) ? (req.params.date || Date.now()) : parseInt(req.params.date);

    console.log("req.params.date:", req.params.date);
    console.log("time calculation:", time);
    
    const date = new Date(time);
    const result = {};
    
    console.log(`new Date(time):`, date);
    
    if(isNaN(date))
        result.error = "Invalid Date";
    else
        result.unix = parseInt(date.getTime()), result.utc = date.toUTCString();
  
    console.log('*****')
    console.log("(JSON) object: ", result);
    console.log('*****');
    res.json(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
