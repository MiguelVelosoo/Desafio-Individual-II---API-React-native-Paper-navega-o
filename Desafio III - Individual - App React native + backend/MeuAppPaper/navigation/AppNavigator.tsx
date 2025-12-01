import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen';
import { Post } from '../services/api';

export type RootStackParamList = {
  Home: undefined;
  Posts: undefined;
  PostDetail: { post: Post };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Posts" component={PostsScreen} options={{ title: 'Posts' }} />
    </Stack.Navigator>
  );
}
