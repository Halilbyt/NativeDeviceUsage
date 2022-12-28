const STREET_MAP_API_KEY = "KnNhAXXfrsmY0CzRrZ5S";
function getMapLocation(latitude, longitude, zoomRate) {
  const imgUriMap = `https://api.maptiler.com/maps/hybrid/?key=${STREET_MAP_API_KEY}#${zoomRate}/${latitude}/${longitude}`;
  return imgUriMap;
}

export default getMapLocation;
