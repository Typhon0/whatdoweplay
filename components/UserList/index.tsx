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
const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Card = (props) => {
  return (
    <Panel
      onClick={(e) => {
        props.onSelect(props.user.steamid);
      }}
      shaded
      bodyFill
      style={{
        margin: 5,
        cursor: "pointer",
        border: props.selected ? "1px solid #3c3f43" : "1px solid transparent",
      }}
    >
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={8} style={styleCenter}>
          <Avatar size="lg" src={props.user.avatarfull} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={6}
          style={{
            ...styleCenter,
            flexDirection: "column",
            alignItems: "space-around",
          }}
        >
          <div
            style={{
              padding: 15,
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
          >
            {props.user.personaname}
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

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
              <Card
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
