const assert = require('assert');
const KMock = require('../KMocking');

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
       
     });
    });
  });