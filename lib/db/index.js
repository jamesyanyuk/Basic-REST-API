// Database library

// Temporary in-memory database
var objectdb = [
    {
        "uid" : "000001",
        "firstname" : "Andrey",
        "lastname" : "Kolmogorov",
        "dob" : "25 April 1903"
    },
    {
        "uid" : "000002",
        "firstname" : "11",
        "lastname" : "12",
        "dob" : "13"
    },
    {
        "uid" : "000003",
        "firstname" : "21",
        "lastname" : "22",
        "dob" : "23"
    }
];

exports.addObject = function(json) {
    objectdb.push(json);
}

exports.getObject = function(uid, cb) {
    var len = objectdb.length;

    for(var i = 0; i < len; i++) {
        var o = objectdb[i];
        if(o.uid === uid){
            cb(undefined, o);
            return;
        }
    }

    cb('Object not found');
}

exports.updateObject = function(uid, newObj, cb) {
    var len = objectdb.length;

    for(var i = 0; i < len; i++) {
        var o = objectdb[i];
        if(o.uid === uid){
            objectdb[i] = newObj;
            // objectdb[i] might need to be just o
            cb(undefined, objectdb[i]);
            return;
        }
    }

    cb('Object not found');
}

exports.removeObject = function(uid, newObj, cb) {
    var len = objectdb.length;

    for(var i = 0; i < len; i++) {
        var o = objectdb[i];
        if(o.uid === uid){
            objectdb[i] = newObj;
            // objectdb[i] might need to be just o
            cb(undefined, objectdb[i]);
            return;
        }
    }

    cb('Object not found');
}

module.exports.objectdb = objectdb;
