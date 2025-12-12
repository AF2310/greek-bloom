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
