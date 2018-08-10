import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    this.state = {
// searchResults should be an Array of Objects
      searchResults: [
        {
          id:'',
          album:'',
          artist:'',
          name:''
        }
      ],
        playlistName:'New Playlist',
        // playlistTracks should be an Array of Objects
        playlistTracks: [
          {
            name:'',
            artist:'',
            album:'',
            id:''
          }
        ]

    };
}

  addTrack(track) {
    if (this.state.playlistTracks.find(trackSave =>
    trackSave.id === track.id)) {
      return;
    } else {
      this.state.playlistTracks.push(track.id)
    };
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(trackRemove =>
  trackRemove.id === track.id)) {
  this.state.playlistTracks.pop(track.id);
    };
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing!</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
