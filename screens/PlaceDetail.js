import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import OutlineButton from "../components/Interface/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetail({ route, navigation }) {
  const [placeDetails, setPlaceDetails] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      lat: placeDetails.lat,
      long: placeDetails.long,
      title: placeDetails.title,
    });
  }

  const selectedId = route.params.placeId;
  // we need get data id for select data accordingly to it and get the place on the screen
  useEffect(() => {
    async function loadPlaceDetail() {
      const placeDetail = await fetchPlaceDetails(selectedId);

      setPlaceDetails(placeDetail);
      navigation.setOptions({
        title: placeDetail.title,
      });
    }
    loadPlaceDetail();
  }, [selectedId]);
  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{ uri: placeDetails && placeDetails.imageUri }}
        />
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.adressContainer}>
          <Text style={styles.adress}>
            {placeDetails && placeDetails.adress}
          </Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          Show on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 24,
    width: "100%",
    height: 300,
  },
  img: {
    height: "100%",
    minWidth: 300,
    width: "100%",
    borderRadius: 12,
  },
  locationContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  adressContainer: {
    padding: 20,
  },
  adress: {
    color: Colors.primary200,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
