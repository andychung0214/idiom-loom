import { PUZZLES } from './data/puzzles.js';
import { validatePuzzle } from './game/puzzle.js';
const invalid = PUZZLES.flatMap((puzzle) => validatePuzzle(puzzle).errors.map((error) => `${puzzle.id}: ${error}`));
if (invalid.length) { console.error(invalid.join('\n')); process.exit(1); }
console.log(`${PUZZLES.length} 個題組皆有效。`);
