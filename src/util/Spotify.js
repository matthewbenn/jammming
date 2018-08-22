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
let user_id='';
//can these also be represented with out the empty string? "let user_id;"



const Spotify = {

  getAccessToken() {
  if (access_token) {
    return access_token;
  } else if (responseUrl.match(/access_token=([^&]*)/) &&
             responseUrl.match(/expires_in=([^&]*)/) &&
             responseUrl.match(/token_type=([^&]*)/)) {
    let access_token_array = responseUrl.match(/access_token=([^&]*)/);
    let expires_in_array = responseUrl.match(/expires_in=([^&]*)/);

  // NEW - checking for valid expires_in in return data -REMOVE
    console.log(access_token_array, expires_in);
    access_token = access_token_array[1];
    const expiresIn = Number(expires_in_array[1]);

    window.setTimeout(() => access_token = '', expires_in * 1000);
    window.history.pushState('Access Token', null, '/');

    return access_token;
  } else {
    const endpoint = `${authorizeUrl}client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
    window.location = endpoint;
  }
},

  search(term) {
    const accessToken = this.getAccessToken();
    const getTrackEndpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const header = { headers: { Authorization: `Bearer ${accessToken}` } };

    return fetch(getTrackEndpoint, header
      ).then(response => {
        if (response.ok) {
          return response.json();
        } throw new Error ('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(searchJsonResponse => {
        if (!searchJsonResponse.tracks) {
          return [];
        } return searchJsonResponse.tracks.items.map(track => ({
//how are these getting stored exactly? in searchResults?
                        id: track.id,
                        album: track.album.name,
                        artist: track.artists[0].name,
                        name:track.name,
                        uri: track.uri

          }));
        }
      )
    },

    savePlaylist(playlistName, trackURI) {
      const accessToken = this.getAccessToken();
      const getUserEndpoint = `https://api.spotify.com/v1/me`;
      const playlistEndpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;
      const authHeader = { Authorization: `Bearer ${accessToken}`};
      let playlist_id,user_id;
      const createPlaylistHeader = {
          headers: authHeader,
          method: `Post`,
          body: JSON.stringify(name: playlistName),
          Content-Type: `application/json`
          //BUILDING HERE
          };

      return fetch(getUserEndpoint, {headers: authHeader}
        ).then(response => {
          if (response.ok) {
            return response.json();
          } throw new Error ('Request failed!');
        }, networkError => {
          console.log(networkError.message);
        }).then(userIdJsonResponse => {
          if (!userIdJsonResponse.id) {
            return;
          } user_id = userIdJsonResponse.id;//suspect this is incorrect
        })

      return fetch(playlistEndpoint,createPlaylistHeader
      ).then(response => {
        if (response.ok) {
          return response.json();
        } throw new Error ('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(playlistIdJsonResponse => {
        if (!playlistIdJsonResponse.id) {
          return;
        } playlist_id = playlistIdJsonResponse.id;//suspect this is incorrect
      })

      return fetch()




    }

};
export default Spotify;
