import { NextPage } from "next";
import React from "react";
import { Col, FlexboxGrid, Row } from "rsuite";
import { UserCard } from "../UserCard/UserCard";

interface IProps {
  setSelected: (selected: string[]) => void;
  selected: string[];
  users: any;
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
    <FlexboxGrid.Item colspan={24}>
      <Row>
        {props.users.map((e, index) => (
          <Col key={index} md={3} sm={6}>
            <UserCard
              onSelect={onSelect}
              selected={props.selected.some((elem) => e.steamid == elem)}
              user={e}
            />
          </Col>
        ))}
      </Row>
    </FlexboxGrid.Item>
  );
};
