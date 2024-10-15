import { ISource, Lawnmower } from './simulation.js';
import fs from 'fs/promises';
import path from 'path';

export class FileSource implements ISource {
  async load(): Promise<Lawnmower[]> {
    const filePath = path.resolve('input.txt');
    const content = await fs.readFile(filePath, 'utf-8');

    return this.parse(content.split('\n'));
  }

  parse(params: string[]): Lawnmower[] {
    if (params.length <= 1) {
      return [];
    }

    const lawnmowers: Lawnmower[] = [];
    for (let i = 1; i < params.length; i += 2) {
      lawnmowers.push(this.parseInstruction(params[i], params[i + 1]));
    }

    return lawnmowers;
  }

  private parseInstruction(lineA: string, lineB?: string) {
    const [x, y, direction] = lineA.split(' ');

    return {
      x: parseInt(x),
      y: parseInt(y),
      direction,
      instructions: lineB ? lineB.split('') : [],
    };
  }
}
