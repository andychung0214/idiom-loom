import assert from 'node:assert/strict';
import test from 'node:test';

import { PUZZLES } from '../scripts/data/puzzles.js';
import { buildBoard, buildChoices, pickPuzzle, validatePuzzle } from '../scripts/game/puzzle.js';

test('拒絕交叉字不一致的題組', () => {
  const result = validatePuzzle({
    id: 'invalid', difficulty: 'beginner', rows: 4, columns: 4,
    entries: [
      { id: 'a', answer: '一心一意', clue: '專心一致', row: 0, column: 0, direction: 'across' },
      { id: 'b', answer: '二三四五', clue: '錯誤資料', row: 0, column: 1, direction: 'down' }
    ]
  });
  assert.equal(result.valid, false);
  assert.match(result.errors.join(' '), /交叉/);
});

test('所有內建題組都通過驗證', () => {
  for (const puzzle of PUZZLES) assert.deepEqual(validatePuzzle(puzzle), { valid: true, errors: [] });
});

test('盤面以單一格保留交錯答案', () => {
  const board = buildBoard(PUZZLES[0], 0);
  const shared = [...board.cells.values()].find((cell) => cell.entryIds.length === 2);
  assert.ok(shared);
  assert.equal(shared.answer.length, 1);
});

test('候選字包含所有空白答案且不重複', () => {
  const board = buildBoard(PUZZLES[0], 3);
  const choices = buildChoices(board, ['甲', '乙', '丙']);
  for (const cell of board.blankCells) assert.ok(choices.includes(cell.answer));
  assert.equal(new Set(choices).size, choices.length);
});

test('抽題避開同難度上一局', () => {
  const current = PUZZLES.find((puzzle) => puzzle.difficulty === 'beginner');
  const result = pickPuzzle(PUZZLES, 'beginner', current.id);
  assert.notEqual(result.id, current.id);
});

test('四個難度各有十六個有效題組', () => {
  for (const difficulty of ['beginner', 'intermediate', 'advanced', 'master']) {
    const puzzles = PUZZLES.filter((puzzle) => puzzle.difficulty === difficulty);
    assert.equal(puzzles.length, 16, `${difficulty} 題組數`);
    for (const puzzle of puzzles) assert.equal(validatePuzzle(puzzle).valid, true, puzzle.id);
  }
});
