import { NextPage } from "next";
import React from "react";

interface IProps {
  game: Game;
}

export const GameDetails = (props: IProps ) => {
  return (
    <div>
   
       <p>Playtime {Math.floor(props.game.playtime_forever / 60)} Hours</p>
        <a href={`steam://rungameid/${props.game.appid}`}></a>
    </div>
  );
};
