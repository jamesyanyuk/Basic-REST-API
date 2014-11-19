var express = require('express');
var router = express.Router();

/* Use DB_TYPE environment variable to set database type
        (in-memory or PostgreSQL)                        */
var db = require('../lib/' + (process.env.DB_TYPE || 'db'));

// Returns randomly-generated uid in callback function
function genUID(cb) {
    var uid = Math.random().toString().substr(2, 6);
    // Check to see that UID doesn't already exist
    db.getObject(uid, function(err, obj) {
        if(!obj || err)
            cb(uid);
        else
            genUID();
    });
}

/*
    | HTTP POST
    | to the "api/objects" URL creates an object.
*/
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

    // Retrieve JSON from request body
    var obj = req.body;

    genUID(function(resUID) {
        var uid = resUID;
        obj.uid = uid;

        // Add new object with unique UID
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
});

/*
    | HTTP PUT
    | to the "api/objects/<uid>" URL updates the object.
*/
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

    // Update object with specified UID by replacing object held by that UID
    // with object passed into the request body
    db.updateObject(req.param('uid'), req.body, function(err, updated) {
        if(err){
            var error = {
                "verb" : "PUT",
                "url" : "api/objects/<uid>",
                "message" : "Database error"
            };
            res.json(error);
        }else{
            // If updateObject doesn't return an object, then requested object with
            // specified UID must not exist
            if(!updated){
                var error = {
                    "verb" : "PUT",
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

/*
    | HTTP GET
    | to the "api/objects/<uid>" URL returns the full JSON object.
*/
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
            // If getObject doesn't return an object within its callback,
            // then requested object with specified UID must not exist
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

/*
    | HTTP GET
    | to the "api/objects/" URL returns a list of unique identifiers of all JSON objects.
*/
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
            // Builds collection of JSON objects with unique identifiers for each object
            // in the database
            var arr = [];

            lst.forEach(function(elem) {
                arr.push({"url":"api/objects/"+elem.uid});
            });

            res.json(arr);
        }
    });
});

/*
    | HTTP DELETE
    | to the "api/objects/<uid>" URL deletes the JSON object.
*/
router.delete('/objects/:uid', function(req, res) {
    db.removeObject(req.param('uid'));
    res.end();
});

module.exports = router;
