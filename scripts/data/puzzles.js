const clue = '請依交錯字格完成成語。';
const secondaryEntries = [
  { id: 'season', answer: '春暖花開', clue, row: 5, column: 1, direction: 'across' },
  { id: 'moon', answer: '花好月圓', clue, row: 5, column: 3, direction: 'down' }
];

function makePuzzle(difficulty, index, answer, crossing) {
  const character = crossing[0];
  return {
    id: `${difficulty}-${String(index + 1).padStart(2, '0')}`,
    difficulty, rows: 9, columns: 7,
    entries: [
      { id: 'main', answer, clue, row: 1, column: 1, direction: 'across' },
      { id: 'cross', answer: crossing, clue, row: 1, column: answer.indexOf(character) + 1, direction: 'down' },
      ...secondaryEntries.map((entry) => ({ ...entry }))
    ]
  };
}

const libraries = {
  beginner: [
    ['一心一意', '心平氣和'], ['和藹可親', '可歌可泣'], ['自告奮勇', '告往知來'], ['心花怒放', '花好月圓'],
    ['平易近人', '易如反掌'], ['大功告成', '功成名就'], ['口若懸河', '若無其事'], ['全力以赴', '力不從心'],
    ['風和日麗', '和顏悅色'], ['千言萬語', '言而有信'], ['安居樂業', '居安思危'], ['手忙腳亂', '忙裡偷閒'],
    ['水到渠成', '到處為家'], ['五花八門', '花團錦簇'], ['天長地久', '長驅直入'], ['一見如故', '見多識廣']
  ],
  intermediate: [
    ['談笑風生', '笑逐顏開'], ['精益求精', '益壽延年'], ['出類拔萃', '類聚群分'], ['各得其所', '得心應手'],
    ['相得益彰', '得意忘形'], ['不約而同', '約法三章'], ['一絲不苟', '絲絲入扣'], ['見賢思齊', '賢良方正'],
    ['百發百中', '發揚光大'], ['高瞻遠矚', '瞻前顧後'], ['融會貫通', '會心一笑'], ['望塵莫及', '塵埃落定'],
    ['厚積薄發', '積少成多'], ['如魚得水', '魚貫而入'], ['相輔相成', '輔車相依'], ['不言而喻', '言簡意賅']
  ],
  advanced: [
    ['噤若寒蟬', '若即若離'], ['別出心裁', '出類拔萃'], ['人云亦云', '云開見日'], ['曲高和寡', '高朋滿座'],
    ['緣木求魚', '木已成舟'], ['管中窺豹', '中流砥柱'], ['按圖索驥', '圖窮匕見'], ['望洋興嘆', '洋洋得意'],
    ['同仇敵愾', '仇深似海'], ['老馬識途', '馬到成功'], ['披荊斬棘', '荊棘叢生'], ['投筆從戎', '筆走龍蛇'],
    ['汗牛充棟', '牛鬼蛇神'], ['咄咄逼人', '咄嗟立辦'], ['未雨綢繆', '雨過天晴'], ['登堂入室', '堂而皇之']
  ],
  master: [
    ['怙惡不悛', '惡貫滿盈'], ['罄竹難書', '竹報平安'], ['寅吃卯糧', '吃苦耐勞'], ['膾炙人口', '炙手可熱'],
    ['罔顧人倫', '顧名思義'], ['趨之若鶩', '若即若離'], ['韜光養晦', '光明磊落'], ['鞭辟入裡', '入木三分'],
    ['鶴立雞群', '立竿見影'], ['鳳毛麟角', '毛遂自薦'], ['咬文嚼字', '文過飾非'], ['阮囊羞澀', '囊中取物'],
    ['杳無音信', '無可厚非'], ['捉襟見肘', '襟懷坦白'], ['暴殄天物', '天馬行空'], ['滄海桑田', '海闊天空']
  ]
};

export const PUZZLES = Object.entries(libraries).flatMap(([difficulty, pairs]) =>
  pairs.map(([answer, crossing], index) => makePuzzle(difficulty, index, answer, crossing))
);

export const DIFFICULTIES = {
  beginner: { label: '入門', blanks: 3, hints: 3, decoys: ['山', '水', '日'] },
  intermediate: { label: '熟手', blanks: 6, hints: 2, decoys: ['雲', '月', '花', '木'] },
  advanced: { label: '博學', blanks: 9, hints: 1, decoys: ['春', '秋', '天', '地', '人'] },
  master: { label: '宗師', blanks: 12, hints: 0, decoys: ['金', '石', '風', '雷', '雲', '霧'] }
};
