import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
// SearchResults should be an Array of Objects
      searchResults: [
        {
          id:'',
          album:'',
          artist:'',
          name:''
        }
      ],

        playlistName:'',
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

    this.addTrack = this.addTrack.bind(this);

}
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
    savedTrack.id === track.id)) {
      return this.state.playlistTracks;
    };
  }

// CURRENT WORK
  removeTrack(track) {
    //this.state.playlistTracks.filter(savedTrack => savedTrack.id === track.id))

    }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing!</h1>
        <div className="App">
        <SearchBar />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
