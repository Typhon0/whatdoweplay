import React, { FunctionComponent, SyntheticEvent } from "react";
import { Input, InputGroup, Icon, IconButton, ButtonToolbar, FlexboxGrid } from "rsuite";
import { resolveUser } from "../../services/api";

type SearchUserInputProps = {
  handleSetSteamId: React.Dispatch<any>
  cleanResult: Function
}

export const SearchUserInput: FunctionComponent<SearchUserInputProps> = (props) => {
  const [inputValue, setInputValue] = React.useState<undefined | string>(undefined);


  const handleSearch = async () => {
    props.cleanResult()
    let steamId: any = await resolveUser(inputValue)
    props.handleSetSteamId(steamId.steamID64)

  }

  const handleChange = (value: any, event: SyntheticEvent) => {
    setInputValue(value)
  }

  return (
    <FlexboxGrid align="middle" justify="center">
      <FlexboxGrid.Item colspan={2} >
        <IconButton href="/api/auth/login" icon={<Icon icon="arrow-right" />} placement="right">
          Login
      </IconButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={18} >
        <InputGroup size="lg" inside style={{ width: "100%" }}>
          <Input type="text" onChange={handleChange} onPressEnter={handleSearch} placeholder={"steamId or custom URL"} />
          <InputGroup.Button onClick={handleSearch} >
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>

      </FlexboxGrid.Item>

    </FlexboxGrid>

  );
};
