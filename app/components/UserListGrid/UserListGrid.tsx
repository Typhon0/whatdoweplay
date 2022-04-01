import { NextPage } from "next";
import React from "react";
import * as useId from "react";
import { Col, FlexboxGrid, Row, Stack } from "rsuite";
import { UserCard } from "../UserCard/UserCard";

interface IProps {
  setSelected: (selected: string[]) => void;
  selected: string[];
  users: Array<User>;
}
export const UserListGrid: NextPage<IProps> = (props: IProps) => {
  function onSelect(steamId) {
    if (props.selected.some((e) => e == steamId)) {
      props.setSelected(props.selected.filter((e) => e != steamId));
    } else {
      props.setSelected([...props.selected, steamId]);
    }
  }

  return (
    <Stack wrap spacing={6} direction="row" justifyContent="flex-start" alignItems="center">
      {props.users.map((e: User, index: number) => (
        <UserCard
          key={index}
          onSelect={onSelect}
          selected={props.selected.some((elem) => e.steamid.toString() == elem)}
          user={e}
        />
      ))}
    </Stack>
  );
};


