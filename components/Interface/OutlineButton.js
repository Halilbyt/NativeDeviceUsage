import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

function OutlineButton({ onPress, children, icon }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.primary100}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 4,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.primary400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 7,
  },
  text: {
    color: Colors.primary400,
    fontSize: 16,
  },
});
