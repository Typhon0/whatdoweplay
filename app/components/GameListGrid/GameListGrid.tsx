import { NextPage } from "next";
import React from "react";
import { Col, FlexboxGrid, Row } from "rsuite";
import { GameCard } from "../GameCard/GameCard";

const styleCenter = {
  display: "flex",
  alignItems: "center",
};
interface IProps {
  gamesInCommon: any;
}
export const GameListGrid: NextPage<IProps> = (props) => (
  <FlexboxGrid.Item colspan={24}>
    <Row>
      {props.gamesInCommon.map((e, index) => (
        <Col key={index} md={3} sm={6}>
          <GameCard game={e} />
        </Col>
      ))}
    </Row>
  </FlexboxGrid.Item>
);
