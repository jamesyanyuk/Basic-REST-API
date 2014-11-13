var express = require('express');
var router = express.Router();

var scientist = require('scientist');

router.post('/objects', function(req, res) {
    // create new scienctist record with unique id
    // store in database
    // return record
    var genUID = Math.random().toString().substr(2, 6);
    scientist.add(genUID, 'Andrey', 'Kolmogorov', '25 April 1903');
    res.redirect('/objects/' + genUID);
});

router.put('/objects/:uid', function(req, res) {

});

router.get('/objects/:uid', function(req, res) {

});

router.delete('/objects/:uid', function(req, res) {

});

module.exports = router;
