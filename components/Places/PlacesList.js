import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";
function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectedPlaceHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }

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
    return <PlaceItem onPress={selectedPlaceHandler} place={itemData.item} />;
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
    textAlign: "center",
    fontSize: 20,
    color: Colors.primary100,
    fontWeight: "bold",
  },
});
