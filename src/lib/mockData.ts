// Mock data for Ancient Greek learning app

export interface Word {
  id: string;
  greek: string;
  transliteration: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'particle';
  groupIds: string[];
  correctCount: number;
  wrongCount: number;
}

export interface WordGroup {
  id: string;
  name: string;
  description: string;
  wordCount: number;
}

export interface StudyActivity {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'flashcard' | 'quiz' | 'typing' | 'matching' | 'listening' | 'spelling';
}

export const studyActivities: StudyActivity[] = [
  {
    id: 'flashcard',
    name: 'Flashcards',
    description: 'Practice vocabulary with classic flashcard review',
    icon: 'Layers',
    type: 'flashcard'
  },
  {
    id: 'quiz',
    name: 'Multiple Choice',
    description: 'Test your knowledge with multiple choice questions',
    icon: 'CircleDot',
    type: 'quiz'
  },
  {
    id: 'typing',
    name: 'Typing Practice',
    description: 'Type the Greek word from its English meaning',
    icon: 'Keyboard',
    type: 'typing'
  },
  {
    id: 'matching',
    name: 'Word Matching',
    description: 'Match Greek words with their English translations',
    icon: 'Link2',
    type: 'matching'
  },
  {
    id: 'listening',
    name: 'Audio Recognition',
    description: 'Listen to pronunciation and identify the word',
    icon: 'Headphones',
    type: 'listening'
  },
  {
    id: 'spelling',
    name: 'Spelling Bee',
    description: 'Spell Greek words from their transliteration',
    icon: 'PenTool',
    type: 'spelling'
  }
];

export const wordGroups: WordGroup[] = [
  { id: 'philosophy', name: 'Philosophy Terms', description: 'Words from Plato and Aristotle', wordCount: 15 },
  { id: 'common', name: 'Common Words', description: 'Most frequently used vocabulary', wordCount: 25 },
  { id: 'verbs', name: 'Essential Verbs', description: 'Key verbs for reading texts', wordCount: 20 },
  { id: 'homer', name: 'Homeric Greek', description: 'Vocabulary from the Iliad and Odyssey', wordCount: 18 },
  { id: 'numbers', name: 'Numbers & Time', description: 'Counting and temporal expressions', wordCount: 12 },
  { id: 'nature', name: 'Nature & Elements', description: 'Earth, sky, water, and natural phenomena', wordCount: 14 }
];

