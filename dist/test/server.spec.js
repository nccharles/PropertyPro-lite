"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("dotenv/config");

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var userToken = null;
describe('Testing welcome endpoints', function () {
  it('should accept status 200', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should insert user data to the memory', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send({
      email: 'chris@gmail.com',
      first_name: 'Charles',
      last_name: 'NDAYISABA',
      password: 'ncinhouse',
      phoneNumber: '0784603404',
      address: 'KK 15 RD'
    }).end(function (err, res) {
      userToken = res.body.data.token;
      if (err) return done(err);
      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.be.a('number');
      expect(res.body).to.be.an('object');
      expect(res.body.data.token).to.be.a('string');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.first_name).to.be.a('string');
      expect(res.body.data.last_name).to.be.a('string');
      expect(res.body.data.email).to.be.a('string');
      expect(res.body.data.phoneNumber).to.be.a('string');
      expect(res.body.data.address).to.be.a('string');
      done();
    });
  });
  it('should allow user to login if exist', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send({
      email: 'nccharles1@gmail.com',
      password: 'ncinhouse'
    }).end(function (err, res) {
      if (err) return done(err);
      expect(res.status).to.be.a('number');
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.email).to.be.a('string');
      expect(res.body.data.first_name).to.be.a('string');
      expect(res.body.data.last_name).to.be.a('string');
      expect(res.body.data.token).to.be.a('string');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body).to.haveOwnProperty('status');
      expect(res.body).to.haveOwnProperty('status').to.be.a('string');
      expect(res.body).to.haveOwnProperty('data').to.be.an('object');
      done();
    });
  });
});
describe('TESTING PROPERTY ENDPOINTS', function () {
  it('should save property advert details provided by user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/property').set('Authorization', "Bearer ".concat(userToken)).field('price', 4200000).field('state', 'Kigali').field('city', 'Kigali').field('address', 'Kicukiro, KK 15 Road').field('type', '2-bedroom').field('image', 'https://images.io/123').end(function (err, res) {
      if (err) {
        done(err);
      }

      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.be.a('number');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('success');
      expect(res.body).to.have.ownProperty('data').to.be.an('object');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.status).to.be.a('string');
      expect(res.body.data.state).to.be.a('string');
      expect(res.body.data.type).to.be.a('string');
      expect(res.body.data.city).to.be.a('string');
      expect(res.body.data.address).to.be.a('string');
      expect(res.body.data.image_url).to.be.a('string');
      expect(res.body.data.price).to.be.a('number');
      done();
    });
  });
  it('should update property advert details provided by user', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/property/3').set('Authorization', "Bearer ".concat(userToken)).field('price', 6500000).field('state', 'Rwanda').field('city', 'Musanze').field('address', 'Musanze Market').field('type', '3-bedroom').field('image', 'https://images.io/123').end(function (err, res) {
      if (err) {
        done(err);
      }

      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('success');
      expect(res.body).to.have.ownProperty('data').to.be.an('object');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.status).to.be.a('string');
      expect(res.body.data.state).to.be.a('string');
      expect(res.body.data.type).to.be.a('string');
      expect(res.body.data.city).to.be.a('string');
      expect(res.body.data.address).to.be.a('string');
      expect(res.body.data.image_url).to.be.a('string');
      expect(res.body.data.price).to.be.a('number');
      done();
    });
  });
  it('should get all properties posted on the app', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/property').end(function (err, res) {
      if (err) done(err);
      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('success');
      expect(res.body).to.have.ownProperty('data').to.be.an('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].status).to.be.a('string');
      expect(res.body.data[0].state).to.be.a('string');
      expect(res.body.data[0].type).to.be.a('string');
      expect(res.body.data[0].city).to.be.a('string');
      expect(res.body.data[0].address).to.be.a('string');
      expect(res.body.data[0].image_url).to.be.a('string');
      expect(res.body.data[0].price).to.be.a('number');
      expect(res.body.data[0].ownerEmail).to.be.a('string');
      expect(res.body.data[0].ownerPhoneNumber).to.be.a('string');
      done();
    });
  });
  it('should get all specific property types', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/property?type=2-bedroom').end(function (err, res) {
      if (err) done(err);
      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('success');
      expect(res.body).to.have.ownProperty('data').to.be.an('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].status).to.be.a('string');
      expect(res.body.data[0].state).to.be.a('string');
      expect(res.body.data[0].type).to.be.a('string');
      expect(res.body.data[0].city).to.be.a('string');
      expect(res.body.data[0].address).to.be.a('string');
      expect(res.body.data[0].image_url).to.be.a('string');
      expect(res.body.data[0].price).to.be.a('number');
      expect(res.body.data[0].ownerEmail).to.be.a('string');
      expect(res.body.data[0].ownerPhoneNumber).to.be.a('string');
      done();
    });
  });
  it('should retrieve a Specific Property', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/property/1').end(function (err, res) {
      if (err) done(err);
      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('success');
      expect(res.body).to.have.ownProperty('data').to.be.an('object');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.status).to.be.a('string');
      expect(res.body.data.state).to.be.a('string');
      expect(res.body.data.type).to.be.a('string');
      expect(res.body.data.city).to.be.a('string');
      expect(res.body.data.address).to.be.a('string');
      expect(res.body.data.image_url).to.be.a('string');
      expect(res.body.data.price).to.be.a('number');
      expect(res.body.data.ownerEmail).to.be.a('string');
      expect(res.body.data.ownerPhoneNumber).to.be.a('string');
      done();
    });
  });
  it('should update property as Sold', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/property/3/sold').set('Authorization', "Bearer ".concat(userToken)).end(function (err, res) {
      if (err) done(err);
      expect(res.body).to.have.keys('status', 'data');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('success');
      expect(res.body).to.have.ownProperty('data').to.be.an('object');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.status).to.be.a('string');
      expect(res.body.data.state).to.be.a('string');
      expect(res.body.data.type).to.be.a('string');
      expect(res.body.data.city).to.be.a('string');
      expect(res.body.data.address).to.be.a('string');
      expect(res.body.data.image_url).to.be.a('string');
      expect(res.body.data.price).to.be.a('number');
      done();
    });
  });
  it('should delete a property', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/v1/property/4').set('Authorization', "Bearer ".concat(userToken)).end(function (err, res) {
      if (err) done(err);
      expect(res.status).to.be.a('number');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('error');
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.be.a('string');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.message).to.be.an('string');
      done();
    });
  });
  it('should return message if property ID does not exist', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/v1/property/45').set('Authorization', "Bearer ".concat(userToken)).end(function (err, res) {
      if (err) done(err);
      expect(res.body).to.have.keys('status', 'error');
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.ownProperty('status').that.equals('error');
      expect(res.body.status).to.be.a('string');
      expect(res.body.error).to.be.a('string');
      done();
    });
  });
});
//# sourceMappingURL=server.spec.js.map