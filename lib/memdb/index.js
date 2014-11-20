/*  In-Memory Database library
    Added only for testing purposes */

var objectdb = [
    {
        "uid" : "000001",
        "object" : {
            "uid" : "000001",
            "firstname" : "Andrey",
            "lastname" : "Kolmogorov",
            "dob" : "25 April 1903"
        }
    },
    {
        "uid" : "000002",
        "object" : {
            "uid" : "000002",
            "firstname" : "11",
            "lastname" : "12",
            "dob" : "13"
        }
    },
    {
        "uid" : "000003",
        "object" : {
            "uid" : "000003",
            "firstname" : "21",
            "lastname" : "22",
            "dob" : "23"
        }
    }
];

exports.addObject = function(uid, json, cb) {
    objectdb.push({"uid":uid,"object":json});
    cb(undefined, json);
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

    cb(undefined, undefined);
}

exports.updateObject = function(uid, newObj, cb) {
    var len = objectdb.length;

    for(var i = 0; i < len; i++) {
        var o = objectdb[i];
        if(o.uid === uid){
            objectdb[i].object = newObj;
            // objectdb[i] might need to be just o
            cb(undefined, objectdb[i].object);
            return;
        }
    }

    cb();
}

exports.removeObject = function(uid) {
    var len = objectdb.length;
    for(var i = 0; i < len; i++) {
        var o = objectdb[i];
        if(o.uid === uid){
            objectdb.splice(i, i);
            return;
        }
    }
}

exports.uidList = function(cb) {
    var arr = [];

    var len = objectdb.length;
    for(var i = 0; i < len; i++) {
        arr.push({ "uid" : objectdb[i].uid })
    }

    cb(undefined, arr);
}
