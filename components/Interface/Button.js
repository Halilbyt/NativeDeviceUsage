import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.primary300 }}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary500,
    elevation: 3,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary400,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    padding: 6,
    color: Colors.primary300,
    fontWeight: "bold",
  },
});
