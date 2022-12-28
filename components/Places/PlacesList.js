import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          There is no place added yet. Let start to add some place there!
        </Text>
      </View>
    );
  }

  function placeItemRenderHandler(itemData) {
    return <PlaceItem place={itemData.item} />;
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={placeItemRenderHandler}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItem: "cneter",
  },
  text: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
});
