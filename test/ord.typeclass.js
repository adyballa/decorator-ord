'use strict';

let should = require('chai').should(),
  expect = require('chai').expect,
  ord = require('../dist/ord.typeclass'),
  ordAnd = require('../dist/ord.and.typeclass'),
  countBorder = require('../dist/count.record'),
  borderBorder = require('../dist/border.record'),
  testSubject = [], testConfig
  ;

const Colors = ['yellow', 'red', 'blue'];
function TestSubject(color,age){
  this.color=color;
  this.age=age
}

testConfig = new ord.OrdConfig();

ord.Ord.field({ordinality:1, map:Colors})(TestSubject,'color');
ord.Ord.field({ordinality:2})(TestSubject,'age');
ord.Ord.implement({config:testConfig})(TestSubject);

testSubject.push(new TestSubject("yellow",1));
testSubject.push(new TestSubject("yellow",14));
testSubject.push(new TestSubject("red",13));
testSubject.push(new TestSubject("red",10));
testSubject.push(new TestSubject("blue",2));

describe('#decorate', function() {

  it('is config correct initialized', function () {
    testConfig.fields.length.should.equal(2);
    testConfig.fields[1].name.should.equal("age");
    testConfig.fields[0].name.should.equal("color");
  });

  it('correct implementation', function () {
    expect(() => ord.Ord.greater(testSubject, new TestSubject(null, 2))).to.throw(Error);
    expect(() => ord.Ord.less(testSubject, new TestSubject('yellow', null))).to.throw(Error);
  });
});

describe('#OrdLib', function() {
  it('is greater with null correct', function () {
    ord.Ord.greater(testSubject, new TestSubject(null, 10), testConfig).should.deep.equal(testSubject.slice(1, 3), "Age Field must be last testsubject with 2");
    ord.Ord.greater(testSubject, new TestSubject("yellow", null), testConfig).should.deep.equal(testSubject.slice(2, 5), "Ord greater yellow muss reveal red and blues");
  });

  it('is greater correct', function () {
    ord.Ord.greater(testSubject, new TestSubject("yellow", 13), testConfig).should.deep.equal(testSubject.slice(1, 5), "Ord greater yellow with age 13 must reveal one yellow and all other colors.");
    ord.Ord.greater(testSubject, new TestSubject("red", 10), testConfig).should.deep.equal(testSubject.slice(2, 3).concat(testSubject.slice(4, 5)), "Ord greater red with age 10 must reveal all reds with age grater than 10 and all blues.");
    ord.Ord.greater(testSubject, new TestSubject("blue", 2), testConfig).should.deep.equal([], "nothing matches");
  });

  it('is less with null correct', function () {
    ord.Ord.less(testSubject, new TestSubject("yellow", null), testConfig).should.deep.equal([], "Less yellow search muss reveal nothing");
    ord.Ord.less(testSubject, new TestSubject(null, 13), testConfig).should.deep.equal(testSubject.slice(0, 1).concat(testSubject.slice(3, 5)), "reveal all objects with age less than 13");
  });

  it('is less correct', function () {
    ord.Ord.less(testSubject, new TestSubject("red", 10), testConfig).should.deep.equal(testSubject.slice(0, 2), "all yellows");
    ord.Ord.less(testSubject, new TestSubject("yellow", 14), testConfig).should.deep.equal(testSubject.slice(0, 1), "reveals first element");
    ord.Ord.less(testSubject, new TestSubject("yellow", 1), testConfig).should.deep.equal([], "nothing matches");
  });

  it('is sort correct', function () {
    let _t = testSubject.slice(0,2);
    _t.push(testSubject[3]);
    _t.push(testSubject[2]);
    _t.push(testSubject[4]);

    ord.Ord.sort(testSubject, testConfig).should.deep.equal(_t, 'sort must order for color and than for age');
  });

  it('is inRange correct', function () {
    let top = new TestSubject("red",15), bottom = new TestSubject("yellow", 3);
    ord.Ord.inRange(testSubject, top, bottom, testConfig).should.deep.equal(testSubject.slice(1,4), "Everything between yellow,3 and red,15");
  });
});

describe('#OrdConfig', function() {
  let cloneConfig;

  it('cloning', function(){
    cloneConfig = testConfig.clone();
    cloneConfig.ordFields[0].dir = "DESC";
    testConfig.ordFields[0].dir.should.equal("ASC", "Source must not change");
  });

  it('check change dir', function () {
    let _t=testSubject.slice(4,5);
    _t.push(testSubject[3]);
    _t.push(testSubject[2]);
    _t = _t.concat(testSubject.slice(0,2));
    ord.Ord.sort(testSubject, cloneConfig).should.deep.equal(_t, "Sort with descending color order");
  });

  it('check change ordinality', function () {
    let _t=testSubject.slice(0,1);
    _t.push(testSubject[4]);
    _t.push(testSubject[3]);
    _t.push(testSubject[2]);
    _t.push(testSubject[1]);
    ord.OrdConfig.setOrdnialityOfField('age', cloneConfig.ordFields, 0);
    ord.Ord.sort(testSubject, cloneConfig).should.deep.equal(_t, "Different order. Age has higher ordinality as color.");
  });
});

describe('#OrdAnd', function() {
  it('check OrdAnd', function () {

    const TestAndSubject = TestSubject, testAndSubject = [],
      testAndConfig = new ord.OrdConfig(),
      bottom = new TestAndSubject("yellow", 3),
      top = new TestAndSubject("blue", 8)
      ;

    ordAnd.OrdAnd.field({ordinality:1, map:Colors})(TestAndSubject,'color');
    ordAnd.OrdAnd.field({ordinality:2})(TestAndSubject,'age');
    ordAnd.OrdAnd.implement({config:testAndConfig})(TestAndSubject);

    testAndSubject.push(new TestSubject("yellow",1));
    testAndSubject.push(new TestSubject("yellow",9));
    testAndSubject.push(new TestSubject("yellow",4));
    testAndSubject.push(new TestSubject("red",6));
    testAndSubject.push(new TestSubject("red",8));
    testAndSubject.push(new TestSubject("red",9));
    testAndSubject.push(new TestSubject("blue",2));

    ord.Ord.inRange(testAndSubject, top, bottom, testConfig).should.deep.equal(
      testAndSubject.slice(2,5),
      "And-Search: All properties must fullfill the condition"
    );
  });
});

describe('#CountRecord', function() {
  it('check CountRecord', function () {
    const c = new countBorder.CountRecord();
    c.recordOrdConfig(testSubject,testConfig);
    c.play('color','eq','yellow').should.equal(2, "there have to be 2 yellows");
    c.play('age','eq','3').should.equal(0, "there is no age 3");
  });
});

describe('#BorderRecord', function() {
  it('check BorderRecord', function () {
    const b = new borderBorder.BorderRecord();
    b.recordOrdConfig(testSubject,testConfig);
    b.play('color','eq','min').should.equal('yellow', 'Minimal color is yellow');
    b.play('color','eq','max').should.equal('blue', 'Minimal color is blue');
    b.play('age','eq','max').should.equal(14,'Maximum age is 14');
  });
});
