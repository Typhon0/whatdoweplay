import { NextPage } from "next";
import React from "react";
import { Button, Popover, Whisper } from "rsuite";
import { GameDetails } from "../GameDetails/GameDetails";
import styles from "./GameCard.module.scss";
import Image from "next/image";
interface IProps {
  game: Game;
}

const speaker = (
  <Popover title="Title">
    <p>This is a default Popover </p>
    <p>Content</p>
    <p>
      <a>link</a>
    </p>
  </Popover>
);

export const GameCard: NextPage<IProps> = (props: IProps) => {
  return (
    <a href={`steam://nav/games/details/${props.game.appid}`}>
    <div className={styles.library} >
      <div className={styles.game} >
        <Whisper
          controlId="control-id-hover"
          placement="auto"
          trigger="hover"
          speaker={<Popover title={props.game.name}>
            <GameDetails game={props.game}></GameDetails>
          </Popover>}>
          <div className={styles.gamewrapper}>
            <Image
              className={styles.gameImage}
              quality={50}
              width={200}
              height={300}
              src={
                props.game.steamgridInfo
                  ? props.game.steamgridInfo.url
                  : `https://steamcdn-a.akamaihd.net/steam/apps/${props.game.appid}/library_600x900.jpg`
              }
            />
            <div className={styles.gradient}></div>
            <button className={styles.DialogButton} > </button>
          </div>
        </Whisper>
      </div>
    </div>
    </a>
  );
};
