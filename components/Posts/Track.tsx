import { Text, View } from "@/components/Themed";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Track as TrackType } from "@/types";
import { ScrollingTrack } from "../Core";

type Props = {
    track: TrackType;
}

export function Track({ track }: Props) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: track.album.coverUrl }} style={styles.cover} />
            <View>
                <ScrollingTrack {...track} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    cover: {
        width: '100%',
        aspectRatio: 1
    }
});
