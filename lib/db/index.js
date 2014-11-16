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

exports.getObject = function(uid) {
    var len = objectdb.length;

    for(var i = 0; i < len; i++) {
        var o = objectdb[i];
        if(o.uid === uid)
            return o;
    }

    return;
}

//module.exports.objectdb = objectdb;
