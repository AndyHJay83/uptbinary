import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function HomePage() {
  const { setPerformMode } = useAppContext();

  const handleReadMinds = () => {
    setPerformMode(false);
    router.push('/filter');
  };

  const handlePerform = () => {
    setPerformMode(true);
    router.push('/filter');
  };

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Text className="text-white text-4xl font-bold mb-16">Mind Reader</Text>
      
      <TouchableOpacity
        className="w-64 h-16 bg-transparent border border-white rounded-lg justify-center items-center mb-6"
        onPress={() => router.push('/settings')}
      >
        <Text className="text-white text-xl font-semibold">Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="w-64 h-16 bg-transparent border border-white rounded-lg justify-center items-center"
        onPress={handleReadMinds}
      >
        <Text className="text-white text-xl font-semibold">Read Minds</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-64 h-16 bg-transparent border border-white rounded-lg justify-center items-center mt-6"
        onPress={handlePerform}
      >
        <Text className="text-white text-xl font-semibold">PERFORM</Text>
      </TouchableOpacity>
    </View>
  );
}
