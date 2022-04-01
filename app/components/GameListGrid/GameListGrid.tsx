import { NextPage } from "next";
import React from "react";
import { Button, Col, FlexboxGrid, Grid, Row } from "rsuite";
import { GameCard } from "../GameCard/GameCard";
import ReloadIcon from '@rsuite/icons/Reload';
interface IProps {
  gamesInCommon: Array<Game>;
  resetSearch: () => void;
}
export const GameListGrid: NextPage<IProps> = (props) => (
  <div>
    <FlexboxGrid justify="start" style={{ margin: 30 }}>
      <Button onClick={e => props.resetSearch()}><ReloadIcon /> Reset search</Button>
    </FlexboxGrid>
    <FlexboxGrid align="middle" justify="center">
      <FlexboxGrid.Item colspan={23}>
        {props.gamesInCommon.map((e, index) => (
          <Col key={index} style={{ maxWidth: 200 }} xs={12} sm={6} md={3}>
            <GameCard game={e} />
          </Col>
        ))}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
