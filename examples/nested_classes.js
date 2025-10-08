// Nested classes example
class Engine {
  constructor(power) {
    this.power = power;
  }
  start() {
    return `Engine with ${this.power}hp started.`;
  }
}

class Car {
  constructor(model, engine) {
    this.model = model;
    this.engine = engine;
  }
  drive() {
    return `${this.model} drives. ${this.engine.start()}`;
  }
}

const myCar = new Car("Model S", new Engine(670));
console.log(myCar.drive());
