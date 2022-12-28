import { Alert, StyleSheet, View, Text } from "react-native";
import OutlineButton from "../Interface/OutlineButton";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute, useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";

function LocationPicker({ onLocationPicked }) {
  const [pickedLocation, setPickedLocation] = useState({});
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation();
  const route = useRoute();

  // getting the picked location arr
  const pickedLocations = route.params ? route.params.pickedLocation : null;

  // for the permission
  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location permission to use this application"
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = verifyPermissions();

    if (!hasPermission) {
      return;
    }
    // getting current location that required some permission
    const currentLocation = await getCurrentPositionAsync();
    setPickedLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  useEffect(() => {
    if (pickedLocations !== null) {
      async function getAdress() {
        const adress = await Location.reverseGeocodeAsync(pickedLocations[0]);
        onLocationPicked({ adress: adress, location: pickedLocations[0] });
      }
      getAdress();
    }
  }, [pickedLocations, onLocationPicked]);

  let locationPreview = <Text>No location picked yet!</Text>;

  if (pickedLocations !== null) {
    locationPreview = (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapPrevImage}
        region={{
          latitude: pickedLocation.latitude,
          longitude: pickedLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          key={1337}
          coordinate={pickedLocation}
          title={"home"}
          description="Doğduğum şehir"
          icon={<FontAwesome5 name="map-marker-alt" size={24} color="Red" />}
        />
      </MapView>
    );
  }

  if (pickedLocations !== null) {
    locationPreview = (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapPrevImage}
        region={{
          latitude: pickedLocations[0].latitude,
          longitude: pickedLocations[0].longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          key={1337}
          coordinate={pickedLocations[0]}
          title={"Picked Location"}
          description="This is the place i choose "
          icon={<FontAwesome5 name="map-marker-alt" size={24} color="Red" />}
        />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPrev}>{locationPreview}</View>
      <View style={styles.action}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPrev: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a3f1f1",
    borderRadius: 5,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mapPrevImage: {
    width: "100%",
    height: 200,
  },
});
