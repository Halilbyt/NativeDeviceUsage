import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ route }) {
  const isFucused = useIsFocused();
  const [loadedPlaces, setLoadPlaces] = useState([]);

  useEffect(() => {
    if (isFucused && route.params) {
      setLoadPlaces((prev) => [...prev, route.params.place]);
    }
  }, [isFucused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
