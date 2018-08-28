const authorizeUrl = `https://accounts.spotify.com/authorize?`;
const responseUrl = window.location.href

// Data to be sent
const client_id = 'dd31a42fc3154ed88c65c8a2c3a87c0c';
const response_type = 'token';
const redirect_uri = 'http://localhost:3000/';
// Optional - state used for storing cookie
let state = '';
const scope = 'user-read-private user-read-email, playlist-modify-private, playlist-modify-public';
// playlist-modify-public was required to successfully create playlist
let term;

// Returned data
let access_token = '';
let token_type = '';
let expires_in = '';


const Spotify = {

  getAccessToken() {
  if (access_token) {
    return access_token;
  } else if (responseUrl.match(/access_token=([^&]*)/) &&
             responseUrl.match(/expires_in=([^&]*)/) &&
             responseUrl.match(/token_type=([^&]*)/)) {
    let access_token_array = responseUrl.match(/access_token=([^&]*)/);
    let expires_in_array = responseUrl.match(/expires_in=([^&]*)/);

  //  console.log(access_token_array, expires_in);
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
        }
        return searchJsonResponse.tracks.items.map(track => ({
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


    savePlaylist(playlistName, trackURIs) {
      console.log(playlistName, trackURIs)
      if (!playlistName || !trackURIs) return;
      const accessToken = this.getAccessToken();
//    const getUserEndpoint = ;
//    const playlistEndpoint = ;
      const authHeader = {Authorization: `Bearer ${accessToken}`, 'Content-Type': `application/json` };
      const createPlaylistHeader = {
          headers: authHeader,
          method: `Post`,
          body: JSON.stringify({name: playlistName})
      };
      const popPlaylistHeader = {
        headers: authHeader,
        method: `Post`,
        body: JSON.stringify({uris: trackURIs})
      }

      let user_id,playlist_id;

    return fetch(`https://api.spotify.com/v1/me`, {headers: authHeader}
        ).then(response => {
          if (response.ok) {
            return response.json();
            } throw new Error ('Request failed!');
          }, networkError => {
            console.log(networkError.message);
          }).then(userIdJsonResponse => {
           if (userIdJsonResponse.id)
              console.log(`response.id is ${userIdJsonResponse.id}`)
              user_id = userIdJsonResponse.id;
              console.log(`userID is ${user_id}`);

            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, createPlaylistHeader
                ).then(response => {
                  if (response.ok) {
                    return response.json();
                  } throw new Error ('Request failed!');
                }, networkError => {
                  console.log(networkError.message);
                }).then(playlistIdJsonResponse => {
                  if (playlistIdJsonResponse.id)
                    playlist_id = playlistIdJsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, popPlaylistHeader)
                })
          })


    }

};
export default Spotify;