export const words: Word[] = [
  { id: '1', greek: 'λόγος', transliteration: 'logos', english: 'word, reason, speech', partOfSpeech: 'noun', groupIds: ['philosophy', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '2', greek: 'ψυχή', transliteration: 'psychē', english: 'soul, spirit, life', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '3', greek: 'ἀρετή', transliteration: 'aretē', english: 'virtue, excellence', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '4', greek: 'σοφία', transliteration: 'sophia', english: 'wisdom', partOfSpeech: 'noun', groupIds: ['philosophy', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '5', greek: 'ἀλήθεια', transliteration: 'alētheia', english: 'truth', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '6', greek: 'εἶναι', transliteration: 'einai', english: 'to be', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '7', greek: 'λέγειν', transliteration: 'legein', english: 'to say, speak', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '8', greek: 'ποιεῖν', transliteration: 'poiein', english: 'to make, do', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '9', greek: 'γιγνώσκειν', transliteration: 'gignōskein', english: 'to know', partOfSpeech: 'verb', groupIds: ['verbs', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '10', greek: 'ἔχειν', transliteration: 'echein', english: 'to have, hold', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '11', greek: 'καλός', transliteration: 'kalos', english: 'beautiful, noble', partOfSpeech: 'adjective', groupIds: ['common', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '12', greek: 'ἀγαθός', transliteration: 'agathos', english: 'good', partOfSpeech: 'adjective', groupIds: ['common', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '13', greek: 'μέγας', transliteration: 'megas', english: 'great, large', partOfSpeech: 'adjective', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '14', greek: 'πολύς', transliteration: 'polys', english: 'much, many', partOfSpeech: 'adjective', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '15', greek: 'μῆνις', transliteration: 'mēnis', english: 'wrath, anger', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  { id: '16', greek: 'θεός', transliteration: 'theos', english: 'god', partOfSpeech: 'noun', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '17', greek: 'ἄνθρωπος', transliteration: 'anthrōpos', english: 'human being, person', partOfSpeech: 'noun', groupIds: ['common', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '18', greek: 'πόλις', transliteration: 'polis', english: 'city, city-state', partOfSpeech: 'noun', groupIds: ['common', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '19', greek: 'οἶκος', transliteration: 'oikos', english: 'house, household', partOfSpeech: 'noun', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '20', greek: 'βασιλεύς', transliteration: 'basileus', english: 'king', partOfSpeech: 'noun', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '21', greek: 'εἷς', transliteration: 'heis', english: 'one', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '22', greek: 'δύο', transliteration: 'duo', english: 'two', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '23', greek: 'τρεῖς', transliteration: 'treis', english: 'three', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '24', greek: 'ἥλιος', transliteration: 'hēlios', english: 'sun', partOfSpeech: 'noun', groupIds: ['nature', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '25', greek: 'σελήνη', transliteration: 'selēnē', english: 'moon', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '26', greek: 'ὕδωρ', transliteration: 'hydōr', english: 'water', partOfSpeech: 'noun', groupIds: ['nature', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '27', greek: 'πῦρ', transliteration: 'pyr', english: 'fire', partOfSpeech: 'noun', groupIds: ['nature', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '28', greek: 'γῆ', transliteration: 'gē', english: 'earth, land', partOfSpeech: 'noun', groupIds: ['nature', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '29', greek: 'θάλασσα', transliteration: 'thalassa', english: 'sea', partOfSpeech: 'noun', groupIds: ['nature', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '30', greek: 'οὐρανός', transliteration: 'ouranos', english: 'sky, heaven', partOfSpeech: 'noun', groupIds: ['nature', 'homer'], correctCount: 0, wrongCount: 0 },
  // More philosophy terms
  { id: '31', greek: 'νοῦς', transliteration: 'nous', english: 'mind, intellect', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '32', greek: 'δόξα', transliteration: 'doxa', english: 'opinion, glory', partOfSpeech: 'noun', groupIds: ['philosophy', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '33', greek: 'ἐπιστήμη', transliteration: 'epistēmē', english: 'knowledge, science', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '34', greek: 'τέχνη', transliteration: 'technē', english: 'art, craft, skill', partOfSpeech: 'noun', groupIds: ['philosophy', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '35', greek: 'φύσις', transliteration: 'physis', english: 'nature', partOfSpeech: 'noun', groupIds: ['philosophy', 'nature'], correctCount: 0, wrongCount: 0 },
  { id: '36', greek: 'οὐσία', transliteration: 'ousia', english: 'being, essence, substance', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '37', greek: 'εἶδος', transliteration: 'eidos', english: 'form, idea, species', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '38', greek: 'ἰδέα', transliteration: 'idea', english: 'form, idea', partOfSpeech: 'noun', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  // More common words
  { id: '39', greek: 'ἔργον', transliteration: 'ergon', english: 'work, deed', partOfSpeech: 'noun', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '40', greek: 'χρόνος', transliteration: 'chronos', english: 'time', partOfSpeech: 'noun', groupIds: ['common', 'numbers'], correctCount: 0, wrongCount: 0 },
  { id: '41', greek: 'τόπος', transliteration: 'topos', english: 'place', partOfSpeech: 'noun', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '42', greek: 'ὁδός', transliteration: 'hodos', english: 'way, road, path', partOfSpeech: 'noun', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '43', greek: 'βίος', transliteration: 'bios', english: 'life', partOfSpeech: 'noun', groupIds: ['common', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '44', greek: 'θάνατος', transliteration: 'thanatos', english: 'death', partOfSpeech: 'noun', groupIds: ['common', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '45', greek: 'φίλος', transliteration: 'philos', english: 'friend, dear', partOfSpeech: 'noun', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '46', greek: 'πατήρ', transliteration: 'patēr', english: 'father', partOfSpeech: 'noun', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '47', greek: 'μήτηρ', transliteration: 'mētēr', english: 'mother', partOfSpeech: 'noun', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '48', greek: 'υἱός', transliteration: 'huios', english: 'son', partOfSpeech: 'noun', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
  { id: '49', greek: 'γυνή', transliteration: 'gynē', english: 'woman, wife', partOfSpeech: 'noun', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '50', greek: 'ἀνήρ', transliteration: 'anēr', english: 'man, husband', partOfSpeech: 'noun', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  // More verbs
  { id: '51', greek: 'βαίνειν', transliteration: 'bainein', english: 'to go, walk', partOfSpeech: 'verb', groupIds: ['verbs'], correctCount: 0, wrongCount: 0 },
  { id: '52', greek: 'φέρειν', transliteration: 'pherein', english: 'to carry, bear', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '53', greek: 'ἄγειν', transliteration: 'agein', english: 'to lead, bring', partOfSpeech: 'verb', groupIds: ['verbs'], correctCount: 0, wrongCount: 0 },
  { id: '54', greek: 'τιθέναι', transliteration: 'tithenai', english: 'to put, place', partOfSpeech: 'verb', groupIds: ['verbs'], correctCount: 0, wrongCount: 0 },
  { id: '55', greek: 'διδόναι', transliteration: 'didonai', english: 'to give', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '56', greek: 'λαμβάνειν', transliteration: 'lambanein', english: 'to take, receive', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '57', greek: 'ὁρᾶν', transliteration: 'horan', english: 'to see', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '58', greek: 'ἀκούειν', transliteration: 'akouein', english: 'to hear', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '59', greek: 'γράφειν', transliteration: 'graphein', english: 'to write', partOfSpeech: 'verb', groupIds: ['verbs'], correctCount: 0, wrongCount: 0 },
  { id: '60', greek: 'πάσχειν', transliteration: 'paschein', english: 'to suffer, experience', partOfSpeech: 'verb', groupIds: ['verbs', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '61', greek: 'μανθάνειν', transliteration: 'manthanein', english: 'to learn', partOfSpeech: 'verb', groupIds: ['verbs', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '62', greek: 'διδάσκειν', transliteration: 'didaskein', english: 'to teach', partOfSpeech: 'verb', groupIds: ['verbs', 'philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '63', greek: 'ζῆν', transliteration: 'zēn', english: 'to live', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '64', greek: 'θνῄσκειν', transliteration: 'thnēskein', english: 'to die', partOfSpeech: 'verb', groupIds: ['verbs'], correctCount: 0, wrongCount: 0 },
  { id: '65', greek: 'φιλεῖν', transliteration: 'philein', english: 'to love, like', partOfSpeech: 'verb', groupIds: ['verbs', 'common'], correctCount: 0, wrongCount: 0 },
  // More Homeric words
  { id: '66', greek: 'κλέος', transliteration: 'kleos', english: 'glory, fame', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  { id: '67', greek: 'τιμή', transliteration: 'timē', english: 'honor, worth', partOfSpeech: 'noun', groupIds: ['homer', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '68', greek: 'ἀριστεύς', transliteration: 'aristeus', english: 'champion, best warrior', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  { id: '69', greek: 'ξένος', transliteration: 'xenos', english: 'stranger, guest-friend', partOfSpeech: 'noun', groupIds: ['homer', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '70', greek: 'νόστος', transliteration: 'nostos', english: 'homecoming, return', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  { id: '71', greek: 'πόλεμος', transliteration: 'polemos', english: 'war', partOfSpeech: 'noun', groupIds: ['homer', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '72', greek: 'ναῦς', transliteration: 'naus', english: 'ship', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  { id: '73', greek: 'ἵππος', transliteration: 'hippos', english: 'horse', partOfSpeech: 'noun', groupIds: ['homer', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '74', greek: 'δόρυ', transliteration: 'dory', english: 'spear', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  { id: '75', greek: 'ἀσπίς', transliteration: 'aspis', english: 'shield', partOfSpeech: 'noun', groupIds: ['homer'], correctCount: 0, wrongCount: 0 },
  // More numbers
  { id: '76', greek: 'τέτταρες', transliteration: 'tettares', english: 'four', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '77', greek: 'πέντε', transliteration: 'pente', english: 'five', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '78', greek: 'ἕξ', transliteration: 'hex', english: 'six', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '79', greek: 'ἑπτά', transliteration: 'hepta', english: 'seven', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '80', greek: 'ὀκτώ', transliteration: 'oktō', english: 'eight', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '81', greek: 'ἐννέα', transliteration: 'ennea', english: 'nine', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '82', greek: 'δέκα', transliteration: 'deka', english: 'ten', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '83', greek: 'ἑκατόν', transliteration: 'hekaton', english: 'hundred', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  { id: '84', greek: 'χίλιοι', transliteration: 'chilioi', english: 'thousand', partOfSpeech: 'adjective', groupIds: ['numbers'], correctCount: 0, wrongCount: 0 },
  // More nature words
  { id: '85', greek: 'ἄστρον', transliteration: 'astron', english: 'star', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '86', greek: 'νεφέλη', transliteration: 'nephelē', english: 'cloud', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '87', greek: 'ἄνεμος', transliteration: 'anemos', english: 'wind', partOfSpeech: 'noun', groupIds: ['nature', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '88', greek: 'βροντή', transliteration: 'brontē', english: 'thunder', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '89', greek: 'ἀστραπή', transliteration: 'astrapē', english: 'lightning', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '90', greek: 'δένδρον', transliteration: 'dendron', english: 'tree', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '91', greek: 'ἄνθος', transliteration: 'anthos', english: 'flower', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '92', greek: 'ὄρος', transliteration: 'oros', english: 'mountain', partOfSpeech: 'noun', groupIds: ['nature', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '93', greek: 'ποταμός', transliteration: 'potamos', english: 'river', partOfSpeech: 'noun', groupIds: ['nature'], correctCount: 0, wrongCount: 0 },
  { id: '94', greek: 'αἴθηρ', transliteration: 'aithēr', english: 'upper air, ether', partOfSpeech: 'noun', groupIds: ['nature', 'philosophy'], correctCount: 0, wrongCount: 0 },
  // More adjectives
  { id: '95', greek: 'σοφός', transliteration: 'sophos', english: 'wise', partOfSpeech: 'adjective', groupIds: ['philosophy', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '96', greek: 'δίκαιος', transliteration: 'dikaios', english: 'just, righteous', partOfSpeech: 'adjective', groupIds: ['philosophy', 'common'], correctCount: 0, wrongCount: 0 },
  { id: '97', greek: 'ἀληθής', transliteration: 'alēthēs', english: 'true', partOfSpeech: 'adjective', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '98', greek: 'ψευδής', transliteration: 'pseudēs', english: 'false', partOfSpeech: 'adjective', groupIds: ['philosophy'], correctCount: 0, wrongCount: 0 },
  { id: '99', greek: 'ταχύς', transliteration: 'tachys', english: 'swift, fast', partOfSpeech: 'adjective', groupIds: ['common', 'homer'], correctCount: 0, wrongCount: 0 },
  { id: '100', greek: 'βραδύς', transliteration: 'bradys', english: 'slow', partOfSpeech: 'adjective', groupIds: ['common'], correctCount: 0, wrongCount: 0 },
];

export function getWordsByGroup(groupId: string): Word[] {
  return words.filter(word => word.groupIds.includes(groupId));
}

export function getGroupById(groupId: string): WordGroup | undefined {
  return wordGroups.find(group => group.id === groupId);
}

export function getActivityById(activityId: string): StudyActivity | undefined {
  return studyActivities.find(activity => activity.id === activityId);
}
