import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing welcome endpoints', () => {
  it('should accept status 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect((res.status)).to.equal(200);
        done();
      });
  });
  it('should insert user data to the memory', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'charles@gmail.com',
        first_name: 'Charles',
        last_name: 'NDAYISABA',
        password: 'ncinhouse',
        phoneNumber: '0784603404',
        address: 'KK 15 RD'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.be.a('number');
        expect((res.body)).to.be.an('object');
        expect((res.body.data.token)).to.be.a('string');
        expect((res.body.data.id)).to.be.a('number');
        expect((res.body.data.first_name)).to.be.a('string');
        expect((res.body.data.last_name)).to.be.a('string');
        expect((res.body.data.email)).to.be.a('string');
        expect((res.body.data.phoneNumber)).to.be.a('string');
        expect((res.body.data.address)).to.be.a('string');
        done();
      });
  });
  it('should allow user to login if exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'nccharles1@gmail.com',
        password: 'ncinhouse'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.a('number');
        expect(res.body).to.be.an('object');
        expect((res.body.data)).to.be.an('object');
        expect((res.body.data.email)).to.be.a('string');
        expect((res.body.data.first_name)).to.be.a('string');
        expect((res.body.data.last_name)).to.be.a('string');
        expect((res.body.data.token)).to.be.a('string');
        expect((res.body.data.id)).to.be.a('number');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body).to.haveOwnProperty('status').to.be.a('string');
        expect(res.body).to.haveOwnProperty('data').to.be.an('object');

        done();
      });
  });
})