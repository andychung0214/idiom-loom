export function createGameState(board, difficulty) {
  const cells = Object.fromEntries([...board.cells.values()].map((cell) => [cell.id, {
    ...cell,
    value: board.blankIds.has(cell.id) ? '' : cell.answer,
    status: board.blankIds.has(cell.id) ? 'blank' : 'given'
  }]));
  return { board, difficulty, cells, score: 0, correctCount: 0, totalBlanks: board.blankCells.length, streak: 0, mistakes: 0, hintsLeft: difficulty.hints, selectedCellId: board.blankCells[0]?.id ?? '', feedback: '', startedAt: Date.now(), completedAt: null };
}

export function isComplete(state) {
  return Object.values(state.cells).filter((cell) => cell.status !== 'given').every((cell) => cell.status === 'correct' || cell.status === 'hinted');
}

export function answerCell(state, cellId, character) {
  const cell = state.cells[cellId];
  if (!cell || cell.status === 'correct' || cell.status === 'hinted') return state;
  if (cell.answer !== character) return { ...state, streak: 0, mistakes: state.mistakes + 1, feedback: 'incorrect' };
  const correctCount = state.correctCount + 1;
  const points = Math.round((correctCount / state.totalBlanks) * 100);
  const cells = { ...state.cells, [cellId]: { ...cell, value: character, status: 'correct' } };
  const next = { ...state, cells, correctCount, score: points, streak: state.streak + 1, feedback: 'correct' };
  return isComplete(next) ? { ...next, completedAt: Date.now(), feedback: 'complete' } : next;
}

export function useHint(state, cellId = state.selectedCellId) {
  const target = state.cells[cellId] ?? Object.values(state.cells).find((cell) => cell.status === 'blank');
  if (!target || state.hintsLeft < 1 || target.status === 'correct' || target.status === 'hinted') return state;
  const cells = { ...state.cells, [target.id]: { ...target, value: target.answer, status: 'hinted' } };
  const next = { ...state, cells, hintsLeft: state.hintsLeft - 1, feedback: 'hint' };
  return isComplete(next) ? { ...next, completedAt: Date.now(), feedback: 'complete' } : next;
}

export function resetGame(state) {
  return createGameState(state.board, state.difficulty);
}
