import React from "react";
import { Button, Popup } from "semantic-ui-react";

const Popup = () => (
  <Popup content="Add users to your feed" trigger={<Button icon="add" />} />
);

export default Popup;
