import React, { useState } from "react";
import {
  Button,
  Col,
  FlexboxGrid,
  Row,
} from "rsuite";
import { UserCard } from "../UserCard/UserCard";


export const UserList = (props) => {

  function onSelect(steamId) {
    if (props.selected.some((e) => e == steamId)) {
      props.setSelected(props.selected.filter((e) => e != steamId));
    } else {
      props.setSelected([...props.selected, steamId]);
    }
  }
  return (
    <React.Fragment>
      <FlexboxGrid.Item style={{ margin: 10 }} colspan={24}>
        <Row>
          {props.users.map((e, index) => {
            return (
              <Col key={index} md={3} sm={6}>
                <UserCard
                  onSelect={onSelect}
                  selected={props.selected.some((elem) => e.steamid == elem)}
                  user={e}
                />
              </Col>
            );
          })}
        </Row>
      </FlexboxGrid.Item>

    </React.Fragment>
  );
};
