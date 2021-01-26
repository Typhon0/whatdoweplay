import React, { FunctionComponent, SyntheticEvent } from "react";
import { Icon, Input, InputGroup } from "rsuite";
import { resolveUser } from "../../services/api";

type SearchUserInputProps = {
  handleSetSteamId: React.Dispatch<any>
  cleanResult: Function
}

export const SearchUserInput: FunctionComponent<SearchUserInputProps> = (props) => {
  const [inputValue, setInputValue] = React.useState<undefined | string>(undefined);


  const handleSearch = () => {
    props.cleanResult()
    resolveUser(inputValue).then((steamId: number) => {
      props.handleSetSteamId(steamId)
    }).catch(err => {

      console.log(err)
    })
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
