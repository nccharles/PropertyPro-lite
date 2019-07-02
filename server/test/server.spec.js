import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../server";

chai.use(chaiHTTP);

describe("TEST server", () => {
  it("It should return welcome message", done => {
    chai
      .request(server)
      .get("/")
      .end(res => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Welcome to PropertyPro-Lite");
        done();
      });
  });
});
