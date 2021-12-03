import { NextPage } from "next";
import React from "react";
import { Button, Popover, Whisper } from "rsuite";
import { GameDetails } from "../GameDetails/GameDetails";
import styles from "./GameCard.module.scss";
import Image from "next/image";
interface IProps {
  game: any;
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
  console.log(props.game.steamgridInfo);
  console.log(props.game.name);

  return (

    <div className={styles.library}>
              
      <div className={styles.game}>
      <Whisper
    controlId="control-id-hover"
    placement="auto"
    trigger="hover"
    speaker={  <Popover title={props.game.name}>
    <GameDetails game={props.game}></GameDetails>
  </Popover>}
  >
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

          </div>
          </Whisper>  
      </div>

    </div>

    // <Panel
    //   shaded
    //   bodyFill
    //   style={{
    //     margin: 5,
    //     cursor: "pointer",
    //   }}
    // >
    //   <FlexboxGrid>
    //     <FlexboxGrid.Item colspan={8} style={styleCenter}>
    //       <Avatar
    //         size="lg"
    //         src={`http://media.steampowered.com/steamcommunity/public/images/apps/${props.game.appid}/${props.game.img_icon_url}.jpg`}
    //       />
    //     </FlexboxGrid.Item>
    //     <FlexboxGrid.Item
    //       colspan={6}
    //       style={{
    //         ...styleCenter,
    //         flexDirection: "column",
    //         alignItems: "space-around",
    //       }}
    //     >
    //       <div
    //         style={{
    //           padding: 15,
    //           whiteSpace: "nowrap",
    //           fontWeight: 500,
    //         }}
    //       >
    //         {props.game.name}
    //       </div>
    //     </FlexboxGrid.Item>
    //   </FlexboxGrid>
    // </Panel>
  );
};
