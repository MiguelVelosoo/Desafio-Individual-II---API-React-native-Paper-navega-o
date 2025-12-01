import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Appbar, Searchbar, ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostItem from '../components/PostItem';
import { api, type Post } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PostsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      setPosts(data.slice(0, 50));
      setFilteredPosts(data.slice(0, 50));
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  }, [loadPosts]);

  const filterPosts = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const goToPostDetail = (post: Post) => {
    navigation.navigate('PostDetail', { post });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={styles.loadingText}>Carregando posts...</Text>
      </View>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Posts" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      
      <Searchbar
        placeholder="Pesquisar posts..."
        onChangeText={filterPosts}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => (
          <PostItem post={item} onPress={() => goToPostDetail(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {filteredPosts.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'Nenhum post encontrado' : 'Nenhum post disponível'}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
