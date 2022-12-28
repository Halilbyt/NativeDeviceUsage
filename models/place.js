class Place {
  constructor(title, imageUri, address, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = location.latitude;
    this.long = location.longitude; // {lat:'',long:''}
    this.id = id;
  }
}

export default Place;
