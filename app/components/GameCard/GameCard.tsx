import {
    Avatar,
    FlexboxGrid,
    Panel,
} from "rsuite";
const styleCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const GameCard = (props) => {
    return (
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
                    <Avatar size="lg" src={props.game.img_icon_url} />
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
};