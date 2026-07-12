const cellKey = (row, column) => `${row}:${column}`;

export function validatePuzzle(puzzle) {
  const errors = [];
  if (!puzzle || !Number.isInteger(puzzle.rows) || !Number.isInteger(puzzle.columns)) return { valid: false, errors: ['題組尺寸無效。'] };
  const cells = new Map();
  for (const entry of puzzle.entries ?? []) {
    if (!/^[\u4e00-\u9fff]{4}$/.test(entry.answer ?? '')) { errors.push(`成語不是四字：${entry.id ?? 'unknown'}`); continue; }
    if (!['across', 'down'].includes(entry.direction)) { errors.push(`方向無效：${entry.id}`); continue; }
    [...entry.answer].forEach((character, index) => {
      const row = entry.row + (entry.direction === 'down' ? index : 0);
      const column = entry.column + (entry.direction === 'across' ? index : 0);
      const key = cellKey(row, column);
      if (row < 0 || column < 0 || row >= puzzle.rows || column >= puzzle.columns) errors.push(`成語超出盤面：${entry.id}`);
      if (cells.has(key) && cells.get(key) !== character) errors.push(`交叉字不一致：${key}`);
      cells.set(key, character);
    });
  }
  return { valid: errors.length === 0, errors };
}

export function buildBoard(puzzle, blankCount) {
  const validation = validatePuzzle(puzzle);
  if (!validation.valid) throw new Error(validation.errors.join(' '));
  const cells = new Map();
  for (const entry of puzzle.entries) {
    [...entry.answer].forEach((answer, index) => {
      const row = entry.row + (entry.direction === 'down' ? index : 0);
      const column = entry.column + (entry.direction === 'across' ? index : 0);
      const key = cellKey(row, column);
      const existing = cells.get(key) ?? { id: key, row, column, answer, entryIds: [] };
      existing.entryIds.push(entry.id);
      cells.set(key, existing);
    });
  }
  const ordered = [...cells.values()].sort((a, b) => a.row - b.row || a.column - b.column);
  const blankCells = ordered.slice(0, Math.min(blankCount, ordered.length));
  const blankIds = new Set(blankCells.map((cell) => cell.id));
  return { ...puzzle, cells, blankCells, blankIds, entries: puzzle.entries.map((entry) => ({ ...entry })) };
}

export function buildChoices(board, decoys = []) {
  return [...new Set([...board.blankCells.map((cell) => cell.answer), ...decoys])].sort((a, b) => a.localeCompare(b, 'zh-Hant'));
}

export function pickPuzzle(puzzles, difficulty, excludedIds = []) {
  const excluded = new Set(Array.isArray(excludedIds) ? excludedIds : [excludedIds]);
  const matching = puzzles.filter((puzzle) => puzzle.difficulty === difficulty);
  const candidates = matching.filter((puzzle) => !excluded.has(puzzle.id));
  const pool = candidates.length ? candidates : matching;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}
