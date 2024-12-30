import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AnthemView from '@/components/AnthemView';
import { Status, Track, User } from '@/types';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedIcon } from '@/components/ThemedIcon';
import ScrollingTrack from '@/components/ScrolligTrack';
import { playUri } from '@/api/spotify';
import { useState } from 'react';

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
      <ThemedView style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <ThemedIcon name="more-horiz" size={30} />
        </TouchableOpacity>
        <ThemedButton title={action[0].toString()} onPress={action[1]} />
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText style={styles.nickname}>
          {user.nickname}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.row}>
        <Image source={{ uri: user.pictureUrl }} style={[styles.picture, { borderColor: borderColor }]} />
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText style={styles.bio}>
          {user.bio}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedView style={[styles.row, { marginBottom: 0, maxWidth: Dimensions.get('window').width - 50 }]}>
          <ScrollingTrack {...status.track} />
          <ThemedIcon name="play-arrow" size={24} onPress={() => play(status.track.uri)}/>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.col}>
          <ThemedText>Active</ThemedText>
          <ThemedText>{lastActive}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.col}>
          <ThemedText>Followers</ThemedText>
          <ThemedText>{user.followers.length}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.col}>
          <ThemedText>Following</ThemedText>
          <ThemedText>{user.following.length}</ThemedText>
        </ThemedView>
      </ThemedView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <ThemedView style={styles.overlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <ThemedView style={styles.modal}>
                <ThemedView style={styles.id}>
                  <ThemedText>ID: {user.id}</ThemedText>
                </ThemedView>
                {isCurrentUser
                  ? <ThemedView style={styles.options}>
                      <ThemedView style={[styles.element, styles.copy]}>
                        <ThemedIcon name="filter-none" size={20} style={{ transform:  [{ rotate: '90deg' }] }} />
                        <ThemedButton title="Copy ID" onPress={() => console.log("Copy ID")} />
                      </ThemedView>
                    </ThemedView>
                  : <ThemedView style={styles.options}>
                      <ThemedView style={[styles.element, styles.copy]}>
                        <ThemedIcon name="filter-none" size={20} style={{ transform:  [{ rotate: '90deg' }] }} />
                        <ThemedButton title="Copy ID" onPress={() => console.log("Copy ID")} />
                      </ThemedView>
                      <ThemedView style={styles.element}>
                        <ThemedButton title="Chat" onPress={() => console.log("Chat")} />
                      </ThemedView>
                    </ThemedView>
                }
              </ThemedView>
            </TouchableWithoutFeedback>
          </ThemedView>
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
