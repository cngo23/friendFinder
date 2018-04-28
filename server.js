var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require("path");

var PORT = process.env.PORT || 3355;

//app.use(express.static(__dirname + "public")); 
app.use(express.static(path.join(__dirname, './app/public')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("The App is listening on PORT: " + PORT);
});
