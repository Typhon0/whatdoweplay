import { NextPage } from "next";
import React from "react";

interface IProps {
  game: any;
}

export const GameDetails = (props: IProps ) => {
  return (
    <div>
   
       <p>Playtime {props.game.playtime_forever} Hours</p>
        <a href={`steam://rungameid/${props.game.appid}`}></a>
    </div>
  );
};
