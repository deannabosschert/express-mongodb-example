require('dotenv').config()
const fetch = require("node-fetch") // i've placed those here because of readability
const endpoint = "https://www.flickr.com/services/rest/"
const method = "flickr.photosets.getPhotos"
const api_key = "daae0f655b02ece802021848177b2903"
const user_id = "169241155%40N05"
const format = "format=json&nojsoncallback=1"
const photoset_id = "72157718035090188"
const extras = "extras=license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_l%2C+url_s%2C+url_m%2C+url_t%2C+o_dims"
const apiLink = `${endpoint}?method=${method}&api_key=${api_key}&photoset_id=${photoset_id}&user_id=${user_id}&extras=${extras}&${format}`
console.log(apiLink)

module.exports = function getData() { // get data from flickr endpoint, queries included in .env already
  return fetch(apiLink)
  // return fetch(process.env.API_LINK)
  .then(res => res.json())
}