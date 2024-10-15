import { ISource, Lawnmower, Simulation } from './simulation.js';

class RamSource implements ISource {
  constructor(private readonly data: Lawnmower[] = []) {}

  async load() {
    return this.data;
  }
}

test('no lawnmowers', async () => {
  const simulation = new Simulation(new RamSource());
  await simulation.run();

  expect(simulation.getResults()).toEqual([]);
});

test('one lawnmower', async () => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 0,
        y: 0,
        direction: 'N',
        instructions: [],
      },
    ]),
  );

  await simulation.run();

  expect(simulation.getResults()).toEqual(['0 0 N']);
});

test('one lawnmower at 1 1', async () => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 1,
        y: 1,
        direction: 'N',
        instructions: [],
      },
    ]),
  );

  await simulation.run();

  expect(simulation.getResults()).toEqual(['1 1 N']);
});

test('one lawnmower looking east', async () => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 0,
        y: 0,
        direction: 'E',
        instructions: [],
      },
    ]),
  );
  await simulation.run();

  expect(simulation.getResults()).toEqual(['0 0 E']);
});

test.each([
  { direction: 'N', expectedX: 1, expectedY: 2 },
  { direction: 'E', expectedX: 2, expectedY: 1 },
  { direction: 'S', expectedX: 1, expectedY: 0 },
  { direction: 'W', expectedX: 0, expectedY: 1 },
])('moving forward', async ({ direction, expectedX, expectedY }) => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 1,
        y: 1,
        direction,
        instructions: ['A'],
      },
    ]),
  );

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
  const simulation = new Simulation(
    new RamSource([
      {
        x: 0,
        y: 0,
        direction: current,
        instructions: ['R'],
      },
    ]),
  );

  await simulation.run();

  expect(simulation.getResults()).toEqual([`0 0 ${expected}`]);
});

test.each([
  { current: 'N', expected: 'W' },
  { current: 'W', expected: 'S' },
  { current: 'S', expected: 'E' },
  { current: 'E', expected: 'N' },
])('counter clockwise rotation', async ({ current, expected }) => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 0,
        y: 0,
        direction: current,
        instructions: ['L'],
      },
    ]),
  );

  await simulation.run();

  expect(simulation.getResults()).toEqual([`0 0 ${expected}`]);
});

test('multiple instructions', async () => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 0,
        y: 0,
        direction: 'N',
        instructions: ['R', 'A'],
      },
    ]),
  );

  await simulation.run();

  expect(simulation.getResults()).toEqual(['1 0 E']);
});

test('multiple lawnmowers', async () => {
  const simulation = new Simulation(
    new RamSource([
      {
        x: 0,
        y: 0,
        direction: 'N',
        instructions: ['R', 'A'],
      },
      {
        x: 3,
        y: 3,
        direction: 'S',
        instructions: ['R', 'A'],
      },
    ]),
  );

  await simulation.run();

  expect(simulation.getResults()).toEqual(['1 0 E', '2 3 W']);
});
