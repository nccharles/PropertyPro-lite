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
        email: 'nccharles1@gmail.com',
        first_name: 'Charles',
        last_name: 'NDAYISABA',
        password: 'ncinhouse',
        phoneNumber: '0784603404',
        address: 'KK 15 RD'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect((res.body)).to.be.an('object');
        expect((res.body.token)).to.be.a('string');
        expect((res.body.id)).to.be.a('number');
        expect((res.body.first_name)).to.be.a('string');
        expect((res.body.last_name)).to.be.a('string');
        expect((res.body.email)).to.be.a('string');
        expect((res.body.phoneNumber)).to.be.a('string');
        expect((res.body.address)).to.be.a('string');
        done();
      });
  });
})