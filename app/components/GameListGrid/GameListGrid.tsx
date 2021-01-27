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
import { GameCard } from "../GameCard/GameCard";
import { UserCard } from "../UserCard/UserCard";

const styleCenter = {
    display: "flex",
    alignItems: "center",


};




export const GameListGrid = (props) => {



    return (
        <FlexboxGrid.Item colspan={24}>
            <Row>
                {props.gamesInCommon.map((e, index) => {
                    return (
                        <Col key={index} md={3} sm={6}>
                            <GameCard game={e}></GameCard>
                        </Col>
                    );
                })}
            </Row>

        </FlexboxGrid.Item>
    );
};


