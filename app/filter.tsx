import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, Dimensions, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../context/AppContext';

const { width, height } = Dimensions.get('window');

export default function FilterPage() {
  const { state, makeBinaryChoice, resetFilter } = useAppContext();
  const [showWords, setShowWords] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const words = [
    "Necessary", "Toothbrush", "Remember", "Loveable", "Clementine",
    "Swingset", "Elephant", "Umbrella", "Antidote", "Impression"
  ];

  const letterSequence = "NTRLCSEUAI";

  useEffect(() => {
    setCurrentLetterIndex(state.filterState.letterIndex);
  }, [state.filterState.letterIndex]);

  const handleTapToShowWords = () => {
    setShowWords(true);
  };

  const handleBinaryChoice = (choice: 'L' | 'R') => {
    makeBinaryChoice(choice);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handlePlayAgain = () => {
    resetFilter();
    setShowWords(false);
    setCurrentLetterIndex(0);
  };

  // iOS Stopwatch Component for PERFORM mode
  const iOSStopwatch = () => (
    <View className="absolute inset-0 bg-black/90 justify-center items-center">
      {/* Stopwatch Display */}
      <View className="bg-gray-900 rounded-3xl p-8 w-80 h-80 justify-center items-center">
        {/* Time Display */}
        <View className="mb-8">
          <Text className="text-white text-6xl font-light font-mono">00:00.00</Text>
        </View>
        
        {/* Control Buttons */}
        <View className="flex-row space-x-4">
          <TouchableOpacity className="w-16 h-16 bg-red-600 rounded-full justify-center items-center">
            <Text className="text-white text-lg font-semibold">Reset</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-16 h-16 bg-green-600 rounded-full justify-center items-center">
            <Text className="text-white text-lg font-semibold">Start</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-16 h-16 bg-blue-600 rounded-full justify-center items-center">
            <Text className="text-white text-lg font-semibold">Lap</Text>
          </TouchableOpacity>
        </View>
        
        {/* Lap Times */}
        <View className="mt-6 w-full">
          <Text className="text-white text-center text-lg mb-2">Lap Times</Text>
          <View className="space-y-1">
            <Text className="text-gray-400 text-center">1. 00:00.00</Text>
            <Text className="text-gray-400 text-center">2. 00:00.00</Text>
            <Text className="text-gray-400 text-center">3. 00:00.00</Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (!showWords) {
    return (
      <View className="flex-1 bg-black">
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-12 right-6 z-10 w-12 h-12 bg-transparent border border-white rounded-lg justify-center items-center"
          onPress={handleBackToHome}
        >
          <Text className="text-white text-xl">←</Text>
        </TouchableOpacity>

        {/* Empty ChatGPT Interface */}
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-full max-w-2xl">
            {/* ChatGPT Header */}
            <View className="flex-row items-center justify-between mb-8">
              <Text className="text-white text-2xl font-semibold">ChatGPT</Text>
              <TouchableOpacity className="px-4 py-2 bg-green-600 rounded-lg">
                <Text className="text-white font-semibold">Get Plus</Text>
              </TouchableOpacity>
            </View>

            {/* Empty Chat Area */}
            <View className="flex-1 justify-center items-center min-h-96">
              <Text className="text-gray-400 text-xl text-center">
                Tap anywhere to start the binary word guessing game
              </Text>
            </View>

            {/* Input Area */}
            <View className="border border-gray-600 rounded-2xl p-4 mt-8">
              <View className="flex-row items-center">
                <View className="flex-1 bg-gray-700 rounded-xl px-4 py-3">
                  <Text className="text-gray-300">Message ChatGPT...</Text>
                </View>
                <TouchableOpacity className="ml-3 w-10 h-10 bg-green-600 rounded-xl justify-center items-center">
                  <Text className="text-white text-xl">→</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Tap to Start Overlay */}
        <Pressable
          className="absolute inset-0"
          onPress={handleTapToShowWords}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* PERFORM Mode iOS Stopwatch Underlay */}
      {state.isInPerformMode && <iOSStopwatch />}

      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-12 right-6 z-10 w-12 h-12 bg-transparent border border-white rounded-lg justify-center items-center"
        onPress={handleBackToHome}
      >
        <Text className="text-white text-xl">←</Text>
      </TouchableOpacity>

      {/* ChatGPT Interface with Words */}
      <View className="flex-1 px-6 pt-20">
        <View className="w-full max-w-2xl mx-auto">
          {/* ChatGPT Header */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-white text-2xl font-semibold">ChatGPT</Text>
            <TouchableOpacity className="px-4 py-2 bg-green-600 rounded-lg">
              <Text className="text-white font-semibold">Get Plus</Text>
            </TouchableOpacity>
          </View>

          {/* ChatGPT Message with Words */}
          <View className="bg-gray-800 rounded-2xl p-6 mb-8">
            <Text className="text-white text-lg mb-4">
              Here are 10 random words:
            </Text>
            {words.map((word, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <Text className="text-white text-lg">{word}</Text>
                {index === currentLetterIndex && (
                  <View className="ml-3 w-3 h-3 bg-white rounded-full" />
                )}
              </View>
            ))}
          </View>

          {/* Current Letter Display */}
          <View className="bg-blue-600 rounded-full w-20 h-20 justify-center items-center mx-auto mb-8">
            <Text className="text-white text-3xl font-bold">
              {letterSequence[currentLetterIndex] || '✓'}
            </Text>
          </View>

          {/* Word Lists Overlay */}
          <View className="flex-row justify-between mb-8">
            {/* Left Words */}
            <View className="flex-1 mr-2">
              <Text className="text-white text-center mb-2 font-semibold">
                Left Pattern ({state.filterState.leftWords.length})
              </Text>
              <View className="bg-gray-800 rounded-lg p-3 max-h-32">
                <ScrollView showsVerticalScrollIndicator={false}>
                  {state.filterState.leftWords.map((word, index) => (
                    <Text key={index} className="text-white text-sm mb-1">
                      {word}
                    </Text>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Right Words */}
            <View className="flex-1 ml-2">
              <Text className="text-white text-center mb-2 font-semibold">
                Right Pattern ({state.filterState.rightWords.length})
              </Text>
              <View className="bg-gray-800 rounded-lg p-3 max-h-32">
                <ScrollView showsVerticalScrollIndicator={false}>
                  {state.filterState.rightWords.map((word, index) => (
                    <Text key={index} className="text-white text-sm mb-1">
                      {word}
                    </Text>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Binary Choice Buttons */}
          <View className="flex-row justify-center space-x-8 mb-8">
            <TouchableOpacity
              className="w-32 h-16 bg-transparent border border-white rounded-lg justify-center items-center"
              onPress={() => handleBinaryChoice('L')}
              disabled={state.filterState.isComplete}
            >
              <Text className="text-white text-2xl font-bold">L</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="w-32 h-16 bg-transparent border border-white rounded-lg justify-center items-center"
              onPress={() => handleBinaryChoice('R')}
              disabled={state.filterState.isComplete}
            >
              <Text className="text-white text-2xl font-bold">R</Text>
            </TouchableOpacity>
          </View>

          {/* Game Status */}
          {state.filterState.isComplete && (
            <View className="bg-green-600 rounded-lg p-4 mb-4">
              <Text className="text-white text-center text-lg font-semibold">
                Game Complete! All letters processed.
              </Text>
            </View>
          )}

          {/* Play Again Button */}
          {state.filterState.isComplete && (
            <TouchableOpacity
              className="w-full h-16 bg-blue-600 rounded-lg justify-center items-center"
              onPress={handlePlayAgain}
            >
              <Text className="text-white text-xl font-semibold">Play Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
