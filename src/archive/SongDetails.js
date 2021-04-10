import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getSongQuery } from "../queries";

class SongDetails extends Component {
  render() {
    const { song } = this.props.data;

    if (song) {
      console.log(song.artist.songs);
      return (
        <div>
          <h4>Song details</h4>
          <p>{song.title}</p>
          <p>{song.date}</p>
          <p>{song.artist.name}</p>
          <p>All songs by this artist</p>
          <ul>
            {song.artist.songs.map((song) => (
              <li key={song.id + song.title}>{song.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No song selected</p>;
    }
  }
}
export default graphql(getSongQuery, {
  options: (props) => {
    return { variables: { id: props.songId } };
  },
})(SongDetails);
