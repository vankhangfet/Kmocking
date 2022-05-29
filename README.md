# Kmocking
Kmocking is lightweight mocking lib.

Kmocking inspired by the Moq library for .Net.

Example
  ```js
  const KMock = require('KMocking');
 
  let mock = KMock.Mock();

  // Create some object instance
  let dog = new Dog();

  // Create a mole for the object
  let mockDog = mock.mole(dog);

  // Setup behavior
  mole.setup(_dog => _dog.eat('meat')).returns('Yum yum yum');

  // Invoke
  let result = dog.eat('meat');
  ```
