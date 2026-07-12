import assert from 'node:assert/strict';
import test from 'node:test';
import { PUZZLES, DIFFICULTIES } from '../scripts/data/puzzles.js';
import { buildBoard } from '../scripts/game/puzzle.js';
import { answerCell, createGameState, resetGame, useHint } from '../scripts/game/state.js';

const board = buildBoard(PUZZLES[0], 3);
const state = createGameState(board, DIFFICULTIES.beginner);
const cell = board.blankCells[0];

test('填入正確字會鎖定字格並累加分數', () => {
  const next = answerCell(state, cell.id, cell.answer);
  assert.equal(next.cells[cell.id].status, 'correct');
  assert.ok(next.score > state.score);
});

test('填入錯誤字不覆寫答案並中斷連續答對', () => {
  const next = answerCell({ ...state, streak: 2 }, cell.id, '錯');
  assert.equal(next.cells[cell.id].value, '');
  assert.equal(next.streak, 0);
  assert.equal(next.mistakes, 1);
});

test('提示會揭示字格並消耗提示次數', () => {
  const next = useHint(state, cell.id);
  assert.equal(next.cells[cell.id].status, 'hinted');
  assert.equal(next.hintsLeft, state.hintsLeft - 1);
});

test('重設本局會清除作答與分數', () => {
  const answered = answerCell(state, cell.id, cell.answer);
  const next = resetGame(answered);
  assert.equal(next.score, 0);
  assert.equal(next.cells[cell.id].value, '');
});

test('不使用提示且填完所有空格時，分數剛好為一百分', () => {
  let next = state;
  for (const blank of board.blankCells) next = answerCell(next, blank.id, blank.answer);
  assert.equal(next.score, 100);
});

test('宗師難度沒有提示，提示操作不改變狀態', () => {
  const masterBoard = buildBoard(PUZZLES.find((puzzle) => puzzle.difficulty === 'master'), 12);
  const master = createGameState(masterBoard, { label: '宗師', blanks: 12, hints: 0, decoys: [] });
  assert.equal(master.hintsLeft, 0);
  assert.equal(useHint(master), master);
});
