# UptBinary - Mind Reader

A sophisticated binary word-guessing system disguised as a ChatGPT interface, built with React Native and Expo Router. The app combines the dual-interpretation binary logic with a modern ChatGPT aesthetic and includes an iOS Stopwatch underlay for PERFORM mode.

## Features

### 🧠 Binary Word Guessing System
- **Dual-Interpretation Logic**: Each L/R choice has two possible meanings
- **10 Predefined Words**: Necessary, Toothbrush, Remember, Loveable, Clementine, Swingset, Elephant, Umbrella, Antidote, Impression
- **Letter Sequence**: NTRLCSEUAI (first letters of each word)
- **Real-time Filtering**: Words are filtered into left and right pools after each choice
- **Smart Mode**: Automatic transition to intelligent letter selection

### 🎭 ChatGPT Interface
- **Authentic Design**: Looks and feels like the real ChatGPT
- **Word Display**: Shows the 10 words in ChatGPT message format
- **Dot System**: White dot indicates which word's letter is currently being processed
- **Binary Controls**: L/R buttons with clean white borders

### ⏱️ PERFORM Mode
- **iOS Stopwatch Underlay**: Beautiful, non-functional stopwatch interface
- **Same Binary Logic**: All functionality works exactly as in normal mode
- **Visual Enhancement**: Adds professional performance aesthetic

### 🎪 Performance Mode
- **Two-Person Setup**: Separate controls for two spectators
- **Long Press Activation**: 2-second hold reveals spectator buttons
- **Real-time Updates**: Live word filtering during performance

### ⚙️ Settings & Customization
- **Word List Management**: 6 default lists + custom lists
- **Letter Sequences**: 4 preset sequences + custom sequences
- **App Preferences**: Theme, export settings, psychological profiling
- **Export System**: Save filtered results to files

## Technology Stack

- **Framework**: React Native with Expo Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (NativeWind)
- **State Management**: React Context with useReducer
- **Platform Support**: iOS, Android, Web (PWA)
- **Navigation**: File-based routing with Expo Router

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd uptbinary
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

### 4. Run on Your Platform
- **Web**: Press `w` in the terminal or visit the localhost URL
- **iOS**: Press `i` in the terminal (requires iOS Simulator)
- **Android**: Press `a` in the terminal (requires Android Emulator)

## PWA Setup (Web)

The app is configured as a Progressive Web App (PWA) for web browsers:

- **Installable**: Users can add it to their home screen
- **Offline Support**: Service worker for offline functionality
- **App-like Experience**: Full-screen mode without browser UI
- **Responsive Design**: Optimized for all screen sizes

## How the Binary System Works

### Dual-Interpretation Logic
Each binary choice (L/R) creates two possible word pools:

1. **Left Pattern**: L = include letter, R = exclude letter
2. **Right Pattern**: R = include letter, L = exclude letter

### Example with Letter 'N'
- User chooses 'L'
- **Left Pattern**: Words MUST contain 'N'
- **Right Pattern**: Words MUST NOT contain 'N'

### Word Filtering Process
1. User makes L/R choice for current letter
2. System applies dual-interpretation filtering
3. Words are sorted into leftWords and rightWords arrays
4. Next letter in sequence becomes active
5. White dot moves to next word
6. Process repeats until all letters processed

## Game Flow

### 1. Initialization
- Load 10 predefined words
- Set letter sequence to NTRLCSEUAI
- Start with letter 'N' (index 0)
- Show dot next to "Necessary"
- Display all words in both pools

### 2. Binary Choice Processing
- User sees current letter (e.g., 'N')
- User makes L or R choice
- System applies dual-interpretation filtering
- Update leftWords and rightWords arrays
- Move to next letter (e.g., 'T')
- Move dot to next word ("Toothbrush")
- Display updated word pools

### 3. Game Completion
- Continue until all 10 letters processed
- Or until one word pool has ≤1 word
- Show final results
- Provide "Play Again" option

## File Structure

```
uptbinary/
├── app/                    # Main app screens
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Home page
│   ├── settings.tsx       # Settings page
│   ├── filter.tsx         # Main game interface
│   ├── spectator.tsx      # Performance mode
│   └── main.tsx           # App entry point
├── context/               # State management
│   └── AppContext.tsx     # App context provider
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
├── web-build/             # PWA web build files
│   ├── index.html         # Web entry point
│   └── manifest.json      # PWA manifest
├── global.css             # Global styles
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── babel.config.js        # Babel configuration
├── tsconfig.json          # TypeScript configuration
├── app.json               # Expo configuration
└── README.md              # This file
```

## Usage Instructions

### Basic Game Play
1. **Start**: Click "Read Minds" from home page
2. **Tap**: Tap anywhere on empty ChatGPT interface
3. **Words**: 10 words appear with ChatGPT styling
4. **Choose**: Make L/R choices for each letter
5. **Watch**: See words filter into left/right pools
6. **Complete**: Process all 10 letters

### PERFORM Mode
1. **Activate**: Click "PERFORM" button from home
2. **Interface**: Same game with iOS Stopwatch underlay
3. **Functionality**: All binary logic works identically
4. **Aesthetic**: Professional performance appearance

### Performance Mode
1. **Navigate**: Go to spectator page
2. **Long Press**: Hold anywhere for 2 seconds
3. **Controls**: Spectator buttons appear
4. **Two Players**: Separate L/R controls for each spectator
5. **Real-time**: Live updates during performance

## Customization

### Word Lists
- Add custom word lists in the settings
- Support for various file formats
- Dynamic loading and caching

### Letter Sequences
- Create custom 3-50 character sequences
- Alphanumeric characters only
- Save and load custom sequences

### App Preferences
- Toggle psychological profiling
- Export settings configuration
- Theme and appearance options

## Building for Production

### Web Build
```bash
npm run web
```

### iOS Build
```bash
expo build:ios
```

### Android Build
```bash
expo build:android
```

## Troubleshooting

### Common Issues
1. **Metro bundler errors**: Clear cache with `expo start -c`
2. **NativeWind not working**: Ensure babel plugin is configured
3. **PWA not installing**: Check manifest.json and service worker
4. **Performance issues**: Optimize word filtering for large lists

### Development Tips
- Use React DevTools for state debugging
- Monitor performance with React Profiler
- Test PWA functionality in incognito mode
- Verify binary logic with small word sets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

**UptBinary - Where Binary Logic Meets ChatGPT Aesthetics** 🧠✨
