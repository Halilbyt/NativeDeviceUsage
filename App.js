import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/Interface/IconButton";
const Stack = createNativeStackNavigator();
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { init } from "./util/database";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import PlaceDetail from "./screens/PlaceDetail";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  // keep the splash screen visible while we fetch resource
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepare() {
      await init()
        .then(() => {
          setDbInitialized(true);
          console.log("initialized is true :)");
        })
        .catch((err) => {
          console.log("Something went wrong (fetch DB partial init)*-*" + err);
        });
    }

    prepare();
  }, []);

  if (dbInitialized) {
    // This tells the splash screen to hide immediately! If we call this after
    // `setAppIsReady`, then we may see a blank screen while the app is
    // loading its initial state and rendering its first pixels. So instead,
    // we hide the splash screen once we know the root view has already
    // performed layout.
    SplashScreen.hideAsync();
  }

  if (!dbInitialized) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SplashScreen Demo! 👋</Text>
        <Entypo name="rocket" size={30} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary400 },
            headerTintColor: Colors.primary100,
            contentStyle: { backgroundColor: Colors.primary500 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={34}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add new place to your favorite list",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetail}
            options={{ title: "Loading Place..." }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
