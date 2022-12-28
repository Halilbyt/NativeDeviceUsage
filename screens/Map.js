import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useCallback } from "react";
import IconButton from "../components/Interface/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState([]);

  const region = {
    latitude: 39.9441,
    longitude: 44.1036,
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
      {selectedLocation &&
        selectedLocation.map((loc, index) => {
          return (
            <Marker key={index} coordinate={loc} title="Picked Location" />
          );
        })}
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
