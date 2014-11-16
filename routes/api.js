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
    db.getObject(uid, function(err, obj) {
        if(err)
            console.log(err);
        else
            console.log(obj);
    });
    res.json(obj);
});

router.put('/objects/:uid', function(req, res) {
    // Check if received data is a JSON object
    try {
        JSON.parse(JSON.stringify(req.body));
        if(Object.keys(req.body).length === 0)
            throw Error();
    } catch(e) {
        var err = {
            "verb" : "PUT",
            "url" : "api/objects/<uid>",
            "message" : "Not a JSON object"
        };
        res.json(err);
        return;
    }

    db.updateObject(req.param('uid'), req.body, function(err, obj) {
        if(err){
            var error = {
                "verb" : "PUT",
                "url" : "api/objects/<uid>",
                "message" : "Object with specified UID doesn't exist"
            };
            res.json(error);
        }else{
            res.json(obj);
        }
    });
});

router.get('/objects/:uid', function(req, res) {
    db.getObject(req.param('uid'), function(err, obj) {
        if(err){
            var error = {
                "verb" : "GET",
                "url" : "api/objects/<uid>",
                "message" : "Object with specified UID doesn't exist"
            };
            res.json(error);
        }else{
            res.json(obj);
        }
    });
});

router.delete('/objects/:uid', function(req, res) {

});

module.exports = router;
