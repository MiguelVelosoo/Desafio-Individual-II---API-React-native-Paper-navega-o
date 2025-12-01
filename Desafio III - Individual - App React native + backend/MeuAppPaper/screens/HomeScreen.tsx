import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Bem-vindo ao App Posts!"
          subtitle="Toque no botão para ver os posts"
          left={(props) => <Avatar.Icon {...props} icon="post" />}
        />
        <Card.Content>
          <Title style={styles.title}>Funcionalidades:</Title>
          <Paragraph style={styles.paragraph}>- Lista de posts da API</Paragraph>
          <Paragraph style={styles.paragraph}>- Navegação entre telas</Paragraph>
          <Paragraph style={styles.paragraph}>- Detalhes de cada post</Paragraph>
          <Paragraph style={styles.paragraph}>- Design com Paper</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Posts')}
            style={styles.button}
          >
            Ver Posts
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F2F7',
  },
  card: {
    marginTop: 32,
    elevation: 4,
  },
  title: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 4,
  },
  button: {
    margin: 8,
  },
});
