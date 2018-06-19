const express = require('express');
const path = require('path');
const app = express();

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//app.use('/api', proxy('https://xensedash-db.herokuapp.com'));
//app.use('/api', proxy('http://localhost:3000'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4200);
