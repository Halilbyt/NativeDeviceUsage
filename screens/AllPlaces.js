import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces() {
  const isFucused = useIsFocused();
  const [loadedPlaces, setLoadPlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadPlaces(places);
    }

    if (isFucused) {
      loadPlaces();
    }
  }, [isFucused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
