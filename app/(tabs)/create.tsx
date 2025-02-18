import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { Button, Text, View } from "@/components/Themed";
import { useState } from "react";
import DropDownPicker, { ThemeNameType } from 'react-native-dropdown-picker';
import TrackPostCreate from "@/components/Posts/TrackPostCreate";
import { useThemeColor } from "@/hooks/useThemeColor";
import { create } from "@/api/post";
import { ContentType } from "@/types";

export default function Create() {
  const theme = useThemeColor({ light: "LIGHT", dark: "DARK" }, "text");
  const pickerColor = useThemeColor({ light: "black", dark: "white" }, "background");
  const pickerBgColor = useThemeColor({ light: "grey", dark: "#444444" }, "background");
  const [caption, setCaption] = useState("");
  const [clearCount, setClearCount] = useState(0);
  const [content, setContent] = useState<object>();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [type, setType] = useState<ContentType>(ContentType.Track);
  const [types, setTypes] = useState([
    {label: 'Song', value: ContentType.Track},
    {label: 'Top 5', value: ContentType.TopFive}
  ]);

  const handleClear = () => {
    setCaption("");
    setClearCount(count => count + 1);
    setContent(undefined);
  }

  const handleCreate = async () => {
    try {
      var result = await create(caption, JSON.stringify(content), ContentType.Track);

      if (result.IsFailure) {
        console.error(result.ErrorMessage);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Create a Post</Text>
        </View>
        <DropDownPicker
          open={openDropdown}
          value={type}
          items={types}
          setOpen={setOpenDropdown}
          setValue={setType}
          setItems={setTypes}
          style={{
            backgroundColor: pickerBgColor
          }}
          textStyle={{
            fontSize: 18,
            color: pickerColor,
          }}
          listItemContainerStyle={{
            backgroundColor: pickerBgColor
          }}
          dropDownContainerStyle={{
            backgroundColor: pickerBgColor
          }}
          theme={theme as ThemeNameType}
        />
        <View style={styles.row}>
          {type === "track" && <TrackPostCreate clearCount={clearCount} contentSetter={setContent} />}
          {/* {type === "top5" && <Top5PostCreate />} */}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a caption..."
          onChangeText={caption => setCaption(caption)}
          blurOnSubmit
          multiline
          value={caption}
        />
        <View style={styles.buttonsRow}>
          <Button title="Clear" color="red" onPress={handleClear} />
          <Button title="Create" color="" onPress={handleCreate} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    marginTop: "auto",
    marginBottom: 8
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 40,
    gap: 20,
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16
  },
  picker: {
    fontSize: 18
  },
  row: {
    flexDirection: "row"
  },
  textInput: {
    padding: 8,
    fontSize: 14,
    color: "white",
    height: 100
  },
  title: {
    fontSize: 20
  }
});
