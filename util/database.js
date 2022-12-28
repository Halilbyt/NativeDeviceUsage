import * as SQLite from "expo-sqlite";
import Place from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          adress TEXT NOT NULL,
          lat REAL NOT NULL,
          long REAL NOT NULL
          )`,

        [],
        () => {
          console.log("Table created succesfully! **");
          resolve();
        },
        (_, err) => {
          reject(err);
          console.log("Table could not created! *-*");
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title,imageUri,adress,lat,long) VALUES (?,?,?,?,?)`,
        [place.title, place.imageUri, place.address, place.lat, place.long],
        (_, result) => {
          console.log("Successfuly inserted :)");
          console.log(result);
          resolve(result);
        },
        (_, err) => {
          console.log("inserting error *-*");
          reject(err);
        }
      );
    });
  });

  return promise;
}

// fetching places

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];
          for (const db of result.rows._array) {
            places.push(
              new Place(
                db.title,
                db.imageUri,
                db.adress,
                {
                  latitude: db.lat,
                  longitude: db.long,
                },
                db.id
              )
            );
          }
          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          console.log("Seccess **************");
          resolve(result.rows._array[0]);
        },
        (_, err) => {
          console.log("Error happend *************");
          reject(err);
        }
      );
    });
  });

  return promise;
}
