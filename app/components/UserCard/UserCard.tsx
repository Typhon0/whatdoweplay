import { NextPage } from "next";
import { Avatar, FlexboxGrid, Panel } from "rsuite";

const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
interface IProps {
  user: any;
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
    className="card"
    style={{
      margin: 5,
      backgroundColor: props.selected ? "#292D33" : "",
      cursor: "pointer",

      border: props.selected ? "1px solid #3c3f43" : "1px solid transparent",
    }}
  >
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={8} style={styleCenter}>
        <Avatar size="lg" src={props.user.avatarfull} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        colspan={6}
        style={{
          ...styleCenter,
          flexDirection: "column",
          alignItems: "space-around",
        }}
      >
        <div
          style={{
            padding: 15,
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          {props.user.personaname}
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Panel>
);
