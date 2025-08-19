import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, AppContextType, BinaryChoice, WordList, UserPreferences } from '../types';

// Default word list with the 10 specific words
const defaultWords = [
  "Necessary", "Toothbrush", "Remember", "Loveable", "Clementine",
  "Swingset", "Elephant", "Umbrella", "Antidote", "Impression"
];

const defaultWordList: WordList = {
  id: 'default',
  name: 'Default Words',
  words: defaultWords
};

const letterSequence = "NTRLCSEUAI"; // First letters of the 10 words

const initialState: AppState = {
  selectedWordList: defaultWordList,
  filterState: {
    currentLetter: letterSequence[0],
    sequence: [],
    leftWords: [...defaultWords],
    rightWords: [...defaultWords],
    letterIndex: 0,
    usedLetters: new Set(),
    isComplete: false,
  },
  userPreferences: {
    selectedWordListId: 'default',
    selectedSequenceId: 'custom',
    enablePsychologicalProfiling: false,
    exportSettings: {
      includeTimestamp: true,
      defaultFilename: 'binary-words',
    },
  },
  isInPerformMode: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_WORD_LIST': {
      const newWordList = action.payload;
      return {
        ...state,
        selectedWordList: newWordList,
        userPreferences: {
          ...state.userPreferences,
          selectedWordListId: newWordList.id,
        },
        filterState: {
          ...state.filterState,
          leftWords: [...newWordList.words],
          rightWords: [...newWordList.words],
          letterIndex: 0,
          sequence: [],
          currentLetter: letterSequence[0],
          usedLetters: new Set(),
          isComplete: false,
        },
      };
    }

    case 'MAKE_BINARY_CHOICE': {
      const { choice } = action.payload;
      const newSequence = [...state.filterState.sequence, choice];
      const newLetterIndex = state.filterState.letterIndex + 1;
      
      // Get next letter from sequence
      const nextLetter = letterSequence[newLetterIndex] || '';
      
      // Filter words using dual-interpretation logic
      const filteredWords = filterWords(
        state.selectedWordList!.words,
        newSequence,
        newLetterIndex,
        letterSequence
      );
      
      return {
        ...state,
        filterState: {
          ...state.filterState,
          currentLetter: nextLetter,
          sequence: newSequence,
          leftWords: filteredWords.leftWords,
          rightWords: filteredWords.rightWords,
          letterIndex: newLetterIndex,
          usedLetters: new Set([...state.filterState.usedLetters, state.filterState.currentLetter]),
          isComplete: newLetterIndex >= letterSequence.length,
        },
      };
    }

    case 'RESET_FILTER': {
      return {
        ...state,
        filterState: {
          ...state.filterState,
          currentLetter: letterSequence[0],
          sequence: [],
          leftWords: [...state.selectedWordList!.words],
          rightWords: [...state.selectedWordList!.words],
          letterIndex: 0,
          usedLetters: new Set(),
          isComplete: false,
        },
      };
    }

    case 'UPDATE_PREFERENCES': {
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };
    }

    case 'TOGGLE_PERFORM_MODE': {
      return {
        ...state,
        isInPerformMode: !state.isInPerformMode,
      };
    }

    case 'SET_PERFORM_MODE': {
      return {
        ...state,
        isInPerformMode: action.payload,
      };
    }

    default:
      return state;
  }
}

// Dual-interpretation filtering algorithm
function filterWords(
  wordList: string[],
  sequence: BinaryChoice[],
  currentLetterIndex: number,
  letterSequence: string
): { leftWords: string[]; rightWords: string[] } {
  const leftWords: string[] = [];
  const rightWords: string[] = [];
  
  wordList.forEach(word => {
    const upperWord = word.toUpperCase();
    let matchesLeftPattern = true;
    let matchesRightPattern = true;
    
    // Check each choice in the sequence
    for (let i = 0; i < sequence.length; i++) {
      const letter = letterSequence[i];
      const choice = sequence[i];
      const hasLetter = upperWord.includes(letter);
      
      // Left Pattern: L=include letter, R=exclude letter
      if (choice === 'L' && !hasLetter) {
        matchesLeftPattern = false;
      }
      if (choice === 'R' && hasLetter) {
        matchesLeftPattern = false;
      }
      
      // Right Pattern: R=include letter, L=exclude letter
      if (choice === 'R' && !hasLetter) {
        matchesRightPattern = false;
      }
      if (choice === 'L' && hasLetter) {
        matchesRightPattern = false;
      }
    }
    
    // Add word to appropriate pool(s)
    if (matchesLeftPattern) leftWords.push(word);
    if (matchesRightPattern) rightWords.push(word);
  });
  
  return { leftWords, rightWords };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const makeBinaryChoice = (choice: BinaryChoice) => {
    dispatch({ type: 'MAKE_BINARY_CHOICE', payload: { choice } });
  };

  const resetFilter = () => {
    dispatch({ type: 'RESET_FILTER' });
  };

  const selectWordList = (wordList: WordList) => {
    dispatch({ type: 'SELECT_WORD_LIST', payload: wordList });
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const togglePerformMode = () => {
    dispatch({ type: 'TOGGLE_PERFORM_MODE' });
  };

  const setPerformMode = (enabled: boolean) => {
    dispatch({ type: 'SET_PERFORM_MODE', payload: enabled });
  };

  const value: AppContextType = {
    state,
    makeBinaryChoice,
    resetFilter,
    selectWordList,
    updatePreferences,
    togglePerformMode,
    setPerformMode,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
