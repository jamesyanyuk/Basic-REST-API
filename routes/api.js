var express = require('express');
var router = express.Router();

var scientist = require('../lib/scientist');
var db = require('../lib/db');

function genUID() {
    var uid = Math.random().toString().substr(2, 6);
    // Check to see that UID doesn't already exist
    return uid;
}

router.post('/objects', function(req, res) {
    // Check if received data is a JSON object
    try {
        JSON.parse(JSON.stringify(req.body));
        if(Object.keys(req.body).length === 0)
            throw Error();
    } catch(e) {
        var err = {
            "verb" : "POST",
            "url" : "api/objects/",
            "message" : "Not a JSON object"
        };
        res.json(err);
        return;
    }

    var obj = req.body;
    var uid = genUID();
    obj.uid = uid;

    db.addObject(obj);
    //console.log(db.getObject(uid));
    res.json(obj);
});

router.put('/objects/:uid', function(req, res) {

});

router.get('/objects/:uid', function(req, res) {

});

router.delete('/objects/:uid', function(req, res) {

});

module.exports = router;
