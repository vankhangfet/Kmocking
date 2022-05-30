const assert = require('assert');
const { Exact, Times } = require('../KMocking');
const KMock = require('../KMocking');


describe('Verify Setup function', function () {
  describe('Invoke target function', function () {
    it('Target function shoul be invoked 1 times', function () {
      let Dog = function(){
          
          return{
           eat: function(food){
              return food;
      
           },
           say: function ()
           {
               return "hello";
           }
          }
      }
      
      let mock = KMock.Mock();

      let dog = new Dog();
      
      let mockDog = mock.mole(dog);

      mockDog.setup(_dogmock => _dogmock.eat("candy")).returns('Yummy');
      mockDog.setup(_dogmock => _dogmock.say("hi")).returns('hello');
     
      dog.eat("chocolate");
      dog.eat("chocolate");
      dog.eat("chocolate");
      

      let isVerify = mockDog.verify(_dogmock => _dogmock.eat("candy"),Times.exact(0));
      assert.equal(isVerify, false);

      let isVerify2 = mockDog.verify(_dogmock => _dogmock.eat("candy"),Times.atLeast(1));
      assert.equal(isVerify2, true);

      let isVerify3 = mockDog.verify(_dogmock => _dogmock.eat("candy"),Times.exact(3));
      assert.equal(isVerify3, true);
       
      dog.say("hi");
      dog.say("hi");
      let isVerify4 = mockDog.verify(_dogmock => _dogmock.say("hi"),Times.exact(2));
     
      assert.equal(isVerify4, true);

   });
  });
});


describe('Verify Setup function', function () {
    describe('Should return value of function as mocking value', function () {
      it('Returns function should return Yummy', function () {
        let Dog = function(){
            
            return{

             eat: function(food){
                //console.log(food);
                return food;
        
             },
             say: function ()
             {
                 return "hello";
             }
            }
        }
        
        let mock = KMock.Mock();

        let dog = new Dog();
        
        let mockDog = mock.mole(dog);

        mockDog.setup(_dogmock => _dogmock.eat("candy")).returns('Yummy');
        mockDog.setup(_dogmock => _dogmock.say("hi")).returns('chao');

        let result = dog.eat("chocolate");
        assert.equal(result, 'Yummy');

        let result2 = dog.say("hello");
        assert.equal(result2, 'chao');
        
        let result3 = dog.eat("chocolate");
        assert.equal(result3, 'Yummy');
     });
    });
  });
  