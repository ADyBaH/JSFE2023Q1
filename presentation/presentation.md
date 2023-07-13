[Video Presentation](https://youtu.be/kC617KDA6bE)
[Reveal presentation's deploy](https://rolling-scopes-school.github.io/adybah-JSFE2023Q1/presentation/reveal/)

# Inheritance vs Composition

Hello and welcome to my presentation about Inheritance vs Composition

## Preface

We often have to expand the class, and for many years there have been disputes what best to do this, uses inheritance or composition.

Let's try to figure it out today, but first let's find out what inheritance and composition.

### Problems

We need to create several shapes and color them in the same color.

We can create a Shape class and pass properties there when creating it.


```js
// let's write class Shape
class Shape {
  constructor(shape, color) {
    // the constructor will take two arguments, a shape and a color
    this.shape = shape;
    this.color = color;
  }
}

// then we will create three instances of the Shape
const circle = new Shape("circle", "red");
const square = new Shape("square", "red");
const triangle = new Shape("triangle", "red");
```

When we need to change the color of these shapes, we will have to change it manually for each instance of the class.

If there are a lot of figures, this task will take a lot of time, and we need to rewrite this code in a good way.


```js
circle.color = "white";
square.color = "white";
triangle.color = "white";
```

### Inheritance

To solve this problem, inheritance can come to our aid.

Using the extends keyword, we instruct JavaScript to inherit fields and methods from the class.

```js
// Now we are creating a Color class
class Color {
  color = "white";
}
// and inherit from him
class Shape extends Color {
  constructor(shape) {
    // call super to get the fields
    // and methods of the inherited class
    super();
    this.shape = shape;
  }
}

// all instances of the Shape class received a color field
const circle = new Shape("circle");
circle.color; // white

const square = new Shape("square");
square.color; // white

const triangle = new Shape("triangle");
triangle.color; // white
```

And now we can change the color in the Color class and all the shapes will change it.


```js
// change the color field in the Color class,
class Color {
  color = "black";
}

class Shape extends Color {
  constructor(shape) {
    super();
    this.shape = shape;
  }
}

const circle = new Shape("circle");
const square = new Shape("square");
const triangle = new Shape("triangle");

// and all instances of the Shape class will change it
circle.color; // black
square.color; // black
triangle.color; // black
```

OK, inheritance works, but what about composition?


### Composition

Composition allows you to create complex class by combining objects.

Simply put, the composition contains instances of other classes that implement the desired functionality.


```js
// Creating the Color class again
class Color {
  color = "white";
}

class Shape {
  // But we declare the instance of the Color class in Shape
  colorInstance = new Color();
  constructor(shape) {
    this.shape = shape;
  }
}

const circle = new Shape("circle");
circle.colorInstance.color; // white

const square = new Shape("square");
square.colorInstance.color; // white

const triangle = new Shape("triangle");
triangle.colorInstance.color; // white
```

if we do not take into account the additional dot notation, then we get the same result.

But what's the difference?


### Difference between inheritance and composition
The main difference between inheritance and composition is the relationship between objects.

An inheritance relations, named Is-a. For example, a car is a vehicle.

An composition relation, named Has-a. For example, a car has a engine.


Inheritance is known as the closest form of communication in object-oriented programming.

Changing a base class can cause unwanted side effects in its subclasses or even in the entire codebase.

Composition is a much weaker connection. In combination with Dependency injection, it provides more flexibility, and also allows us to change the behavior during the execution of the program.

When creating a class that combines various components, it is more natural to use composition than to try to find commonality between them and create a class tree.


This approach makes it easier to adapt to future changes in requirements, which may require a complete restructuring of the class tree in the inheritance approach. We can simply add a new component to the merged class, rather than modify the superclass to adapt the changes.


They also differ in purpose.

Inheritance: Constructing a class based on what it is.

Composition: Creating a class based on what it does.

In most cases, composition can be used interchangeably with inheritance.

#### Encapsulation

Both methods give us the opportunity to reuse the code, but inheritance violates the principle of encapsulation. The fact is that the subclass has a dependency on the behavior of the parent class. If the parent class changes its behavior, it will affect its descendants, which may eventually break the program.

#### Name conflict

Let's imagine that both of our classes have the same fields and methods.

```js
// create a Color class with the id field and the log method
class Color {
  id = "colorId";
  color = "white";

  log() {
    return "from color";
  }
}
// Create a Shape class with the id field and the log method and
// inherit the fields and methods of the Color class
class Shape extends Color {
  id = "shapeId";
  constructor(shape) {
    super();
    this.shape = shape;
  }

  log() {
    return "from shape";
  }
}

// The Shape fields and methods will overwrite the Color fields and
// methods, which may cause errors that are difficult to find.
const circle = new Shape("circle");
circle.id; // shapeId
circle.log(); // from shape
```

When we use a composition, this will not happen.

```js
// The same classes again
class Color {
  id = "colorId";
  color = "white";

  log() {
    return "from color";
  }
}

class Shape {
  // But the logic of the Color instance will be encapsulated
  colorInstance = new Color();
  id = "shapeId";
  constructor(shape) {
    this.shape = shape;
  }

  log() {
    return "from shape";
  }
}
// And we will get personal fields and methods for each class
const circle = new Shape("circle");
circle.colorInstance.color; // white

circle.colorInstance.id; // colorId
circle.id; // shapeId

circle.colorInstance.log(); // from shape
circle.log(); // from color
```


### Afterword

Perhaps this is all I would like to tell you about the differences between inheritance and composition. Yes, both techniques serve the same purpose — to reuse code. Only here they do it in different ways. Composition gives us the ability to protect a reusable class from clients, while inheritance does not guarantee this. But despite this, in some cases inheritance is simply necessary. For example, if you create classes from the same family.

#### Goodbye
That's it for me, thanks for reading.
Goodbye.