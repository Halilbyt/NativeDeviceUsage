import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../Interface/Button";
import Place from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [enteredTitle, setEnteredTitle] = useState("");

  function savePlaceHandler() {
    const adress =
      pickedLocation.adress[0].street +
      ", " +
      pickedLocation.adress[0].city +
      ", " +
      pickedLocation.adress[0].region +
      ", " +
      pickedLocation.adress[0].subregion +
      ", " +
      pickedLocation.adress[0].postalCode +
      ", " +
      pickedLocation.adress[0].country;
    const place = new Place(
      enteredTitle,
      selectedImage,
      adress,
      pickedLocation.location
    );
    console.log(place);
    onCreatePlace(place);
  }

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function onImagePickedHandler(pickedImage) {
    setSelectedImage(pickedImage);
  }

  const onLocationPickedHandler = useCallback((pickedLocation) => {
    setPickedLocation(pickedLocation);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={onImagePickedHandler} />
      <LocationPicker onLocationPicked={onLocationPickedHandler} />
      <View style={styles.submit}>
        <Button onPress={savePlaceHandler}>Submit</Button>
      </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBotton: 4,
    color: Colors.primary400,
    marginLeft: 5,
  },
  inputText: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary600,
    backgroundColor: Colors.primary200,
  },
  img: {
    width: "100%",
    height: 600,
    resizeMode: "stretch",
    marginVertical: 20,
    marginBottom: 30,
  },
  submit: {
    marginTop: 60,
  },
});
