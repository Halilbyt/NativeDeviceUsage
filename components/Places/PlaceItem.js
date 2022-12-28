import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function PlaceItem({ place, onPress }) {
  return (
    <Pressable
      style={styles.containerOuter}
      android_ripple={{ color: Colors.primary100 }}
      onPress={onPress}
    >
      <View style={styles.containerInner}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: place.imageUri }} />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              { fontSize: 20, fontWeight: "bold", color: Colors.warning },
            ]}
          >
            {place.title}
          </Text>
          <Text style={styles.text}>{place.address}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default PlaceItem;

const styles = StyleSheet.create({
  containerOuter: {
    elevation: 3,
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    borderRadius: 8,
    backgroundColor: Colors.primary400,
    margin: 12,
    padding: 12,
  },
  containerInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
  },
  text: {
    fontSize: 18,
    color: Colors.primary100,
    marginHorizontal: 12,
  },
  imgContainer: {
    height: 100,
    flex: 1,
  },
  textContainer: {
    padding: 6,
    flex: 2,
    height: "100%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: "stretch",
  },
  pressed: {
    opacity: 0.7,
  },
});
