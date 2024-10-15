export interface ISource {
  load(): Promise<Lawnmower[]>;
}

export type Lawnmower = {
  x: number;
  y: number;
  direction: string;
  instructions: string[];
};

export class Simulation {
  private lawnmowers: Lawnmower[] = [];

  constructor(private readonly source: ISource) {}

  async run() {
    this.lawnmowers = await this.source.load();

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
