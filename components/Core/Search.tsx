import { FlatList, Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Icon, View } from "../Themed";
import { useEffect, useRef, useState } from "react";
import { Track } from "@/types";
import { TrackResult } from "../Search/TrackResult";

type Props<T> = {
  backgroundColor?: string;
  placeholder: string;
  searchHandler: (query: string) => Promise<Array<T>>;
  selectionHandler: (item: T) => void;
}

export function Search<T>({backgroundColor, placeholder, searchHandler, selectionHandler}: Props<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<T>>([]);
  const textInputRef = useRef<TextInput>(null);

  const handleSearch = async () => {
    var response = await searchHandler(query) as Array<T>;
    setResults(response);
  }
  
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, backgroundColor ? { backgroundColor: backgroundColor } : {}]}>
        <View style={styles.bar}>
          <Icon family="Ionicons" name="search" size={22} />
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder={placeholder}
            onChangeText={query => setQuery(query)}
            blurOnSubmit
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={results}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectionHandler(item)}>
              <View style={styles.row}>
                <TrackResult {...item as Track}/>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  )
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
