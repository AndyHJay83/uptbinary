import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../context/AppContext';

const wordLists = [
  { id: 'en-uk', name: 'EN-UK Dictionary', words: [] },
  { id: '19k', name: '19K Word List', words: [] },
  { id: 'all-names', name: 'All Names', words: [] },
  { id: 'boys-names', name: 'Boys Names', words: [] },
  { id: 'girls-names', name: 'Girls Names', words: [] },
  { id: 'months-starsigns', name: 'Months & Star Signs', words: [] }
];

const letterSequences = [
  { id: 'full-alphabet', name: 'Full Alphabet (26)', sequence: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { id: 'seatjk', name: 'SEATJK (6)', sequence: 'SEATJK' },
  { id: 'vowels-only', name: 'Vowels Only (5)', sequence: 'AEIOU' },
  { id: 'most-frequent', name: 'Most Frequent (Dynamic)', sequence: 'ETAOINSHRDLUCMFWYPVBGKQJXZ' }
];

export default function SettingsPage() {
  const { state, selectWordList, updatePreferences } = useAppContext();
  const [customSequence, setCustomSequence] = useState('');

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1 px-6 py-8">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-white text-3xl font-bold">Settings</Text>
          <TouchableOpacity
            onPress={handleBackToHome}
            className="w-12 h-12 bg-transparent border border-white rounded-lg justify-center items-center"
          >
            <Text className="text-white text-xl">←</Text>
          </TouchableOpacity>
        </View>

        {/* Word List Management */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Word List</Text>
          {wordLists.map((list) => (
            <TouchableOpacity
              key={list.id}
              className={`w-full h-12 border rounded-lg justify-center px-4 mb-2 ${
                state.userPreferences.selectedWordListId === list.id
                  ? 'border-green-500 bg-green-900/20'
                  : 'border-white bg-transparent'
              }`}
              onPress={() => selectWordList(list)}
            >
              <Text className={`text-lg ${
                state.userPreferences.selectedWordListId === list.id
                  ? 'text-green-400'
                  : 'text-white'
              }`}>
                {list.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Letter Sequence Management */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Letter Sequence</Text>
          {letterSequences.map((seq) => (
            <TouchableOpacity
              key={seq.id}
              className={`w-full h-12 border rounded-lg justify-center px-4 mb-2 ${
                state.userPreferences.selectedSequenceId === seq.id
                  ? 'border-green-500 bg-green-900/20'
                  : 'border-white bg-transparent'
              }`}
              onPress={() => updatePreferences({ selectedSequenceId: seq.id })}
            >
              <Text className={`text-lg ${
                state.userPreferences.selectedSequenceId === seq.id
                  ? 'text-green-400'
                  : 'text-white'
              }`}>
                {seq.name}
              </Text>
            </TouchableOpacity>
          ))}
          
          {/* Custom Sequence Input */}
          <View className="mt-4">
            <Text className="text-white text-lg mb-2">Custom Sequence (3-50 chars)</Text>
            <TextInput
              className="w-full h-12 border border-white rounded-lg px-4 text-white text-lg bg-transparent"
              placeholder="Enter custom sequence..."
              placeholderTextColor="#666"
              value={customSequence}
              onChangeText={setCustomSequence}
              maxLength={50}
            />
          </View>
        </View>

        {/* App Preferences */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Preferences</Text>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg">Psychological Profiling</Text>
            <Switch
              value={state.userPreferences.enablePsychologicalProfiling}
              onValueChange={(value) => updatePreferences({ enablePsychologicalProfiling: value })}
              trackColor={{ false: '#333', true: '#10b981' }}
              thumbColor={state.userPreferences.enablePsychologicalProfiling ? '#fff' : '#ccc'}
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg">Include Timestamp in Exports</Text>
            <Switch
              value={state.userPreferences.exportSettings.includeTimestamp}
              onValueChange={(value) => updatePreferences({ 
                exportSettings: { ...state.userPreferences.exportSettings, includeTimestamp: value }
              })}
              trackColor={{ false: '#333', true: '#10b981' }}
              thumbColor={state.userPreferences.exportSettings.includeTimestamp ? '#fff' : '#ccc'}
            />
          </View>

          <View className="mt-4">
            <Text className="text-white text-lg mb-2">Default Export Filename</Text>
            <TextInput
              className="w-full h-12 border border-white rounded-lg px-4 text-white text-lg bg-transparent"
              placeholder="Enter filename..."
              placeholderTextColor="#666"
              value={state.userPreferences.exportSettings.defaultFilename}
              onChangeText={(value) => updatePreferences({ 
                exportSettings: { ...state.userPreferences.exportSettings, defaultFilename: value }
              })}
            />
          </View>
        </View>

        {/* App Info */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">App Information</Text>
          <Text className="text-gray-400 text-lg">Version: 1.0.0</Text>
          <Text className="text-gray-400 text-lg">Built with React Native & Expo</Text>
        </View>
      </ScrollView>
    </View>
  );
}
