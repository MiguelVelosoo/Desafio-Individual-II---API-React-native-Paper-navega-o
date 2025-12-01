import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Post = {
  id: number;
  title: string;
  body: string;
};

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        {post.title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
