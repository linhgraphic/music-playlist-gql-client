import React from "react";
import "./EditSongPanel.css";

const EditSongPanel = (props) => {
  return (
    <form className="edit-panel" onSubmit={props.onSubmit}>
      <fieldset>
        <legend>Type song details here:</legend>
        <div>
          <label>Title: </label>
          <input
            id={props.id}
            type="text"
            value={props.songTitle}
            onChange={props.onChangeSongTitle}
          ></input>
        </div>

        <div>
          <label>Date: </label>
          <input
            id={props.id}
            type="number"
            value={props.songDate}
            onChange={props.onChangeSongDate}
          ></input>
        </div>

        <button type="button" onClick={props.onCancelChange} value="Cancel">
          Cancel
        </button>
        <button type="submit" value="submit">
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default EditSongPanel;
