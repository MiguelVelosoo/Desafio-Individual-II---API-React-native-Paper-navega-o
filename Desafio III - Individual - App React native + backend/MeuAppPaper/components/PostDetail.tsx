import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Post } from '../services/api';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
  route: PostDetailRouteProp;
}

export default function PostDetail({ navigation, route }: Props) {
  const { post } = route.params;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Post #${post.id}`} />
      </Appbar.Header>
      
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{post.title}</Title>
            <Paragraph style={styles.body}>{post.body}</Paragraph>
            <Paragraph style={styles.meta}>ID do Usuário: {post.userId}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  meta: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});
