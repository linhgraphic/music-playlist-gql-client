import React from "react";
import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  deleteSongQuery,
  getSongsQuery,
  updateSongQuery,
  getSongQuery,
  getUsersQuery,
} from "../../queries";
import "./Playlist.css";
import SongInfo from "../SongInfo";
import EditSongPanel from "../EditSongPanel";
import Modal from "../Modal";
import { AuthContext } from "../../context/Auth";
import IframeModal from "../IframeModal";
import Toolbar from "../Toolbar";
import SongCard from "../SongCard";

const PlayList = () => {
  const [songId, setSongId] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songIdToEdit, setSongIdtoEdit] = useState("");
  const [songDate, setSongDate] = useState("");
  const [isEditOn, setEditOn] = useState(false);
  const [errors, setErrors] = useState("");
  const [onExpand, setOnExpand] = useState(false);
  const [userList, setUserList] = useState([]);
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState("start");
  const [songsByUser, setSongsByUser] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [isOpenLink, setIsOpenLink] = useState(false);
  const { loading, error, data } = useQuery(getSongsQuery);

  const { loading: userLoading, error: UserErr, data: userData } = useQuery(
    getUsersQuery
  );
  const { loading: songLoading, error: SongErr, data: songData } = useQuery(
    getSongQuery,
    {
      variables: { id: songId },
    }
  );
  const [deleteSong] = useMutation(deleteSongQuery);
  const [updateSong] = useMutation(updateSongQuery);

  const onSetUserList = () => {
    const usersListTemp = [];
    const songsByUserTemp = [];
    for (let i in userData.users) {
      usersListTemp.push({
        id: userData.users[i].id,
        username: userData.users[i].username,
      });
      songsByUserTemp[userData.users[i].username] = userData.users[i].songs;
    }
    setUserList(usersListTemp);
    setSongsByUser(songsByUserTemp);
  };

  useEffect(() => {
    async function fetchData() {
      if (userName === "start" || userName === "all") {
        if (data) await setPlaylist(data.songs);
        if (userData) await onSetUserList();
      }
    }
    fetchData();
  }, [userName, data, userData]);

  if (error) {
    return <p>Error loading Songs</p>;
  }
  if (UserErr) return <p>Error loading Users</p>;
  if (loading) return <p>Loading</p>;
  if (userLoading) return <p>Loading users</p>;

  const displayUsers = () =>
    userList.map((user) => (
      <option
        key={user.id}
        id={user.id}
        value={user.name}
        // data-usersongs={user.songsByUser}
      >
        {user.username}
      </option>
    ));

  const displaySongDetails = (e) => {
    if (songId === e.target.dataset.idref) {
      setOnExpand(!onExpand);
    } else if (songId !== e.target.idref) {
      setOnExpand(true);
    }
    setSongId(e.target.dataset.idref);
    if (e.target.dataset.idref !== songIdToEdit) {
      onCancelChange();
    } else {
      setEditOn(true);
    }
  };
  const selectUser = async (e) => {
    setUserName(e.target.value);
    if (e.target.value !== "all") setPlaylist(songsByUser[e.target.value]);
    console.log(songsByUser[e.target.value]);
    // console.log(
    //   typeof e.target.options[e.target.selectedIndex].dataset.usersongs
    // );
  };

  const onDeleteSong = (e) => {
    deleteSong({
      variables: { id: e.target.id },
      refetchQueries: [{ query: getSongsQuery }],
    });
  };
  const onEditSong = (e) => {
    if (songId !== e.target.id) setOnExpand(false);
    setEditOn(true);
    setSongIdtoEdit(e.target.id);
  };
  const onSetSongTitle = (e) => {
    setSongTitle(e.target.value);
  };
  const onSetSongDate = (e) => {
    setSongDate(e.target.value);
  };
  const onOpenLink = () => {
    setIsOpenLink(!isOpenLink);
  };
  const onCancelChange = () => {
    setEditOn(false);
    setSongTitle("");
    setSongDate("");
    console.log(songData);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!songTitle) {
      setErrors("Missing title");
      return;
    }
    updateSong({
      variables: { id: songIdToEdit, title: songTitle, date: +songDate },
      refetchQueries: [
        { query: getSongsQuery },
        {
          query: getSongQuery,
          variables: { id: songIdToEdit, title: songTitle, date: +songDate },
        },
      ],
    });
    setEditOn(false);
  };

  return playlist ? (
    <div>
      <IframeModal open={isOpenLink} {...{ onOpenLink }} />
      <h1>{`Welcome to ${
        user && userName !== "all" && userName !== "start"
          ? userName + "'s"
          : "our"
      } playlist`}</h1>
      {!playlist.length ? (
        <div className="playlist-container">
          <div className="songs-container">
            <h3 className="song-container">This playlist is empty</h3>
          </div>
          <Toolbar {...{ selectUser, displayUsers }}></Toolbar>
        </div>
      ) : (
        <div className="playlist-container">
          <div className={`songs-container ${user ? "" : "logout"}`}>
            {playlist.map((song) => (
              <div className="song-container" key={song.id}>
                <SongCard
                  idref={song.id}
                  {...{ song, displaySongDetails, onOpenLink }}
                />
                <Modal isEdit={user && user.username === song.userName}>
                  <button id={song.id} onClick={onDeleteSong}>
                    Delete
                  </button>
                  <button id={song.id} onClick={onEditSong}>
                    Edit
                  </button>
                  <Modal isEdit={songIdToEdit === song.id && isEditOn}>
                    <EditSongPanel
                      id={song.id}
                      onClick={onEditSong}
                      songTitle={songTitle}
                      songDate={songDate}
                      onChangeSongTitle={onSetSongTitle}
                      onChangeSongDate={onSetSongDate}
                      onCancelChange={onCancelChange}
                      onSubmit={onSubmit}
                    />
                  </Modal>
                </Modal>
                {songData && songId === song.id && onExpand && (
                  <SongInfo {...songData} />
                )}
              </div>
            ))}
          </div>
          <Toolbar {...{ selectUser, displayUsers }}></Toolbar>
        </div>
      )}
    </div>
  ) : (
    <div>Site maintenance</div>
  );
};

export default PlayList;
