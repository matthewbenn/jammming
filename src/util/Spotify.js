//var request = require('request');
var cors = require('cors');
//var querystring = require('querystring');
//var cookieParser = require('cookie-parser');
//let usersAccessToken = await getAccessToken();

const authorizeUrl = `https://accounts.spotify.com/authorize?`;
const responseUrl = window.location.href
const expires_in = '';
const endpoint = `${authorizeUrl}&${client_id}&${response_type}&${redirect_uri}&${state}&${scope}`

// Data to be sent
const client_id = 'dd31a42fc3154ed88c65c8a2c3a87c0c';
const response_type = 'token';
const redirect_uri = 'http://localhost:3000/';
// Optional - state used for storing cookie
const state = '';
const scope = 'user-read-private user-read-email';


// Returned data
let access_token = '';
const token_type = '';





const Spotify = {

async getAccessToken() {
fetch(endpoint)
  if (access_token) {
    return access_token;
  } else if (responseUrl.match(/access_token=([^&]*)/) &&
             reponseUrl.match(/expires_in=([^&]*)/)) {
    access_token = responseUrl.match(/access_token=([^&]*)/);
    expires_in = reponseUrl.match(/expires_in=([^&]*)/);
    return access_token;
    return expires_in;
  } else {
    return console.log('Request Failed');
  }
    // pull it from the URL
    // if is in URL
      // userAccessToken = {urlValue}
      // return userAccessToken;
    // else if NOT in URL
      // redirect the user to the spotify URL
  }
  //   if (userAccessToken) {
  //     return userAccessToken
  //   } else {
  //     fetch(authorizeUrl).then(
  //       response => {
  //         if (response.ok) {
  //           return response.json();
  //         } throw new Error ('Request Failed!')
  //       },
  //       networkError => {
  //         console.log(networkError.message)
  //       }
  //     )
  //     .then(jsonResponse => {
  //       renderResponse(jsonResponse);
  //     })
  //   }
  // }

};

export default Spotify;


// do you have access token? (check) if not?
//  get it. if not?
//  the do this,
