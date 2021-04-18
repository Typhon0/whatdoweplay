import React, { FunctionComponent } from "react";
import { Input, InputGroup, FlexboxGrid, Icon } from "rsuite";
import { resolveUser } from "../../services/api";
import "./SearchUserInput.module.scss";

type SearchUserInputProps = {
  handleSetSteamId: React.Dispatch<any>;
  cleanResult: () => void;
};

export const SearchUserInput: FunctionComponent<SearchUserInputProps> = (
  props
) => {
  const [inputValue, setInputValue] = React.useState<undefined | string>(
    undefined
  );

  const handleSearch = async () => {
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
            placeholder={"steamId or custom URL"}
          />
          <InputGroup.Button onClick={handleSearch}>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
