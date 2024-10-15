import { FileSource } from './file-source.js';
import { Simulation } from './simulation.js';

const source = new FileSource();
const simulation = new Simulation(source);
await simulation.run();

console.log(simulation.getResults());
