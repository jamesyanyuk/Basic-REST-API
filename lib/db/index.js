// PostgreSQL Database library
var pg = require('pg.js');
/* Local connection string */
//var conString = 'postgres://dljjgyrnmbxpbr:nKqGR9lybFjQxIt5XJk8feIJ7F@ec2-54-83-204-104.compute-1.amazonaws.com:5432/d3j3n73u9o6ffs?ssl=true';
/* Remote connection string */
var conString = 'postgres://dljjgyrnmbxpbr:nKqGR9lybFjQxIt5XJk8feIJ7F@ec2-54-83-204-104.compute-1.amazonaws.com:5432/d3j3n73u9o6ffs?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';

exports.addObject = function(uid, json, cb) {
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            var str = 'insert into objects (uid, object) values ($1, $2)';
            client.query(str, [uid, JSON.stringify(json)], function(err, result) {
                done();
                client.end();
                if(err)
                    cb(err);
                else
                    cb(undefined, json);
            });
        }
    });
}

exports.getObject = function(uid, cb) {
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            var str = 'select object from objects where uid = $1';
            client.query(str, [uid], function(err, result) {
                done();
                client.end();
                if(err)
                    cb(err);
                else
                    cb(undefined, result.rows[0].object); // or is it result.rows[0].object ?
            });
        }
    });
}

// exports.getObject = function(uid, cb) {
//     var len = objectdb.length;
//
//     for(var i = 0; i < len; i++) {
//         var o = objectdb[i];
//         if(o.uid === uid){
//             cb(undefined, o);
//             return;
//         }
//     }
//
//     cb('Object not found');
// }

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
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            var str = 'select uid from objects';
            client.query(str, function(err, result) {
                done();
                client.end();
                if(err){
                    cb(err);
                }else{
                    cb(undefined, result.rows); // or is it result.rows[0].object ?
                }
            });
        }
    });
}
