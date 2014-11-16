var express = require('express');
var router = express.Router();

/* Use In-Memory Database */
var db = require('../lib/memdb');
/* Use Remote PostgreSQL Database */
//var db = require('../lib/db');

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

    db.addObject(uid, obj, function(err, object) {
        if(err){
            var error = {
                "verb" : "POST",
                "url" : "api/objects/",
                "message" : "Database error"
            };
            res.json(error);
        }else{
            res.json(object);
        }
    });
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

    db.updateObject(req.param('uid'), req.body, function(err, updated) {
        if(err){
            var error = {
                "verb" : "PUT",
                "url" : "api/objects/<uid>",
                "message" : "Object with specified UID doesn't exist"
            };
            res.json(error);
        }else{
            if(!updated){
                var error = {
                    "verb" : "GET",
                    "url" : "api/objects/<uid>",
                    "message" : "Object with specified UID doesn't exist"
                };
                res.json(error);
                return;
            }
            res.json(req.body);
        }
    });
});

router.get('/objects/:uid', function(req, res) {
    db.getObject(req.param('uid'), function(err, obj) {
        if(err){
            var error = {
                "verb" : "GET",
                "url" : "api/objects/<uid>",
                "message" : "Database error"
            };
            res.json(error);
        }else{
            if(!obj){
                var error = {
                    "verb" : "GET",
                    "url" : "api/objects/<uid>",
                    "message" : "Object with specified UID doesn't exist"
                };
                res.json(error);
                return;
            }
            res.json(obj.object);
        }
    });
});

router.get('/objects', function(req, res) {
    db.uidList(function(err, lst) {
        if(err){
            var error = {
                "verb" : "GET",
                "url" : "api/objects/",
                "message" : "Database error"
            };
            res.json(error);
        }else{
            var arr = [];

            lst.forEach(function(elem) {
                arr.push({"url":"api/objects/"+elem.uid});
            });

            res.json(arr);
        }
    });
});

router.delete('/objects/:uid', function(req, res) {
    db.removeObject(req.param('uid'));
    res.end();
});

module.exports = router;
