import { useEffect, useRef, useState } from "react";
import { Button, Icon, View } from "./Themed";
import { Dimensions, FlatList, Keyboard, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Album, Artist, Track } from "@/types";
import { TrackResult } from "@/components/Search"
import { Loading } from "@/components/Loading";

type Props<T> = {
  buttonText: string;
  placeholderText: string;
  resultType: "AlbumResult" | "ArtistResult" | "TrackResult" | "UserResult";
  searchHandler: (query: string) => Promise<Array<T>>;
  selectionHandler: (item: T) => void;
}

export function SelectFromSearch<T extends Album | Artist | Track>(props: Props<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Array<T>>([]);
  const textInputRef = useRef<TextInput>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const search = async () => {
    console.log("searching for", query);
    setLoading(true);
    var response = await props.searchHandler(query) as Array<T>;
    setLoading(false);
    setResults(response);
  }

  const select = (item: T) => {
    props.selectionHandler(item);
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      textInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      if (query !== "") {
        await search();
      }
      else {
        setLoading(false);
        setResults([]);
      }
    }, 300);
  }, [query]);

  return (
    <>
    {open ? (
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                  <View style={styles.bar}>
                    <Icon family="Ionicons" name="search" size={22} />
                    <TextInput
                      ref={textInputRef}
                      style={styles.textInput}
                      placeholder={props.placeholderText}
                      onChangeText={query => setQuery(query)}
                      blurOnSubmit
                      returnKeyType="search"
                      onSubmitEditing={search}
                    />
                  </View>
                  {loading ? (
                    <Loading />
                  ) : (
                    <FlatList
                      style={{ flex: 1 }}
                      data={results}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => select(item)}>
                          <View style={styles.row}>
                            {/* {props.resultType === "ArtistResult" && <ArtistResult {...item as Artist} />} */}
                            {props.resultType === "TrackResult" && <TrackResult {...item as Track} />}
                            {/* {props.resultType === "UserResult" && <UserResult {...item as User} />} */}
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    ) : (
      <Button title={props.buttonText} onPress={() => setOpen(true)} color="" />
    )}
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderRadius: 18,
    padding: 4,
    alignItems: "center",
    paddingStart: 8,
    marginBottom: 14
  },
  container: {
    paddingTop: 14,
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "black"
  },
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
  },
  row: {
    marginBottom: 4
  },
  textInput: {
    padding: 8,
    fontSize: 14,
    color: "white",
    flexGrow: 1
  }
});
