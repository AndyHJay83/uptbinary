export type BinaryChoice = 'L' | 'R';

export interface WordList {
  id: string;
  name: string;
  words: string[];
}

export interface FilterState {
  currentLetter: string;
  sequence: BinaryChoice[];
  leftWords: string[];
  rightWords: string[];
  letterIndex: number;
  usedLetters: Set<string>;
  isComplete: boolean;
}

export interface UserPreferences {
  selectedWordListId: string;
  selectedSequenceId: string;
  enablePsychologicalProfiling: boolean;
  exportSettings: {
    includeTimestamp: boolean;
    defaultFilename: string;
  };
}

export interface AppState {
  selectedWordList: WordList | null;
  filterState: FilterState;
  userPreferences: UserPreferences;
  isInPerformMode: boolean;
}

export type AppAction =
  | { type: 'SELECT_WORD_LIST'; payload: WordList }
  | { type: 'MAKE_BINARY_CHOICE'; payload: { choice: BinaryChoice } }
  | { type: 'RESET_FILTER'; payload?: void }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'TOGGLE_PERFORM_MODE'; payload?: void }
  | { type: 'SET_PERFORM_MODE'; payload: boolean };

export interface AppContextType {
  state: AppState;
  makeBinaryChoice: (choice: BinaryChoice) => void;
  resetFilter: () => void;
  selectWordList: (wordList: WordList) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  togglePerformMode: () => void;
  setPerformMode: (enabled: boolean) => void;
}
