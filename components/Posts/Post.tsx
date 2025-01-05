import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/types';
import { ReactNode, useState } from 'react';
import { Image } from 'react-native';
import { Icon, Text, View } from '@/components/Themed';
import Svg, { Path } from 'react-native-svg';
import React from 'react';

type Props = {
    card: Card;
    children: ReactNode;
}

export function Post({card, children }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const comment = (postId: string) => {
    console.log("Commenting on post");
  }
  
  const toggleLike = (postId: string) => {
    var previous = liked;

    if (previous) {
      console.log("Unliked");
    }
    else {
      console.log("Liked");
    }

    setLiked(!previous);
  }

  const profile = (userId: string) => {
    console.log("Opening profile");
  }

  const toggleSave = (uri: string) => {
    var previous = saved;

    if (previous) {
      console.log("Unsaved");
    }
    else {
      console.log("Saved");
    }

    setSaved(!previous);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => profile(card.userId)}>
        <View style={[styles.row, styles.card]}>
          <Image source={{ uri: card.pictureUrl }} style={styles.picture} />
          <Text style={styles.nickname}>
            {card.nickname}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        {children}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.pair} onPress={() => toggleLike("")}>
          <Icon
            family="Ionicons"
            name={liked ? "heart" : "heart-outline"}
            size={22}
            style={styles.icon}
          />
          <Text style={styles.stats}>
            137k
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => comment("")}>
          <Icon family="Ionicons" name="chatbox-outline" darkColor={"white"} size={22} style={styles.icon} />
          <Text style={styles.stats}>
            4.8k
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => toggleSave("")}>
          <Svg width={24} height={24} viewBox="0 0 135 135" fill="none">
            {saved
              ? <Path
                  d="M5.625 67.5C5.625 33.3281 33.3281 5.625 67.5 5.625C101.672 5.625 129.375 33.3281 129.375 67.5C129.375 101.672 101.672 129.375 67.5 129.375C33.3281 129.375 5.625 101.672 5.625 67.5ZM97.8638 54.1125C98.8631 53.0468 99.4086 51.6342 99.3848 50.1735C99.3611 48.7128 98.77 47.3186 97.7367 46.2859C96.7033 45.2533 95.3087 44.6632 93.8479 44.6405C92.3872 44.6178 90.975 45.1643 89.91 46.1644L56.0981 79.9706L45.4444 69.3225C44.3835 68.2979 42.9626 67.7309 41.4877 67.7437C40.0129 67.7565 38.6021 68.3481 37.5591 69.391C36.5162 70.4339 35.9247 71.8448 35.9118 73.3196C35.899 74.7945 36.466 76.2154 37.4906 77.2763L56.0981 95.8838L97.8638 54.1181V54.1125Z"
                  fill="#1ABC54"
                />
              : <>
                  <Path
                    d="M67.4941 16.875C60.846 16.875 54.2629 18.1845 48.1208 20.7286C41.9787 23.2727 36.3978 27.0018 31.6969 31.7027C26.9959 36.4037 23.2669 41.9845 20.7227 48.1267C18.1786 54.2688 16.8691 60.8518 16.8691 67.5C16.8691 74.1482 18.1786 80.7312 20.7227 86.8734C23.2669 93.0155 26.9959 98.5963 31.6969 103.297C36.3978 107.998 41.9787 111.727 48.1208 114.271C54.2629 116.816 60.846 118.125 67.4941 118.125C80.9207 118.125 93.7974 112.791 103.291 103.297C112.785 93.8032 118.119 80.9266 118.119 67.5C118.119 54.0734 112.785 41.1967 103.291 31.7027C93.7974 22.2087 80.9207 16.875 67.4941 16.875ZM5.61914 67.5C5.61914 33.3281 33.3223 5.625 67.4941 5.625C101.666 5.625 129.369 33.3281 129.369 67.5C129.369 101.672 101.666 129.375 67.4941 129.375C33.3223 129.375 5.61914 101.672 5.61914 67.5Z"
                    fill="white"
                  />
                  <Path
                    d="M101.244 67.5C101.244 68.9918 100.651 70.4226 99.5966 71.4775C98.5417 72.5324 97.111 73.125 95.6191 73.125H73.1191V95.625C73.1191 97.1168 72.5265 98.5476 71.4716 99.6025C70.4167 100.657 68.986 101.25 67.4941 101.25C66.0023 101.25 64.5715 100.657 63.5167 99.6025C62.4618 98.5476 61.8691 97.1168 61.8691 95.625V73.125H39.3691C37.8773 73.125 36.4466 72.5324 35.3917 71.4775C34.3368 70.4226 33.7441 68.9918 33.7441 67.5C33.7441 66.0082 34.3368 64.5774 35.3917 63.5225C36.4466 62.4676 37.8773 61.875 39.3691 61.875H61.8691V39.375C61.8691 37.8832 62.4618 36.4524 63.5167 35.3975C64.5715 34.3426 66.0023 33.75 67.4941 33.75C68.986 33.75 70.4167 34.3426 71.4716 35.3975C72.5265 36.4524 73.1191 37.8832 73.1191 39.375V61.875H95.6191C97.111 61.875 98.5417 62.4676 99.5966 63.5225C100.651 64.5774 101.244 66.0082 101.244 67.5Z"
                    fill="white"
                  />
                </>
            } 
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, { paddingLeft: 8, marginTop: 6 }]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            {card.nickname}
          </Text>
        </TouchableOpacity>
        <Text style={styles.caption}>
          This would be the caption of the post.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 10,
    marginRight: 10
  },
  caption: {
    fontSize: 14,
    marginLeft: 6,
  },
  card: {
    gap: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 10
  },
  container: {
    flex: 1,
    marginVertical: 12,
    borderTopWidth: 1,
    borderColor: '#444444',
    paddingTop: 6,
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 6,
    fontWeight: 'bold'
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pair: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    width: 42,
    height: 42,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'grey'
  },
  row: {
    flexDirection: 'row',
  },
  stats: {
    fontSize: 14,
  }
});
