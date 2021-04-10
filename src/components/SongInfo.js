import React from "react";

const SongInfo = (songData) => {
  return (
    <div>
      {songData && (
        <div>
          <h4>Song details:</h4>
          <p>{songData.song.title}</p>
          {songData.song.date !== 0 && <p>{songData.song.date}</p>}
          <p>{songData.song.artist.name}</p>
          <p>{songData.song.artist.bio}</p>
          <p>All songs by this artist</p>
          <ul>
            {songData.song.artist.songs.map((song) => (
              <li key={song.createdAt + song.user.id}>{song.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SongInfo;
