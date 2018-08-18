//var request = require('request');
//var cors = require('cors');
//var querystring = require('querystring');
//var cookieParser = require('cookie-parser');
//let usersAccessToken = await getAccessToken();

const authorizeUrl = `https://accounts.spotify.com/authorize?`;
const responseUrl = window.location.href

// Data to be sent
const client_id = 'dd31a42fc3154ed88c65c8a2c3a87c0c';
const response_type = 'token';
const redirect_uri = 'http://localhost:3000/';
// Optional - state used for storing cookie
let state = '';
const scope = 'user-read-private user-read-email';
let term;

// Returned data
let access_token = '';
let token_type = '';
let expires_in = '';
let accessToken;



const Spotify = {
  getAccessToken() {
  if (access_token) {
    return access_token;
  } else if (responseUrl.match(/access_token=([^&]*)/) &&
             responseUrl.match(/expires_in=([^&]*)/) &&
             responseUrl.match(/token_type=([^&]*)/)) {
    access_token = responseUrl.match(/access_token=([^&]*)/);
    expires_in = responseUrl.match(/expires_in=([^&]*)/);
    token_type = responseUrl.match(/token_type=([^&]*)/);
    return access_token;
    window.setTimeout(() => access_token = '', expires_in * 1000);
    window.history.pushState('Access Token', null, '/');
  } else {
    const endpoint = `${authorizeUrl}client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
    window.location = endpoint;
  } console.log(access_token);
},

search(term) {
accessToken = this.getAccessToken();
  fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
}).then(response => {
  if (response.ok) {
    return response.json();
  } throw new Error ('Request failed!');
}).then(networkError => {
  console.log(networkError.message);
}).then(jsonResponse => {
  if (jsonResponse.tracks) {
    return jsonResponse.tracks.map(track => {
      return {
                  id: track.id,
                  album: track.album.name,
                  artist: track.artists[0].name,
                  name:track.name,
                  uri: track.uri
                };
              });
            }
          })
       }
     };
export default Spotify;
/* original first-pass code below
search(term) {
  fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
  headers: {Authorization: `Bearer ${access_token}`}
}).then(response => {
  if (response.ok) {
    return response.json().map(searchResults => {
      if (searchResults) {
        return searchResults
        // how many different ways can this be done?
      }
    })
  }
})

}
*/
