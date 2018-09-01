# lennard-jones-pairwise-js

Pairwise Lennard-Jones potential written in javascript.

## API

```js
const lennardJones = require('lennard-jones-pairwise-js');

const lj = lennardJones({
  depth: 1.0,
  length: 1.0,
  cutoff: undefined
});
```

| Option | Type  | Default   | Description                                                                                      |
|--------|-------|-----------|--------------------------------------------------------------------------------------------------|
| depth  | float | 1.0       | The depth of the potential well.                                                                 |
| length | float | 1.0       | The distance at which the potential is the smallest value.                                       |
| cutoff | float | undefined | Disabled when undefined. When defined, is the distance at which the potential is forced to zero. |

Returns a function that calculates the Lennard-Jones potential and force at a given distance:

```js
const result = lj(distance);
```

| Parameter | Type  | Description                                                     |
|-----------|-------|-----------------------------------------------------------------|
| distance  | float | The distance at which to calculate the Lennard-Jones potential. |

Returns an object containing the energy and force at the given distance:

| Name          | Type  | Description                                        |
|---------------|-------|----------------------------------------------------|
| result.energy | float | The energy of the potential at the given distance. |
| result.force  | float | The force of the potential at the given distance.  |
