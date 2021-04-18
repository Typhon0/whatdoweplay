import { NextPage } from "next";
import { Avatar, FlexboxGrid, Panel } from "rsuite";

const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

interface IProps {
  game: any;
}
export const GameCard: NextPage<IProps> = (props: IProps) => (
  <Panel
    shaded
    bodyFill
    style={{
      margin: 5,
      cursor: "pointer",
    }}
  >
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={8} style={styleCenter}>
        <Avatar
          size="lg"
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${props.game.appid}/${props.game.img_icon_url}.jpg`}
        />
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
          {props.game.name}
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Panel>
);