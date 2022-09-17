import { useEffect, useState } from 'react';

import { View, Image, FlatList, Text} from 'react-native';

import logoImg from "../../assets/logo-nlw-esports.png";

import { GAMES } from '../../utils/games';
import { GameCard, GameCardProps } from '../../components/GameCard';

import { Heading } from '../../components/Heading';
import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.159:8000/games")
    .then(response => response.json())
    .then(data => console.log(games))
  }, [])

  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}

      />

      {/* <Text>{games.}</Text> */}

      <Heading 
        title="Encontre seu duo!"
        subtitle='Selection o game que deseja jogar...'/>

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard
            data={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}