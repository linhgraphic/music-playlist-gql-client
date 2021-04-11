import React from "react";
import "./IframeModal.css";

const IframeModal = ({ children, onClick = () => null, open, onOpenLink }) => (
  <div onClick={onClick} className={`modal${open ? " open" : ""}`}>
    <div className="media-link-container">
      <button id="close-link-button" onClick={onOpenLink}>
        <h2>x</h2>
      </button>
      <iframe
        src="http://linhgraphics.com/"
        name="media"
        title="Open link to media"
      ></iframe>
    </div>
  </div>
);

export default IframeModal;
