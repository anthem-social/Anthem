import { Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Status } from '@/types';
import { playUri } from '@/api/spotify';
import { TrackCard } from '@/components/Core/TrackCard';
import { Text, View, Icon } from '@/components/Themed';

type Props = {
  card: Card;
  status: Status;
}

export function ChatCard({ card, status }: Props) {
  const difference: number = new Date().getUTCSeconds() - new Date(status.lastChanged).getUTCSeconds();
  var color: string;
  if (difference < 300) {
    color = 'green';
  }
  else {
    color = 'grey';
  }

  const chat = (userId: string) => {
    console.log('Opening DM for ' + userId);
  }

  const play = async (uri: string) => {
    await playUri(uri);
  }

  const profile = (userId: string) => {
    console.log('Opening profile for ' + userId);
  }

  return (
    <TouchableOpacity onPress={() => chat(card.userId)}> 
      <View style={[styles.row, styles.card]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Image source={{ uri: card.pictureUrl }} style={[styles.picture, { borderColor: color}]} />
        </TouchableOpacity>
        <View style={styles.col}>
          <Text style={styles.nickname}>
            {card.nickname}
          </Text>
          <View style={[styles.row, { maxWidth: Dimensions.get('window').width - 160 }]}>
            <TrackCard {...status.track} />
          </View>
        </View>
        <View style={styles.play}>
          <Icon family="MaterialIcons" name="play-arrow" size={34} onPress={() => play(status.track.uri)}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
    padding: 8
  },
  col: {
    flexDirection: 'column',
    gap: 12
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 3,
    paddingTop: 4
  },
  picture: {
    width: 64,
    height: 64,
    borderRadius: 2,
    borderWidth: 2,
  },
  play: {
    marginLeft: 'auto'
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 14
  }
});
