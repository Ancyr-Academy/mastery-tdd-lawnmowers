import { FileSource } from './file-source.js';

test('empty file', () => {
  const fileSource = new FileSource();
  expect(fileSource.parse([])).toEqual([]);
});

test('surface only', () => {
  const fileSource = new FileSource();
  expect(fileSource.parse(['5 5'])).toEqual([]);
});

test('one lawnmower but no instructions', () => {
  const fileSource = new FileSource();
  expect(fileSource.parse(['5 5', '0 0 N'])).toEqual([
    {
      x: 0,
      y: 0,
      direction: 'N',
      instructions: [],
    },
  ]);
});

test('one lawnmower with one instruction', () => {
  const fileSource = new FileSource();
  expect(fileSource.parse(['5 5', '0 0 N', 'A'])).toEqual([
    {
      x: 0,
      y: 0,
      direction: 'N',
      instructions: ['A'],
    },
  ]);
});

test('one lawnmower with many instructions', () => {
  const fileSource = new FileSource();
  expect(fileSource.parse(['5 5', '0 0 N', 'ALR'])).toEqual([
    {
      x: 0,
      y: 0,
      direction: 'N',
      instructions: ['A', 'L', 'R'],
    },
  ]);
});

test('one lawnmower with many instructions', () => {
  const fileSource = new FileSource();
  expect(fileSource.parse(['5 5', '0 0 N', 'ALR', '3 3 S', 'ALR'])).toEqual([
    {
      x: 0,
      y: 0,
      direction: 'N',
      instructions: ['A', 'L', 'R'],
    },
    {
      x: 3,
      y: 3,
      direction: 'S',
      instructions: ['A', 'L', 'R'],
    },
  ]);
});
