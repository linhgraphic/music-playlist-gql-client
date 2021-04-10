import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className={`panel${props.isEdit ? " open" : ""}`}>
      {props.children}
    </div>
  );
};

export default Modal;
