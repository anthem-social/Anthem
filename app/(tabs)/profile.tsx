import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Status, Track, User } from '@/types';
import { AnthemView, ScrollingTrack } from '@/components/Core';
import { playUri } from '@/api/spotify';
import { useState } from 'react';
import { Button, Icon, Text, View } from '@/components/Themed';

const anthem: Track = {
  uri: 'spotify:track:3KkXRkHbMCARz0aVfEt68P',
  name: 'Sunflower - Into the Spider-Verse',
  artists: [
    {
      uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4',
      name: 'Post Malone',
    },
    {
      uri: 'spotify:artist:1uNFoZAHBGtllmzznpCI3s',
      name: 'Swae Lee',
    },
  ],
  album: {
    uri: 'spotify:album:4yP0hdKOZPNshxUOjY0cZj',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f'
  }
}

// Limit bio to 110 chars
const mockUser: User = {
  id: 'schreineravery-us',
  nickname: 'Avery',
  bio: 'the creator',
  pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
  anthem: anthem,
  joined: new Date(),
  followers: ['schreineravery-us'],
  following: ['schreineravery-us'],
  friends: ['schreineravery-us'],
}

const mockStatus: Status = {
  userId: 'schreineravery-us',
  track: anthem,
  lastChanged: new Date()
}

const play = async (uri: string) => {
    await playUri(uri);
}

type Props = {
  status: Status,
  user: User,
  isCurrentUser: boolean
}

export default function Profile({ status = mockStatus, user = mockUser, isCurrentUser = false}: Props) {
  const now: number = Math.floor(new Date().getTime() / 1000);
  const lastChanged = Math.floor(status.lastChanged.getTime() / 1000);
  const difference: number = now - lastChanged;
  const minutes: number = Math.floor(difference / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);
  var borderColor: string = 'grey';
  var lastActive: string;

  if (weeks > 52) {
    lastActive = "Forever ago";
  }
  else if (weeks > 0) {
    lastActive = weeks + "w ago";
  }
  else if (days > 0) {
    lastActive = days + "d ago";
  }
  else if (hours > 0) {
    lastActive = hours + "h ago";
  }
  else if (minutes > 4) {
    lastActive = minutes + "m ago";
  }
  else {
    lastActive = "Now";
    borderColor = 'green';
  }
  
  const [showModal, setShowModal] = useState(false);
  const isFollowing: boolean = false;

  const handleFollow = () => {
    console.log("Follow");
  }

  const handleUnfollow = () => {
    console.log("Unfollow");
  }

  const handleEdit = () => {
    console.log("Edit");
  }

  const follow: [string, () => void] = ["Follow", handleFollow];
  const unfollow: [string, () => void] = ["Unfollow", handleUnfollow];
  const edit: [string, () => void] = ["Edit", handleEdit];
  var action: [String, () => void];

  if (isCurrentUser) {
    action = edit;
  }
  else if (isFollowing) {
    action = unfollow;
  }
  else {
    action = follow;
  }

  return (
    <AnthemView>
      <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Icon name="more-horiz" size={30} />
        </TouchableOpacity>
        <Button title={action[0].toString()} onPress={action[1]} />
      </View>
      <View style={styles.row}>
        <Text style={styles.nickname}>
          {user.nickname}
        </Text>
      </View>
      <View style={styles.row}>
        <Image source={{ uri: user.pictureUrl }} style={[styles.picture, { borderColor: borderColor }]} />
      </View>
      <View style={styles.row}>
        <Text style={styles.bio}>
          {user.bio}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.row, { marginBottom: 0, maxWidth: Dimensions.get('window').width - 50 }]}>
          <ScrollingTrack {...status.track} />
          <Icon name="play-arrow" size={24} onPress={() => play(status.track.uri)}/>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>Active</Text>
          <Text>{lastActive}</Text>
        </View>
        <View style={styles.col}>
          <Text>Followers</Text>
          <Text>{user.followers.length}</Text>
        </View>
        <View style={styles.col}>
          <Text>Following</Text>
          <Text>{user.following.length}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modal}>
                <View style={styles.id}>
                  <Text>ID: {user.id}</Text>
                </View>
                {isCurrentUser
                  ? <View style={styles.options}>
                      <View style={[styles.element, styles.copy]}>
                        <Icon name="filter-none" size={20} style={{ transform:  [{ rotate: '90deg' }] }} />
                        <Button title="Copy ID" onPress={() => console.log("Copy ID")} />
                      </View>
                    </View>
                  : <View style={styles.options}>
                      <View style={[styles.element, styles.copy]}>
                        <Icon name="filter-none" size={20} style={{ transform:  [{ rotate: '90deg' }] }} />
                        <Button title="Copy ID" onPress={() => console.log("Copy ID")} />
                      </View>
                      <View style={styles.element}>
                        <Button title="Chat" onPress={() => console.log("Chat")} />
                      </View>
                    </View>
                }
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </AnthemView>
  );
}

const styles = StyleSheet.create({
  bio: {
    fontSize: 14
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  copy: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  element: {
    shadowColor: 'grey',
    shadowOpacity: .3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 10,
    elevation: 5,
    padding: 6,
    borderRadius: 10
  },
  id: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14
  },
  modal: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: Dimensions.get('window').width * .6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  nickname: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingTop: 8,
    textAlign: 'center',
    flex: 1
  },
  options: {
    flexDirection: 'column',
    gap: 10
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  picture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  }
});
