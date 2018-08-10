import React from 'react';
import './Track.css';
import Playlist from '../Playlist/Playlist'

class Track extends React.Component {
constructor(props) {
  super(props);

  this.renderAction = this.renderAction.bind(this);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
}

renderAction() {
  if (this.props.isRemoval) {
    return <a className="Track-action"onClick={this.removeTrack()}>-</a>
  } else {
    return <a className="Track-action" onClick={this.addTrack()}>+</a>
  }
}

addTrack(track) {
  return <Playlist onAdd={this.props.track} />
}

removeTrack() {
// Needs functionality
  return <Playlist onRemove={this.props.track} />
}

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    );
  }
};

export default Track;
