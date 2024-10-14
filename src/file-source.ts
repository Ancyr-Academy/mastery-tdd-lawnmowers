import { ISource, Lawnmower } from './simulation.js';

export class FileSource implements ISource {
  load(): Promise<Lawnmower[]> {
    return Promise.resolve([]);
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