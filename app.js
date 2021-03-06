// Require Libraries
const express = require('express');




// Require tenorjs near the top of the file requires the API wrapper
//(makes it easy to interact with TenorAPI)
  const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "	5FQ3G64XWCFB", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();

// Somewhere near the top
app.use(express.static('public'));

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

// example URL "http://localhost:3000/?term=hey"
app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
     term = ""
     if (req.query.term) {
         term = req.query.term
     }
     // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
     Tenor.Search.Query(term, "10")
         .then(response => {
             // store the gifs we get back from the search
             const gifs = response;
             // pass the gifs as an object into the home page
             res.render('home', { gifs })
         }).catch(console.error);
   })

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
});

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});


// function used render HTML templates and send them back to the client
// res.render('templa te-name', { variables })
