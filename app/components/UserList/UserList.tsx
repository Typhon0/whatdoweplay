import React, { useState } from "react";
import {
  Col,
  FlexboxGrid,
  Row,
} from "rsuite";
import { UserCard } from "../UserCard/UserCard";


export const UserList = (props) => {
  const [selected, setSelected] = useState([]);

  function onSelect(steamId) {
    if (selected.some((e) => e == steamId)) {
      setSelected(selected.filter((e) => e != steamId));
    } else {
      setSelected([...selected, steamId]);
    }
  }
  return (
    <FlexboxGrid.Item style={{ margin: 10 }} colspan={24}>
      <Row>
        {props.users.map((e, index) => {
          return (
            <Col key={index} md={3} sm={6}>
              <UserCard
                onSelect={onSelect}
                selected={selected.some((elem) => e.steamid == elem)}
                user={e}
              />
            </Col>
          );
        })}
      </Row>
    </FlexboxGrid.Item>
  );
};
