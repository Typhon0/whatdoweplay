import { NextPage } from "next";
import React from "react";
import { Col, FlexboxGrid, Grid, Row } from "rsuite";
import { GameCard } from "../GameCard/GameCard";

interface IProps {
  gamesInCommon: any;
}
export const GameListGrid: NextPage<IProps> = (props) => (
  <FlexboxGrid align="middle" justify="center">
    <FlexboxGrid.Item colspan={23}>
      {props.gamesInCommon.map((e, index) => (
        <Col key={index} style={{ maxWidth: 200 }} xs={12} sm={6} md={3}>
          <GameCard game={e} />
        </Col>
      ))}
    </FlexboxGrid.Item>
  </FlexboxGrid>
);
