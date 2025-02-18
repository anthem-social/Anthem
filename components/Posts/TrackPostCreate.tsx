import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, View } from "../Themed";
import { useEffect, useState } from "react";
import { Search } from "../Core/Search";
import { searchTracks } from "@/api/search";
import { Track } from "@/types";
import { TrackResult } from "../Search/TrackResult";

type Props = {
  clearCount: number;
  contentSetter: (content: object) => void;
}

export default function TrackPostCreate({ clearCount, contentSetter }: Props) {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [track, setTrack] = useState<Track>();

  const handleSelection = (track: Track) => {
    setTrack(track);
    setSelected(true);
    setShowModal(false);
    contentSetter(track);
  }

  useEffect(() => {
    console.log("Clearing track post create...");
    setSelected(false);
    setTrack(undefined);
  }, [clearCount]);

  return (
    <View>
      {selected ? (
        <View>
          <TrackResult {...track as Track} />
        </View>
      ) : (
        <Button title="+ Add a Song" color="" onPress={() => setShowModal(true)}/>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modal}>
                <Search
                  backgroundColor="black"
                  placeholder="Search for a song..."
                  searchHandler={searchTracks}
                  selectionHandler={(track) => handleSelection(track)}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: Dimensions.get("window").height * .8,
    elevation: 5,
    backgroundColor: "transparent",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  }
});
