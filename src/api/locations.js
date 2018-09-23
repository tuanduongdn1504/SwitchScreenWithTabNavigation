import { get } from './utils';

export const getNearbyLocation = (latitude, longitude) => {
  return fetch({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken&location=${latitude},${longitude}&rankby=distance&key=AIzaSyB7CHUBsexTJWKPVXIP2dIRd0J9J-voqjM`,
    // url: 'https://maps.googleapis.com/maps/api/place/radarsearch/json?rankby=distance&location='+latitude+','+longitude+'&radius=5000&type=service&key='+config.GOOGLE_PLACE_KEY,
  });
};

export const getGeocode = address => {
  return fetch({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB7CHUBsexTJWKPVXIP2dIRd0J9J-voqjM`,
    // url: 'https://maps.googleapis.com/maps/api/place/radarsearch/json?rankby=distance&location='+latitude+','+longitude+'&radius=5000&type=service&key='+config.GOOGLE_PLACE_KEY,
  });
};

export const getPlace = key => {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${key}&types=(cities)&key=AIzaSyB7CHUBsexTJWKPVXIP2dIRd0J9J-voqjM`,
  ).then(response => response.json());
};

export const getDriveTime = (currentLocation, result) => {
  const url = `http://maps.googleapis.com/maps/api/distancematrix/json?origins=${
    currentLocation.latitude
  },${currentLocation.longitude}&destinations=${result.latitude},${
    result.longitude
  }&sensor=false&mode=driving`;

  return fetch({ method: 'GET', url }).then(response => response.json());
};

export const getArea = (lat, lng) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB48RdllyO6vp-IwFx-L9mGDAkCRZZy1Nc`,
    // url: 'https://maps.googleapis.com/maps/api/place/radarsearch/json?rankby=distance&location='+latitude+','+longitude+'&radius=5000&type=service&key='+config.GOOGLE_PLACE_KEY,
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('err', err);
    });
};
