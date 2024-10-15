# Lawnmowers

Develop a program to simulate the movement of lawnmowers.

#### Simulation Overview
The simulation takes place on a rectangular surface defined by the position of its bottom-left corner (0,0) and top-right corner. 
If the surface is 5x5 units, the top-right corner will be at coordinates (5,5).

Each lawnmower is located at a position (x,y) on this surface and faces a direction (North, East, South, or West). 
The lawnmower can receive three types of commands:

- **Rotate 90° clockwise**
- **Rotate 90° counterclockwise**
- **Move forward**

For example, a lawnmower located at (1,1) facing North will move to (1,2) when moving forward.

#### Input Format
The program reads an input file structured as follows:

- The first line defines the surface by providing the north-east corner's coordinates (e.g., (5,5)).
- Then, each lawnmower is represented by two lines:
    - The first line contains the lawnmower's coordinates and the direction it's facing (N, E, S, W).
    - The second line contains a list of instructions the lawnmower must follow:
        - `R`: rotate clockwise
        - `L`: rotate counterclockwise
        - `A`: move forward

The program alternates between lawnmowers, executing one instruction at a time for each lawnmower until all instructions are completed. At the end, the program displays the final coordinates and direction of each lawnmower.

If two lawnmowers collide, the program stops.

#### Example Input File
```
5 5 
1 2 N 
LALALALAA 
3 3 E
AARRAARARRA
```

- The surface's north-east point is at (5,5).
- The first lawnmower is located at (1,2) facing North.
- The second lawnmower is located at (3,3) facing East.

Expected output:
```
1 3 N
3 3 S
```


#### Recommendations
There are two approaches to develop this program:

- **Outside-In:** Start from the outer layers and directly measure the final result.
- **Inside-Out (OOAD):** Use Object-Oriented Analysis and Design to model the objects and then focus on the technical layers.

#### Advanced Features
- In case of a collision, lawnmowers enter a "broken" state, and the affected square becomes inaccessible. Any lawnmower stopping on this square also breaks.
- Each lawnmower can be designed as an independent process (i.e., concurrent programming, coroutines). Consider adding a framerate concept to avoid instantaneous movement.
- Add an "Idle" instruction where the lawnmower doesn't move.
- Allow manual input of commands from the CLI instead of a file.

