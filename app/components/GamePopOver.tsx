import { NextPage } from "next";
import React from "react";
import { Button, Popover, PopoverProps, Whisper } from "rsuite";
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

export const GameCard:Popover = (props: PopoverProps) => {


  return (




  );
};
