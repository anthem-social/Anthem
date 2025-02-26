import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { Button, Text, View } from "@/components/Themed";
import { useState } from "react";
import DropDownPicker, { ThemeNameType } from 'react-native-dropdown-picker';
import TrackPostCreate from "@/components/Posts/TrackPostCreate";
import { useThemeColor } from "@/hooks/useThemeColor";
import { create } from "@/api/posts";
import { ContentType } from "@/types";
import { Confirm } from "@/components";

export default function Create() {
  const theme = useThemeColor({ light: "LIGHT", dark: "DARK" }, "text");
  const pickerColor = useThemeColor({ light: "black", dark: "white" }, "background");
  const pickerBgColor = useThemeColor({ light: "grey", dark: "#444444" }, "background");
  const [caption, setCaption] = useState("");
  const [clearCount, setClearCount] = useState(0);
  const [confirmHandler, setConfirmHandler] = useState<() => void>(() => () => {});
  const [content, setContent] = useState<object>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [type, setType] = useState<ContentType>(ContentType.Track);
  const [types, setTypes] = useState([
    {label: 'Song', value: ContentType.Track},
    {label: 'Top 5', value: ContentType.TopFive}
  ]);

  const confirm = (handler: () => void) => {
    setConfirmHandler(() => handler);
    setOpenConfirm(true);
  }

  const clearPost = () => {
    setCaption("");
    setClearCount(count => count + 1);
    setContent(undefined);
  }

  const createPost = async () => {
    try {
      setLoading(true);
      var result = await create(caption, JSON.stringify(content), ContentType.Track);

      if (result.IsFailure) {
        console.error(result.ErrorMessage);
      }

      clearPost();
      setLoading(false);
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
          {type === ContentType.Track && <TrackPostCreate clearCount={clearCount} contentSetter={setContent} />}
          {/* {type === ContentType.TopFive && <TopFivePostCreate />} */}
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
          <Button title="Clear" color="red" onPress={() => confirm(clearPost)} />
          <Button title="Create" color="" onPress={() => confirm(createPost)} />
        </View>
        {openConfirm &&
          <Confirm
            onCancel={() => {
              setOpenConfirm(false)
            }}
            onConfirm={() => {
              confirmHandler();
              setOpenConfirm(false);
            }}
          /> 
        }
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
    gap: 24,
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
