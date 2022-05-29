
let helper  = require('./util');
let KMock = require('./KMocking');

//console.log(helper.Add(1,2));
//console.log("Hello mocking!")

let mock = KMock.Mock(helper);


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

let dog = new Dog();
//dog.eat("candy");

let mockDog = mock.mole(dog);

mockDog.setup(_dogmock => _dogmock.eat("candy")).returns('Yummy Yummy Yummy')
mockDog.setup(_dogmock => _dogmock.say("hi")).returns('hi KMocking');

//console.log(mock.setup(dog => dog.eat("candy")).returns("hello"));
let result = dog.eat("chocolate");
let say = dog.say("hello");
console.log(say);
console.log(result);




