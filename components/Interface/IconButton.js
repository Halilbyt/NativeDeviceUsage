import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function IconButton({ color, size, icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 22,
  },
  pressed: {
    opacity: 0.7,
  },
});
