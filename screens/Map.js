import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useCallback } from "react";
import IconButton from "../components/Interface/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params
    ? {
        lat: route.params.lat,
        long: route.params.long,
      }
    : null;

  const initTitle = route.params ? route.params.title : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 39.9441,
    longitude: initialLocation ? initialLocation.long : 44.1036,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectedLocationHandler(event) {
    // console.log(event.nativeEvent);
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setSelectedLocation((prevLocation) => [
      ...prevLocation,
      { latitude: lat, longitude: long },
    ]);
  }

  const savePickedLocationHandler = useCallback(() => {
    if (selectedLocation.length === 0) {
      Alert.alert(
        "No Location Picked",
        "You have to pick a location (by tapping on the map) first"
      );
      return;
    }
    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      onPress={selectedLocationHandler}
      initialRegion={region}
    >
      {selectedLocation && (
        <Marker
          key={Math.random() * 12}
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
          title={initTitle !== null ? initTitle : "Favorite Place"}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 700,
  },
  map: {
    flex: 1,
  },
});
