export const PUZZLES = [
  {
    id: 'beginner-01', difficulty: 'beginner', rows: 7, columns: 7,
    entries: [
      { id: 'focus', answer: '一心一意', clue: '形容專心一致。', row: 1, column: 1, direction: 'across' },
      { id: 'calm', answer: '心平氣和', clue: '心境平和，態度溫和。', row: 1, column: 2, direction: 'down' },
      { id: 'spirit', answer: '意氣風發', clue: '形容精神振奮。', row: 1, column: 6, direction: 'down' },
      { id: 'grace', answer: '氣宇軒昂', clue: '形容人的氣度不凡。', row: 3, column: 2, direction: 'across' }
    ]
  },
  {
    id: 'beginner-02', difficulty: 'beginner', rows: 7, columns: 7,
    entries: [
      { id: 'kind', answer: '和藹可親', clue: '態度溫和，使人容易親近。', row: 1, column: 1, direction: 'across' },
      { id: 'quiet', answer: '可歌可泣', clue: '事蹟感人，值得歌頌流淚。', row: 1, column: 3, direction: 'down' },
      { id: 'song', answer: '歌功頌德', clue: '頌揚功勞與德行。', row: 2, column: 3, direction: 'across' }
    ]
  },
  {
    id: 'intermediate-01', difficulty: 'intermediate', rows: 7, columns: 7,
    entries: [
      { id: 'talk', answer: '談笑風生', clue: '談話風趣，興致很高。', row: 1, column: 1, direction: 'across' },
      { id: 'smile', answer: '笑逐顏開', clue: '滿面笑容的樣子。', row: 1, column: 2, direction: 'down' },
      { id: 'life', answer: '生龍活虎', clue: '形容活潑矯健。', row: 1, column: 4, direction: 'down' }
    ]
  },
  {
    id: 'intermediate-02', difficulty: 'intermediate', rows: 7, columns: 7,
    entries: [
      { id: 'work', answer: '精益求精', clue: '已經很好仍求更好。', row: 1, column: 1, direction: 'across' },
      { id: 'gain', answer: '益壽延年', clue: '增進健康，延長壽命。', row: 1, column: 2, direction: 'down' },
      { id: 'life', answer: '壽比南山', clue: '祝福長壽。', row: 2, column: 2, direction: 'across' }
    ]
  },
  {
    id: 'advanced-01', difficulty: 'advanced', rows: 7, columns: 7,
    entries: [
      { id: 'quiet', answer: '噤若寒蟬', clue: '因害怕而不敢作聲。', row: 1, column: 1, direction: 'across' },
      { id: 'cold', answer: '若即若離', clue: '保持不太親近也不太疏遠。', row: 1, column: 2, direction: 'down' },
      { id: 'cicada', answer: '蟬不知雪', clue: '比喻見聞狹隘。', row: 1, column: 4, direction: 'down' }
    ]
  },
  {
    id: 'advanced-02', difficulty: 'advanced', rows: 7, columns: 7,
    entries: [
      { id: 'unusual', answer: '別出心裁', clue: '構想新奇，與眾不同。', row: 1, column: 1, direction: 'across' },
      { id: 'different', answer: '出類拔萃', clue: '才能特出，超越眾人。', row: 1, column: 2, direction: 'down' },
      { id: 'talent', answer: '裁長補短', clue: '取長補短。', row: 1, column: 4, direction: 'down' }
    ]
  }
];

export const DIFFICULTIES = {
  beginner: { label: '入門', blanks: 3, hints: 3, decoys: ['山', '水', '日'] },
  intermediate: { label: '熟手', blanks: 6, hints: 2, decoys: ['雲', '月', '花', '木'] },
  advanced: { label: '博學', blanks: 9, hints: 1, decoys: ['春', '秋', '天', '地', '人'] }
};
