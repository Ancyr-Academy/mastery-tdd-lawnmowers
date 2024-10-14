// Aucune tondeuse
// Une seule tondeuse à la position 0,0,N
// Une seule tondeuse à la position 1,1,N
// Une seule tondeuse à la position 0,0,E
//  -> Instructions
//    Une seule instruction -> Avancer
//    Rotation Horaire
//    Rotation Antihoraire

// Plusieurs instructions
//  -> Plusieurs tondeuses

interface ISource {
  load(): Promise<string[]>;
}

class RamSource implements ISource {
  constructor(private readonly data: string[] = []) {}

  async load() {
    return this.data;
  }
}

type Lawnmower = {
  x: number;
  y: number;
  direction: string;
  instructions: string[];
};

class Simulation {
  private lawnmowers: Lawnmower[] = [];

  constructor(private readonly source: ISource) {}

  async run() {
    this.lawnmowers.forEach((lawnmower) => {
      lawnmower.instructions.forEach((instruction) => {
        if (instruction === 'A') {
          this.forward(lawnmower);
        } else if (instruction === 'R') {
          this.clockwiseRotate(lawnmower);
        } else if (instruction === 'L') {
          this.counterClockwiseRotation(lawnmower);
        }
      });
    });
  }

  getResults() {
    return this.lawnmowers.map(
      (lawnmower) => `${lawnmower.x} ${lawnmower.y} ${lawnmower.direction}`,
    );
  }

  addLawnmower(
    x: number,
    y: number,
    direction: string,
    instructions: string[] = [],
  ) {
    this.lawnmowers.push({
      x,
      y,
      direction,
      instructions,
    });
  }

  private forward(lawnmower: Lawnmower) {
    if (lawnmower.direction === 'N') {
      lawnmower.y += 1;
    } else if (lawnmower.direction === 'E') {
      lawnmower.x += 1;
    } else if (lawnmower.direction === 'S') {
      lawnmower.y -= 1;
    } else if (lawnmower.direction === 'W') {
      lawnmower.x -= 1;
    }
  }

  private clockwiseRotate(lawnmower: Lawnmower) {
    if (lawnmower.direction === 'N') {
      lawnmower.direction = 'E';
    } else if (lawnmower.direction === 'E') {
      lawnmower.direction = 'S';
    } else if (lawnmower.direction === 'S') {
      lawnmower.direction = 'W';
    } else if (lawnmower.direction === 'W') {
      lawnmower.direction = 'N';
    }
  }

  private counterClockwiseRotation(lawnmower: Lawnmower) {
    if (lawnmower.direction === 'N') {
      lawnmower.direction = 'W';
    } else if (lawnmower.direction === 'W') {
      lawnmower.direction = 'S';
    } else if (lawnmower.direction === 'S') {
      lawnmower.direction = 'E';
    } else if (lawnmower.direction === 'E') {
      lawnmower.direction = 'N';
    }
  }
}

test('no lawnmowers', async () => {
  const simulation = new Simulation(new RamSource());
  await simulation.run();

  expect(simulation.getResults()).toEqual([]);
});

test('one lawnmower', async () => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(0, 0, 'N');
  await simulation.run();

  expect(simulation.getResults()).toEqual(['0 0 N']);
});

test('one lawnmower at 1 1', async () => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(1, 1, 'N');
  await simulation.run();

  expect(simulation.getResults()).toEqual(['1 1 N']);
});

test('one lawnmower looking east', async () => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(0, 0, 'E');
  await simulation.run();

  expect(simulation.getResults()).toEqual(['0 0 E']);
});

test.each([
  { direction: 'N', expectedX: 1, expectedY: 2 },
  { direction: 'E', expectedX: 2, expectedY: 1 },
  { direction: 'S', expectedX: 1, expectedY: 0 },
  { direction: 'W', expectedX: 0, expectedY: 1 },
])('moving forward', async ({ direction, expectedX, expectedY }) => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(1, 1, direction, ['A']);
  await simulation.run();

  expect(simulation.getResults()).toEqual([
    `${expectedX} ${expectedY} ${direction}`,
  ]);
});

test.each([
  { current: 'N', expected: 'E' },
  { current: 'E', expected: 'S' },
  { current: 'S', expected: 'W' },
  { current: 'W', expected: 'N' },
])('clockwise rotation', async ({ current, expected }) => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(0, 0, current, ['R']);
  await simulation.run();

  expect(simulation.getResults()).toEqual([`0 0 ${expected}`]);
});

test.each([
  { current: 'N', expected: 'W' },
  { current: 'W', expected: 'S' },
  { current: 'S', expected: 'E' },
  { current: 'E', expected: 'N' },
])('counter clockwise rotation', async ({ current, expected }) => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(0, 0, current, ['L']);
  await simulation.run();

  expect(simulation.getResults()).toEqual([`0 0 ${expected}`]);
});

test('multiple instructions', async () => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(0, 0, 'N', ['R', 'A']);
  await simulation.run();

  expect(simulation.getResults()).toEqual(['1 0 E']);
});

test('multiple lawnmowers', async () => {
  const simulation = new Simulation(new RamSource());
  simulation.addLawnmower(0, 0, 'N', ['R', 'A']);
  simulation.addLawnmower(3, 3, 'S', ['R', 'A']);
  await simulation.run();

  expect(simulation.getResults()).toEqual(['1 0 E', '2 3 W']);
});
