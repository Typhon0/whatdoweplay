import React, { FunctionComponent, useEffect } from "react";
import { Input, InputGroup, FlexboxGrid } from "rsuite";
import { resolveUser } from "../../services/api";
import "./SearchUserInput.module.scss";
import SearchIcon from '@rsuite/icons/Search';

type SearchUserInputProps = {
  handleSetSteamId: React.Dispatch<string>;
  cleanResult: () => void;
};

export const SearchUserInput: FunctionComponent<SearchUserInputProps> = (
  props
) => {
  const [inputValue, setInputValue] = React.useState<undefined | string>(undefined );
  
  const handleSearch = async (e) => {
    props.cleanResult();
    const steamId: string = await resolveUser(inputValue);
    props.handleSetSteamId(steamId);
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <FlexboxGrid align="middle" justify="center">
      <FlexboxGrid.Item colspan={18}>
        <InputGroup size="lg" inside style={{ width: "100%" }}>
          <Input
          
            type="text"
            onChange={handleChange}
            onPressEnter={handleSearch}
            value={inputValue}
            defaultValue=""
            autoComplete="off"
            placeholder={"steamId or custom URL"}
          />
          <InputGroup.Button onClick={handleSearch}>
          <SearchIcon></SearchIcon> 
          </InputGroup.Button>
        </InputGroup>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
