import React from "react";
import { Input, Menu } from "semantic-ui-react";

const SearchBar = () => {
  return (
    <Menu secondary>
      <Menu.Menu>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default SearchBar;
