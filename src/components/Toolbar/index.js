import React from "react";
import SearchBar from "../SearchBar";
import AddSong from "../AddSong";
import "./Toolbar.css";

const Toolbar = ({ selectUser, displayUsers }) => {
  return (
    <div>
      <div className="tool-bar">
        <p>Filter playlist</p>
        <select onClick={selectUser}>
          <option value="all">All</option>
          {displayUsers()}
        </select>
        <SearchBar />
      </div>
      <AddSong />
    </div>
  );
};

export default Toolbar;
