var friendsData = require("../data/friends.json");
var fs = require("fs");
var path = require("path");

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.get("/api/friends", function(req, res) {
        var userData = req.body;
        var sumDiff = 0;
        var scoresDiff = [];
        var totalDiff = [];

        var match = {
            name: "",
            photo: "",
            difference: 100
        }
        
    for(var i = 0; i < friendsData.length; i++) {
        
        for(var j = 0; j < friendsData[i].scores.length; j++) {
            var diff = Math.abs(parseInt(userData.scores[j]) - parseInt(friendsData[i].scores[j]));
            scoresDiff.push(diff);
            if (scoresDiff.length === friendsData[i].scores.length) {
                sumDiff = scoresDiff.reduce(sum, 0);

                function sum(a, b) {
                    return a + b;
                }

                totalDiff.push(sumDiff);
                if(sumDiff < match.difference) {
                    match.name = friendsData[i].name;
                    match.photo = friendsData[i].photo;
                    match.difference = sumDiff;
                }
                
                scoresDiff = [];
                sumDiff = 0;
            }
        }
        console.log(`
        Your best match so far is...${match.name}
        Difference: ${JSON.stringify(match.difference)}
        Total Difference: [${totalDiff}]
        `)
    }

    res.json(match);
    var friends;
    fs.readFile(path.join(__dirname, "../data/friends.json"), "utf8", function(err, data) {
        if(err) throw err;

        friends = JSON.parse(data);
        friends.push(userData);

        fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(friends), function(err, data) {
            if(err) throw err;
            console.log("New friend has been added!")
        })
    })
    })
}