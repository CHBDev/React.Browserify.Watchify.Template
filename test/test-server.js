
var server = require('../server.js');
var request = require('co-supertest').agent(server.listen());
var expect = require('chai').expect;


describe('The Server', function(){

  beforeEach(function(done){
    //do stuff before each test
    done();
  });

  afterEach(function(done){
    //do stuff after each test
    done();
  })

  it('should do something', function*(){
    expect(server).to.exist;
  });

  it('should do something else', function*(){
    expect(server).to.exist;
  });

  it('should do something', function*(){
    expect(server).to.exist;
  });

  it('should do something else', function*(){
    expect(server).to.exist;
  });

  it('should do something', function*(){
    expect(server).to.exist;
  });

  it('should do something else', function*(){
    expect(server).to.exist;
  });

  it("should get a response at '/'", function*(){
    var res = yield request.get('/').expect(200).end();
    expect(res).to.exist;
  });

});

describe('The Client', function(){

  beforeEach(function(done){
    //do stuff before each test
    done();
  });

  afterEach(function(done){
    //do stuff after each test
    done();
  })

  it('should do something', function*(){
    expect(server).to.exist;
  });

  it('should do something else', function*(){
    expect(server).to.exist;
  });

  it('should do something', function*(){
    expect(server).to.exist;
  });

  it('should do something else', function*(){
    expect(server).to.exist;
  });

  it('should do something', function*(){
    expect(server).to.exist;
  });

  it('should do something else', function*(){
    expect(server).to.exist;
  });

});