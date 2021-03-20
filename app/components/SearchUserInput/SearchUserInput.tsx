import React, { FunctionComponent, SyntheticEvent } from "react";
import { Input, InputGroup, Icon } from "rsuite";
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
    <InputGroup size="lg" inside style={{ width: "100%" }}>
      <Input type="text" onChange={handleChange} onPressEnter={handleSearch} placeholder={"steamId or custom URL"} />
      <InputGroup.Button onClick={handleSearch} >
        <Icon icon="search" />
      </InputGroup.Button>
    </InputGroup>
  );
};
