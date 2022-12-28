class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat:'',long:''}
    this.id =
      new Date().toString() + Math.round(Math.random() * 10 + 1).toString();
  }
}

export default Place;
