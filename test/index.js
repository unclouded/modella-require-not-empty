var expect = require('expect.js');
var model = require('modella');
var requireNotEmpty = require('../');

describe('require not empty validator', function(){

  var TestModel;

  beforeEach(function(){
    TestModel = model('TestModel')

    TestModel
      .attr('title', { type: 'string', required: true })
      .attr('description', { type: 'string' })
      .use(requireNotEmpty)
  })

  it('can be added to a model', function(){
    var model = new TestModel();
    expect(model).to.be.ok();
  })

  it('should be valid if value passed', function(){
    var model = new TestModel({ title: 'something' })
    expect(model).to.be.ok();
    expect(model.isValid()).to.be.equal(true);
  })

  it('should be invalid if value not passed', function(){
    var model = new TestModel({ description: 'something' })
    expect(model).to.be.ok();
    expect(model.isValid()).to.be.equal(false);
    expect(model.errors).to.be.ok();
    expect(model.errors.length).to.equal(1);
    expect(model.errors[0]).to.eql({ attr: 'title', message: 'field required' })
  })

  it('should be invalid if value is empty string', function(){
    var model = new TestModel({ title: '' })
    expect(model).to.be.ok();
    expect(model.isValid()).to.be.equal(false);
    expect(model.errors).to.be.ok();
    expect(model.errors.length).to.equal(1);
    expect(model.errors[0]).to.eql({ attr: 'title', message: 'required field is empty' })
  })

})