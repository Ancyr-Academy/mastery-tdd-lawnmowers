// No Lawnmowers -> Expected empty output
// One Lawnmower at 0,0 -> Expected 0,0,N (Concept of Lawnmower)
// One Lawnmower at 1,1 -> Expected 1,1,N (Concept of position)
// One Lawnmower at 0,0,S -> Expected 0,0,S (Concept of direction)
// Two Lawnmowers at two positions (Concept of multiplicity)
// Concept of rotating the direction
// One Lawnmower with single command (Concept of action)
//     Note : test each command separately (clockwise rotation, anticlockwise rotation, forward)
// One Lawnmower with multiple commands (Concept of multiplicity of commands)
// Two lawnmowers with multiple commands (Concept of alternating sequences)

type Lawnmower = {
  x: number;
  y: number;
  direction: string;
  instructions: string[]
}

class Simulation {
  private lawnmowers: Lawnmower[] = [];

  run() {
    this.lawnmowers.forEach(lawnmower => {
      lawnmower.instructions.forEach(instruction => {
        if (instruction === 'F') {
          lawnmower.y += 1;
        } else if (instruction === 'R') {
          lawnmower.direction = this.clockWiseNextDirection(this.lawnmowers[0].direction)
        } else if (instruction === 'L') {
          lawnmower.direction = this.counterClockwiseNextDirection(this.lawnmowers[0].direction)
        }
      })
    })

    return this.lawnmowers.map(l => `${l.x},${l.y},${l.direction}`);
  }

  addLawnmower(x: number, y: number, direction: string = 'N') {
    this.lawnmowers.push({ x, y, direction, instructions: []});
  }

  addInstruction(instruction: string) {
    this.lawnmowers[this.lawnmowers.length - 1].instructions.push(instruction);
  }

  private clockWiseNextDirection(direction: string) {
    if (direction === 'N') {
      return 'E';
    } else if (direction === 'E') {
      return 'S';
    } else if (direction === 'S') {
      return 'W';
    } else if (direction === 'W') {
      return 'N';
    }

    throw new Error('Not supported');
  }

  private counterClockwiseNextDirection(direction: string) {
    if (direction === 'N') {
      return 'W';
    } else if (direction === 'W') {
      return 'S';
    } else if (direction === 'S') {
      return 'E';
    } else if (direction === 'E') {
      return 'N';
    }

    throw new Error('Not supported');
  }
}

// Where do lawnmowers come from ?
// What's a lawnmower ? An object ? a data-structure ?

test('no lawnmowers', () => {
  const simulation = new Simulation();
  expect(simulation.run()).toEqual([]);
})

test('one lawnmower', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0);

  expect(simulation.run()).toEqual(['0,0,N']);
})

test('one lawnmower with a specific position', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(1, 1);

  expect(simulation.run()).toEqual(['1,1,N']);
})

test('one lawnmower with a specific position and direction', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(1, 1, 'S');

  expect(simulation.run()).toEqual(['1,1,S']);
})

test('two lawnmowers', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0, 'N');
  simulation.addLawnmower(1, 1, 'S');

  expect(simulation.run()).toEqual(['0,0,N', '1,1,S']);
})

test('one lawnmower moving forward', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0, 'N');
  simulation.addInstruction('F');

  expect(simulation.run()).toEqual(['0,1,N']);
})

test.each([
  { direction: 'N', expected: 'E' },
  { direction: 'E', expected: 'S' },
  { direction: 'S', expected: 'W' },
  { direction: 'W', expected: 'N' }
])('rotating clockwise from %s to %s', ({ direction, expected }) => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0, direction);
  simulation.addInstruction('R');

  expect(simulation.run()).toEqual(['0,0,' + expected]);
});

test.each([
  { direction: 'N', expected: 'W' },
  { direction: 'W', expected: 'S' },
  { direction: 'S', expected: 'E' },
  { direction: 'E', expected: 'N' }
])('rotating counterclockwise from %s to %s', ({ direction, expected }) => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0, direction);
  simulation.addInstruction('L');

  expect(simulation.run()).toEqual(['0,0,' + expected]);
});

test('multiple instructions', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0, 'N');
  simulation.addInstruction('F');
  simulation.addInstruction('R');

  expect(simulation.run()).toEqual(['0,1,E']);
})
test('multiple lawnmowers, one instruction each', () => {
  const simulation = new Simulation();
  simulation.addLawnmower(0, 0, 'N');
  simulation.addInstruction('F');
  simulation.addLawnmower(1, 0, 'N');
  simulation.addInstruction('F');

  expect(simulation.run()).toEqual([
    '0,1,N',
    '1,1,N'
  ]);
})