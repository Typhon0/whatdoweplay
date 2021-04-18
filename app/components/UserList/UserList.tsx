import { NextPage } from "next";
import { Col, FlexboxGrid, Row } from "rsuite";
import { UserCard } from "../UserCard/UserCard";

interface IProps {
  setSelected: (selected: string[]) => void;
  selected: string[];
  users: any;
}

export const UserList: NextPage<IProps> = (props: IProps) => {
  function onSelect(steamId: string) {
    if (props.selected.some((e: string) => e == steamId)) {
      props.setSelected(props.selected.filter((e: string) => e != steamId));
    } else {
      props.setSelected([...props.selected, steamId]);
    }
  }
  return (
    <>
      <FlexboxGrid.Item style={{ margin: 10 }} colspan={24}>
        <Row>
          {props.users.map((e, index) => (
            <Col key={index} md={3} sm={6}>
              <UserCard
                onSelect={onSelect}
                selected={props.selected.some((elem) => e.steamid == elem)}
                user={e}
              />
            </Col>
          ))}
        </Row>
      </FlexboxGrid.Item>
    </>
  );
};
