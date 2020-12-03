import React from "react";
import { Icon, Input, InputGroup } from "rsuite";

export const SearchUserInput = () => {
  function handleSearch(event) {}
  return (
    <InputGroup size="lg" inside style={{ width: "100%" }}>
      <Input placeholder={"steamId or custom URL"} />
      <InputGroup.Button onClick={handleSearch} onKeyPress={handleSearch}>
        <Icon icon="search" />
      </InputGroup.Button>
    </InputGroup>
  );
};
