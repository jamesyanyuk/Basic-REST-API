// Database library - Connects to PostgreSQL

var pg = require('pg.js');

var conString = '<db connect url>';

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
            // Set object in table with specified uid to newObj
            var str = 'update objects set object = $2 where uid = $1';
            client.query(str, [uid, newObj], function(err, result) {
                done();
                if(err){
                    cb(err);
                }else{
                    cb(undefined, result.rowCount, newObj);
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
