// [Migrated to TypeScript]
class Engine {
  power: number;
  constructor(power: number) {
    this.power = power;
  }
  start(): string {
    return `Engine with ${this.power}hp started.`;
  }
}

class Car {
  model: string;
  engine: Engine;
  constructor(model: string, engine: Engine) {
    this.model = model;
    this.engine = engine;
  }
  drive(): string {
    return `${this.model} drives. ${this.engine.start()}`;
  }
}

const myCar: Car = new Car("Model S", new Engine(670));
console.log(myCar.drive());
