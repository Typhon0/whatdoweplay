import React, { useState } from "react";
import {
  Avatar,
  Button,
  Col,
  FlexboxGrid,
  Panel,
  PanelProps,
  Row,
} from "rsuite";
import { UserCard } from "../UserCard/UserCard";

const styleCenter = {
  display: "flex",
  alignItems: "center",


};




export const UserListGrid = (props) => {

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
  );
};
