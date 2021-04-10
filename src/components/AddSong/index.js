import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import {
  getArtistQuery,
  getSongsQuery,
  addSongMutation,
  addArtistMutation,
} from "../../queries";
import { flowRight as compose } from "lodash";
import { AuthContext } from "../../context/Auth";
import "./AddSong.css";
import Modal from "../Modal";

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: 0,
      artistId: "",
      artistName: "",
      bio: "",
      errors: "",
      addArtistOn: false,
      addArtistboxOpen: false,
    };
    this.updateState = this.updateState.bind(this);
    this.onSongSubmit = this.onSongSubmit.bind(this);
    this.addArtistPanelOn = this.addArtistPanelOn.bind(this);
    this.onArtistSubmit = this.onArtistSubmit.bind(this);
    this.closePopUpError = this.closePopUpError.bind(this);
    this.addArtistPanel = this.addArtistPanel.bind(this);
  }

  addArtistPanelOn = (e) => {
    if (e.target.value === "addArtistOn") {
      this.setState({ addArtistOn: true, addArtistboxOpen: true });
    } else {
      this.setState({ addArtistOn: false });
    }
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value, errors: "" });

    console.log(this.props);
  };
  onSongSubmit = (e) => {
    e.preventDefault();
    let user = this.context.user;
    if (
      !this.state.title ||
      !this.state.artistId ||
      this.state.artistId === "addArtistOn"
    ) {
      this.setState({ errors: "Song title and artist are required" });
      return;
    }
    if (this.props.getSongsQuery) {
      let { getSongsQuery } = this.props;
      //this.setState({ playlist: getSongsQuery.songs });
      if (
        getSongsQuery.songs.some((song) => {
          return (
            song.title === this.state.title &&
            song.userName === user.username &&
            song.artistId === this.state.artistId
          );
        })
      ) {
        this.setState({
          errors: "This song has already been in your playlist",
        });

        return;
      }
    }

    this.props.addSongMutation({
      variables: {
        title: this.state.title,
        date: +this.state.date,
        artistId: this.state.artistId,
      },
      refetchQueries: [{ query: getSongsQuery }],
    });
  };
  closePopUpError = () => {
    this.setState({ errors: "" });
  };
  addArtistPanel = () => {
    this.setState({ addArtistboxOpen: false });
    this.state.closePopUpError();
  };
  onArtistSubmit = (e) => {
    e.preventDefault();
    console.log(this.props);
    if (!this.state.artistName) {
      this.setState({ errors: "Artist name is required" });
      return;
    }
    this.props.addArtistMutation({
      variables: { name: this.state.artistName, bio: this.state.bio },
      refetchQueries: [{ query: getArtistQuery }],
    });
    this.setState({ addArtistboxOpen: false });
  };
  displayArtists() {
    let { getArtistQuery } = this.props;
    if (getArtistQuery.loading) {
      return <option>Loading Artists...</option>;
    } else if (getArtistQuery.artists) {
      return getArtistQuery.artists.map((artist) => (
        <option key={artist.id} value={artist.id}>
          {artist.name}
        </option>
      ));
    }
  }

  render() {
    let user = this.context.user;
    return (
      <div className="add-song-container">
        {user && (
          <form
            className="add-song-panel"
            id="add-song"
            onSubmit={this.onSongSubmit}
          >
            <fieldset>
              <legend>Add song</legend>
              <div>
                <label>Song title: </label>
                <input type="text" id="title" onChange={this.updateState} />
              </div>
              <div>
                <label>Date created: </label>
                <input type="number" id="date" onChange={this.updateState} />
              </div>
              <div>
                <label>Media link </label>
                <input type="text" />
              </div>
              <div>
                <label>Artist: </label>
                <select
                  id="artistId"
                  onClick={this.addArtistPanelOn}
                  onChange={this.updateState}
                >
                  <option value="">Select artist</option>
                  {this.displayArtists()}
                  <option value="addArtistOn">Add artist</option>
                </select>
              </div>

              <button id="sign-button">+</button>
            </fieldset>
          </form>
        )}
        {this.state.errors && (
          <div className="error-popup" onClick={this.closePopUpError}>
            {this.state.errors}
          </div>
        )}

        <Modal isEdit={this.state.addArtistOn && this.state.addArtistboxOpen}>
          <form className="add-song-panel" onSubmit={this.onArtistSubmit}>
            <fieldset>
              <legend>Add artist</legend>
              <div>
                <label>Artist name: </label>
                <input
                  type="text"
                  id="artistName"
                  onChange={this.updateState}
                />
              </div>
              <div>
                <label>Biography: </label>
                <input type="textarea" id="bio" onChange={this.updateState} />
              </div>
              <div></div>
              <button id="sign-button" type="submit">
                +
              </button>
              <button
                id="sign-button"
                onClick={() =>
                  this.setState({ addArtistboxOpen: false, errors: "" })
                }
              >
                x
              </button>
            </fieldset>
          </form>
        </Modal>
      </div>
    );
  }
}
AddSong.contextType = AuthContext;

export default compose(
  graphql(getSongsQuery, { name: "getSongsQuery" }),
  graphql(getArtistQuery, { name: "getArtistQuery" }),
  graphql(addSongMutation, { name: "addSongMutation" }),
  graphql(addArtistMutation, { name: "addArtistMutation" })
)(AddSong);
