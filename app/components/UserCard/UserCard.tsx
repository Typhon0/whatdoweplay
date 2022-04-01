import { NextPage } from "next";
import { Avatar, AvatarGroup, Col, FlexboxGrid, Grid, Panel, Row } from "rsuite";
import styles from "./UserCard.module.scss";
const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
interface IProps {
  user: User;
  onSelect: (string) => void;
  selected: boolean;
}
export const UserCard: NextPage<IProps> = (props: IProps) => (
  <Panel
    onClick={() => {
      props.onSelect(props.user.steamid);
    }}
    shaded
    bodyFill
    style={{

      backgroundColor: props.selected ? "#292D33" : "",
      cursor: "pointer",
      border: props.selected ? "1px solid #3c3f43" : "1px solid transparent",
    }}
  >

    <figure className={styles.item}>
      <Avatar
        size="lg"
        circle
        src={props.user.avatarfull} />
      <figcaption className={styles.caption}>{props.user.personaname}</figcaption>
    </figure>



  </Panel>
);
