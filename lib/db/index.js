// PostgreSQL Database library

var pg = require('pg.js');

/* Use when deployed locally relative to db */
//var conString = process.env.DATABASE_URL;

/* Use when deployed remotely relative to db */
// Remove db connection string when committing; stored in dbinto.txt
var conString = 'postgres://dljjgyrnmbxpbr:nKqGR9lybFjQxIt5XJk8feIJ7F@ec2-54-83-204-104.compute-1.amazonaws.com:5432/d3j3n73u9o6ffs?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';

exports.addObject = function(uid, json, cb) {
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            var str = 'insert into objects (uid, object) values ($1, $2)';
            client.query(str, [uid, JSON.stringify(json)], function(err, result) {
                done();
                if(err){
                    cb(err);
                    console.log(err);
                }else
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
            var str = 'select object from objects where uid = $1 limit 1';
            client.query(str, [uid], function(err, result) {
                done();
                if(err)
                    cb(err);
                else
                    cb(undefined, result.rows[0]);
            });
        }
    });
}

exports.updateObject = function(uid, newObj, cb) {
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            // Set uid in table to uid of newObj, set object in table to newObj
            var str = 'update objects set uid = $2, object = $3 where uid = $1';
            client.query(str, [uid, newObj.uid, newObj], function(err, result) {
                done();
                if(err){
                    cb(err);
                }else{
                    cb(undefined, result.rowCount);
                }
            });
        }
    });
}

exports.removeObject = function(uid) {
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            var str = 'delete from objects where uid = $1';
            client.query(str, [uid], function(err, result) {
                done();
            });
        }
    });
}

exports.uidList = function(cb) {
    pg.connect(conString, function(err, client, done) {
        if(err){
            cb(err);
        }else{
            var str = 'select uid from objects order by uid';
            client.query(str, function(err, result) {
                done();
                if(err){
                    cb(err);
                }else{
                    cb(undefined, result.rows);
                }
            });
        }
    });
}
