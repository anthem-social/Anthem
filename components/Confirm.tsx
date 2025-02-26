import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text } from "./Themed";

type Props = {
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function Confirm(props: Props) {
  const {
    title = "Are you sure?",
    message = "This action cannot be undone.",
    cancelText = "Cancel",
    confirmText = "Confirm"
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={props.onCancel}
    >
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.row}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.row}>
              <Text>{message}</Text>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
              <Button color="red" title={cancelText} onPress={props.onCancel} />
              </View>
              <View style={{ flex: 1 }}>
                <Button color="" title={confirmText} onPress={props.onConfirm} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: "90%",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 8
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  row: {
    flexDirection: "row",
    marginTop: 8
  },
  title: {
    fontSize: 18
  }
});
