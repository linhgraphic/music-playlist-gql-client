import React from "react";
import "./SongCard.css";

const SongCard = ({ song, idref, displaySongDetails, onOpenLink }) => {
  return (
    <div className="song-title-container">
      <p data-idref={idref} onClick={displaySongDetails}>
        {song.title}
      </p>
      <button id="open-link-button" onClick={onOpenLink}>
        <a
          href="http://linhgraphics.com/"
          target="media"
          rel="noopener noreferrer"
        >
          View
        </a>
      </button>
    </div>
  );
};
export default SongCard;
