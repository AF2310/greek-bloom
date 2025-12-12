// Mock data for Ancient Greek learning app

export interface Word {
  id: string;
  greek: string;
  transliteration: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'particle';
  correctCount: number;
  wrongCount: number;
  groupIds: string[];
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
  type: 'flashcard' | 'quiz' | 'typing';
}

export interface Session {
  id: string;
  activityId: string;
  activityName: string;
  groupId: string | null;
  groupName: string | null;
  startTime: Date;
  endTime: Date;
  correctCount: number;
  wrongCount: number;
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
  }
];

export const wordGroups: WordGroup[] = [
  { id: 'philosophy', name: 'Philosophy Terms', description: 'Words from Plato and Aristotle', wordCount: 15 },
  { id: 'common', name: 'Common Words', description: 'Most frequently used vocabulary', wordCount: 25 },
  { id: 'verbs', name: 'Essential Verbs', description: 'Key verbs for reading texts', wordCount: 20 },
  { id: 'homer', name: 'Homeric Greek', description: 'Vocabulary from the Iliad and Odyssey', wordCount: 18 }
];

export const words: Word[] = [
  { id: '1', greek: 'λόγος', transliteration: 'logos', english: 'word, reason, speech', partOfSpeech: 'noun', correctCount: 12, wrongCount: 2, groupIds: ['philosophy', 'common'] },
  { id: '2', greek: 'ψυχή', transliteration: 'psychē', english: 'soul, spirit, life', partOfSpeech: 'noun', correctCount: 8, wrongCount: 3, groupIds: ['philosophy'] },
  { id: '3', greek: 'ἀρετή', transliteration: 'aretē', english: 'virtue, excellence', partOfSpeech: 'noun', correctCount: 15, wrongCount: 1, groupIds: ['philosophy'] },
  { id: '4', greek: 'σοφία', transliteration: 'sophia', english: 'wisdom', partOfSpeech: 'noun', correctCount: 20, wrongCount: 0, groupIds: ['philosophy', 'common'] },
  { id: '5', greek: 'ἀλήθεια', transliteration: 'alētheia', english: 'truth', partOfSpeech: 'noun', correctCount: 7, wrongCount: 4, groupIds: ['philosophy'] },
  { id: '6', greek: 'εἶναι', transliteration: 'einai', english: 'to be', partOfSpeech: 'verb', correctCount: 25, wrongCount: 2, groupIds: ['verbs', 'common'] },
  { id: '7', greek: 'λέγειν', transliteration: 'legein', english: 'to say, speak', partOfSpeech: 'verb', correctCount: 18, wrongCount: 3, groupIds: ['verbs', 'common'] },
  { id: '8', greek: 'ποιεῖν', transliteration: 'poiein', english: 'to make, do', partOfSpeech: 'verb', correctCount: 14, wrongCount: 2, groupIds: ['verbs', 'common'] },
  { id: '9', greek: 'γιγνώσκειν', transliteration: 'gignōskein', english: 'to know', partOfSpeech: 'verb', correctCount: 10, wrongCount: 5, groupIds: ['verbs', 'philosophy'] },
  { id: '10', greek: 'ἔχειν', transliteration: 'echein', english: 'to have, hold', partOfSpeech: 'verb', correctCount: 22, wrongCount: 1, groupIds: ['verbs', 'common'] },
  { id: '11', greek: 'καλός', transliteration: 'kalos', english: 'beautiful, noble', partOfSpeech: 'adjective', correctCount: 16, wrongCount: 2, groupIds: ['common', 'philosophy'] },
  { id: '12', greek: 'ἀγαθός', transliteration: 'agathos', english: 'good', partOfSpeech: 'adjective', correctCount: 19, wrongCount: 1, groupIds: ['common', 'philosophy'] },
  { id: '13', greek: 'μέγας', transliteration: 'megas', english: 'great, large', partOfSpeech: 'adjective', correctCount: 12, wrongCount: 3, groupIds: ['common', 'homer'] },
  { id: '14', greek: 'πολύς', transliteration: 'polys', english: 'much, many', partOfSpeech: 'adjective', correctCount: 11, wrongCount: 4, groupIds: ['common'] },
  { id: '15', greek: 'μῆνις', transliteration: 'mēnis', english: 'wrath, anger', partOfSpeech: 'noun', correctCount: 5, wrongCount: 2, groupIds: ['homer'] },
  { id: '16', greek: 'θεός', transliteration: 'theos', english: 'god', partOfSpeech: 'noun', correctCount: 21, wrongCount: 0, groupIds: ['common', 'homer'] },
  { id: '17', greek: 'ἄνθρωπος', transliteration: 'anthrōpos', english: 'human being, person', partOfSpeech: 'noun', correctCount: 17, wrongCount: 2, groupIds: ['common', 'philosophy'] },
  { id: '18', greek: 'πόλις', transliteration: 'polis', english: 'city, city-state', partOfSpeech: 'noun', correctCount: 13, wrongCount: 1, groupIds: ['common', 'philosophy'] },
  { id: '19', greek: 'οἶκος', transliteration: 'oikos', english: 'house, household', partOfSpeech: 'noun', correctCount: 9, wrongCount: 3, groupIds: ['common'] },
  { id: '20', greek: 'βασιλεύς', transliteration: 'basileus', english: 'king', partOfSpeech: 'noun', correctCount: 14, wrongCount: 2, groupIds: ['common', 'homer'] },
];

export const sessions: Session[] = [
  { id: '1', activityId: 'flashcard', activityName: 'Flashcards', groupId: 'philosophy', groupName: 'Philosophy Terms', startTime: new Date('2024-01-15T10:00:00'), endTime: new Date('2024-01-15T10:25:00'), correctCount: 12, wrongCount: 3 },
  { id: '2', activityId: 'quiz', activityName: 'Multiple Choice', groupId: 'common', groupName: 'Common Words', startTime: new Date('2024-01-14T14:30:00'), endTime: new Date('2024-01-14T14:50:00'), correctCount: 18, wrongCount: 2 },
  { id: '3', activityId: 'typing', activityName: 'Typing Practice', groupId: 'verbs', groupName: 'Essential Verbs', startTime: new Date('2024-01-13T09:00:00'), endTime: new Date('2024-01-13T09:35:00'), correctCount: 15, wrongCount: 5 },
  { id: '4', activityId: 'flashcard', activityName: 'Flashcards', groupId: 'homer', groupName: 'Homeric Greek', startTime: new Date('2024-01-12T16:00:00'), endTime: new Date('2024-01-12T16:20:00'), correctCount: 8, wrongCount: 4 },
  { id: '5', activityId: 'quiz', activityName: 'Multiple Choice', groupId: null, groupName: null, startTime: new Date('2024-01-11T11:00:00'), endTime: new Date('2024-01-11T11:30:00'), correctCount: 20, wrongCount: 5 },
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
