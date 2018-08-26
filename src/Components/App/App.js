// Need to remove empty string songs

import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
// searchResults should be an Array of Objects
      searchResults: [],
/*        {
          id:'',
          album:'',
          artist:'',
          name:''
        }
  */
        playlistName:'New Playlist',
        // playlistTracks should be an Array of Objects
        playlistTracks: []
/*          {
            name:'',
            artist:'',
            album:'',
            id:''
          }

*/      };
    }

// Checks to see if track already exists in playlistTracks, then adds if not.
  addTrack(track) {
    if (this.state.playlistTracks.find(trackSave =>
    trackSave.id === track.id)) {
      return;
    } else {
      let newList = this.state.playlistTracks.slice();
      newList.push(track);
      this.setState({playlistTracks : newList});
  }
}

// When a track is clicked to remove this function makes sure it is in the playlistTracks before updating the state
  removeTrack(track) {
    if (!this.state.playlistTracks.find(trackRemove =>
    trackRemove.id === track.id)) {
      return;
    } else {
      let newList = this.state.playlistTracks.filter(trackRemove =>
      trackRemove.id != track.id);
    //  newList.pop(track.id);
      this.setState({playlistTracks : newList});
}
}

//  This updates the state with input from the playlist field
  updatePlaylistName(name) {
    this.setState({playlistName: name});
    console.log(this.state.playlistName);/* FOR TESTING- REMOVE*/
  }

// This needs to be reworked and confirmed, suspect its garbage ;)
  savePlaylist(playlistName, trackURIs) {
    console.log(this);
    Spotify.savePlaylist(playlistName, trackURIs)
  }

  search (term) {
  Spotify.search(term).then(searchResults => {
  this.setState({searchResults: searchResults});
});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing!</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
