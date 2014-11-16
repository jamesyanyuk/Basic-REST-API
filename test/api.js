var request = require('superagent');
var expect = require('chai').expect;

var app = require('../app.js');
var port = 3000;

describe('app', function() {
    before(function(done) {
        app.listen(port, function(err, result) {
            if(err)
                done(err);
            else
                done();
        });
    });

    it('POST test (should post new object)', function(done) {
        request.post('http://localhost:'+port+'/api/objects').send(
            '{ "name":"aaa", "test":"bbb" }'
        ).set('Content-Type', 'application/json').end(function(e, res) {
            expect(e).to.equal(null);
            expect(res.body.name).to.equal('aaa');
            expect(res.body.test).to.equal('bbb');
            expect(res.body.uid).to.not.equal(null);
            done();
        });
    });

    it('POST test (should post new object)', function(done) {
        request.post('http://localhost:'+port+'/api/objects').send(
            '{ "firstName":"Andrey", "lastName":"Kolmogorov", "dob":"25 April 1903" }'
        ).set('Content-Type', 'application/json').end(function(e, res) {
            expect(e).to.equal(null);
            expect(res.body.firstName).to.equal('Andrey');
            expect(res.body.lastName).to.equal('Kolmogorov');
            expect(res.body.dob).to.equal('25 April 1903');
            expect(res.body.uid).to.not.equal(null);
            done();
        });
    });

    it('POST test (should fail on invalid json input)', function(done) {
        request.post('http://localhost:'+port+'/api/objects').send(
            '{}notjson'
        ).set('Content-Type', 'application/json').end(function(e, res) {
            expect(e).to.equal(null);
            expect(res.body.verb).to.equal('POST');
            expect(res.body.url).to.equal('api/objects/');
            expect(res.body.message).to.equal('Not a JSON object');
            done();
        });
    });

    it('PUT test (should update object)', function(done) {
        request.put('http://localhost:'+port+'/api/objects/000002').send(
            '{ "uid":"234637", "randKey1":"test_a", "randKey2":"test_b" }'
        ).set('Content-Type', 'application/json').end(function(e, res) {
            expect(e).to.equal(null);
            expect(res.body.uid).to.equal('234637');
            expect(res.body.randKey1).to.equal('test_a');
            expect(res.body.randKey2).to.equal('test_b');
            done();
        });
    });

    // 000002 should have had its key changed above
    it('PUT test (should fail on nonexistant object with specified uid)', function(done) {
        request.put('http://localhost:'+port+'/api/objects/000002').send(
            '{ "uid":"395993", "test_a":"test_b" }'
        ).set('Content-Type', 'application/json').end(function(e, res) {
            expect(e).to.equal(null);
            expect(res.body.verb).to.equal('PUT');
            expect(res.body.url).to.equal('api/objects/<uid>');
            expect(res.body.message).to.equal('Object with specified UID doesn\'t exist');
            done();
        });
    });

    it('PUT test (should fail on invalid json input)', function(done) {
        request.put('http://localhost:'+port+'/api/objects/000002').send(
            '{ invalid json! }'
        ).set('Content-Type', 'application/json').end(function(e, res) {
            expect(e).to.equal(null);
            expect(res.body.verb).to.equal('PUT');
            expect(res.body.url).to.equal('api/objects/<uid>');
            expect(res.body.message).to.equal('Not a JSON object');
            done();
        });
    });

    it('GET test', function(done) {

        done();
    });

    it('DELETE test', function(done) {

        done();
    });
});
