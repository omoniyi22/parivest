const haversine = require("haversine-distance");
// Javascript program for the haversine formula
module.exports = (cabs, latitude, longitude) => {
  let a;
  let distance;
  let b = [latitude, longitude];

  let nearbyCabs = [];

  for (let cab of cabs) {
    a = [cab.location.latitude, cab.location.longitude];
    distance = haversine(a, b) / 1000;

    // distance between latitudes
    // and longitudes that are
    // in range of 4km

    if (distance <= 4) {
      nearbyCabs.push(cab);
    }
  }
  nearbyCabs = nearbyCabs.map((data) => ({
    name: data.name,
    car_number: data.car_number,
    phone_number: data.phone_number,
  }));
  return nearbyCabs.length > 0 && nearbyCabs;
};
