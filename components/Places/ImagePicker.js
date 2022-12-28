import { View, Image, StyleSheet, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import OutlineButton from "../Interface/OutlineButton";
import { Colors } from "../../constants/colors";

function ImagePicker({ onImageTaken }) {
  const [picedImage, setPickedImage] = useState();

  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();

  // gettin the permission to use camera for IOS
  async function verifyPermission() {
    if (cameraPermissionInfo === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo === PermissionStatus.DENIED) {
      Alert.alert(
        "Unsufficient Permissin",
        "You need to grand camera permission to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text style={styles.text}>No Image Taken Yet!</Text>;

  if (picedImage) {
    imagePreview = (
      <Image source={{ uri: picedImage }} style={styles.imageContainer} />
    );
    onImageTaken(picedImage);
  }

  return (
    <View>
      <View style={styles.imagePrev}>{imagePreview}</View>
      <View style={{ marginBottom: 12 }}>
        <OutlineButton icon="camera" onPress={takeImageHandler}>
          Take Image
        </OutlineButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePrev: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a3f1f1",
    borderRadius: 12,
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    resizeMode: "stretch",
    borderRadius: 5,
    padding: 12,
    marginVertical: 10,

    marginVertical: 8,
  },
  text: {
    padding: 24,
    margin: 4,
    color: Colors.primary500,
    fontSize: 24,
    textAlign: "center",
  },
});
