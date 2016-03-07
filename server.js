var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var remoteAddress = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress;
    res.json({ "ipAddress": remoteAddress });
});

app.listen(process.env.PORT || 80);
