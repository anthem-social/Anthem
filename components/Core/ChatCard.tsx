import { StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Status } from '@/types';
import { TrackCard } from '@/components/Core/TrackCard';
import { Text, View, Icon } from '@/components/Themed';

type Props = {
  card: Card;
  status: Status;
}

export function ChatCard({ card, status }: Props) {
  const difference: number = new Date().getUTCSeconds() - new Date(status.lastChanged).getUTCSeconds();
  var color: string;
  if (difference < 130) {
    color = 'green';
  }
  else {
    color = 'grey';
  }

  const chat = (userId: string) => {
    console.log('Opening DM for ' + userId);
  }

  const profile = (userId: string) => {
    console.log('Opening profile for ' + userId);
  }

  return (
    <TouchableOpacity onPress={() => chat(card.userId)}> 
      <View style={[styles.row, styles.card]}>
        <View style={styles.col}>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <TouchableOpacity onPress={() => profile(card.userId)}>
              <Text style={styles.nickname}>
                {card.nickname}
              </Text>
            </TouchableOpacity>
            <Icon style={[styles.dot, { color: color }]} family="Octicons" name="dot-fill" size={14} />
          </View>
          <View style={[styles.row]}>
            <TrackCard {...status.track} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
    padding: 10
  },
  col: {
    flexDirection: 'column',
    gap: 12
  },
  dot: {
    paddingLeft: 12
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 2
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
