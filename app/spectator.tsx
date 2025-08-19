import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function SpectatorPage() {
  const { state, makeBinaryChoice, resetFilter } = useAppContext();
  const [spectator1Sequence, setSpectator1Sequence] = useState<string[]>([]);
  const [spectator2Sequence, setSpectator2Sequence] = useState<string[]>([]);
  const [showSpectatorButtons, setShowSpectatorButtons] = useState(false);

  const words = [
    "Necessary", "Toothbrush", "Remember", "Loveable", "Clementine",
    "Swingset", "Elephant", "Umbrella", "Antidote", "Impression"
  ];

  const letterSequence = "NTRLCSEUAI";

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleSpectatorChoice = (spectator: 1 | 2, choice: 'L' | 'R') => {
    if (spectator === 1) {
      setSpectator1Sequence([...spectator1Sequence, choice]);
    } else {
      setSpectator2Sequence([...spectator2Sequence, choice]);
    }
    
    // Also update the main game state
    makeBinaryChoice(choice);
  };

  const handleReset = () => {
    setSpectator1Sequence([]);
    setSpectator2Sequence([]);
    resetFilter();
  };

  const handleLongPress = () => {
    setShowSpectatorButtons(true);
  };

  return (
    <View className="flex-1 bg-black">
      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-12 right-6 z-10 w-12 h-12 bg-transparent border border-white rounded-lg justify-center items-center"
        onPress={handleBackToHome}
      >
        <Text className="text-white text-xl">←</Text>
      </TouchableOpacity>

      {/* Title */}
      <View className="pt-20 pb-8 px-6">
        <Text className="text-white text-3xl font-bold text-center">Performance Mode</Text>
        <Text className="text-gray-400 text-lg text-center mt-2">
          Two-person binary word guessing
        </Text>
      </View>

      {/* Instructions */}
      <View className="px-6 mb-8">
        <Text className="text-white text-lg text-center mb-4">
          Long press anywhere to reveal spectator buttons
        </Text>
        <TouchableOpacity
          className="w-full h-16 bg-blue-600 rounded-lg justify-center items-center"
          onPress={handleReset}
        >
          <Text className="text-white text-xl font-semibold">Reset Game</Text>
        </TouchableOpacity>
      </View>

      {/* Word Display */}
      <View className="px-6 mb-8">
        <View className="bg-gray-800 rounded-2xl p-6">
          <Text className="text-white text-lg mb-4 text-center">
            Here are 10 random words:
          </Text>
          {words.map((word, index) => (
            <View key={index} className="flex-row items-center justify-center mb-2">
              <Text className="text-white text-lg">{word}</Text>
              {index === state.filterState.letterIndex && (
                <View className="ml-3 w-3 h-3 bg-white rounded-full" />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Current Letter */}
      <View className="px-6 mb-8">
        <View className="bg-blue-600 rounded-full w-20 h-20 justify-center items-center mx-auto">
          <Text className="text-white text-3xl font-bold">
            {letterSequence[state.filterState.letterIndex] || '✓'}
          </Text>
        </View>
      </View>

      {/* Spectator Results */}
      <View className="flex-1 px-6">
        <View className="flex-row space-x-4">
          {/* Spectator 1 */}
          <View className="flex-1">
            <Text className="text-white text-center mb-2 font-semibold">
              Spectator 1 ({spectator1Sequence.length} choices)
            </Text>
            <View className="bg-gray-800 rounded-lg p-3 max-h-32">
              <ScrollView showsVerticalScrollIndicator={false}>
                {spectator1Sequence.map((choice, index) => (
                  <Text key={index} className="text-white text-sm mb-1 text-center">
                    {choice}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Spectator 2 */}
          <View className="flex-1">
            <Text className="text-white text-center mb-2 font-semibold">
              Spectator 2 ({spectator2Sequence.length} choices)
            </Text>
            <View className="bg-gray-800 rounded-lg p-3 max-h-32">
              <ScrollView showsVerticalScrollIndicator={false}>
                {spectator2Sequence.map((choice, index) => (
                  <Text key={index} className="text-white text-sm mb-1 text-center">
                    {choice}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>

      {/* Spectator Buttons (Hidden by default) */}
      {showSpectatorButtons && (
        <View className="absolute inset-0 bg-black/95 justify-center items-center">
          <View className="w-full max-w-md px-6">
            <Text className="text-white text-2xl font-bold text-center mb-8">
              Spectator Controls
            </Text>
            
            {/* Spectator 1 Controls */}
            <View className="mb-8">
              <Text className="text-white text-xl text-center mb-4">Spectator 1</Text>
              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity
                  className="w-24 h-24 bg-transparent border border-white rounded-lg justify-center items-center"
                  onPress={() => handleSpectatorChoice(1, 'L')}
                >
                  <Text className="text-white text-3xl font-bold">L</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="w-24 h-24 bg-transparent border border-white rounded-lg justify-center items-center"
                  onPress={() => handleSpectatorChoice(1, 'R')}
                >
                  <Text className="text-white text-3xl font-bold">R</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Spectator 2 Controls */}
            <View className="mb-8">
              <Text className="text-white text-xl text-center mb-4">Spectator 2</Text>
              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity
                  className="w-24 h-24 bg-transparent border border-white rounded-lg justify-center items-center"
                  onPress={() => handleSpectatorChoice(2, 'L')}
                >
                  <Text className="text-white text-3xl font-bold">L</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="w-24 h-24 bg-transparent border border-white rounded-lg justify-center items-center"
                  onPress={() => handleSpectatorChoice(2, 'R')}
                >
                  <Text className="text-white text-3xl font-bold">R</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Hide Buttons */}
            <TouchableOpacity
              className="w-full h-16 bg-gray-600 rounded-lg justify-center items-center"
              onPress={() => setShowSpectatorButtons(false)}
            >
              <Text className="text-white text-xl font-semibold">Hide Controls</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Long Press Area */}
      <Pressable
        className="absolute inset-0"
        onLongPress={handleLongPress}
        delayLongPress={2000}
      />
    </View>
  );
}
