import React from "react";
import head from "next/head";
import "rsuite/lib/styles/themes/dark/index.less";
import { resolveUser, getUserFriends, resolveFriends } from "../services/api";
import {
  Loader,
  Container,
  Header,
  FlexboxGrid,
  Content,
  Panel,
  Footer,
} from "rsuite";
import { SearchUserInput } from "../components/searchUserInput";
import { UserList } from "../components/UserList";
export async function getServerSideProps() {
  const steamId = await resolveUser("https://steamcommunity.com/id/Typhon0/");
  //console.log(steamId);

  const friends = await getUserFriends(steamId);
  //console.log(friends.data.friendslist.friends);

  const friendsResolved = await resolveFriends(
    friends.data.friendslist.friends
  );
  console.log(steamId);
  //console.log(friendsResolved.data.response.players);
  return { props: { friends: friendsResolved.data.response.players } };
}
const Home = (props) => {
  const [steamId, setSteamId] = React.useState(undefined);
  if (!props.friends) return <Loader center size="lg" />;
  if (props.friends) {
    return (
      <Container>
        <script src="noflash.js" />
        <Header>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item style={{ textAlign: "center" }} colspan={6}>
              <h1>What Do We Play ?</h1>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={20}>
              <h3 style={{ textAlign: "center" }}>
                Find Steam apps that you have in common with your friends, fast,
                so you're not wasting time asking, "What do we play?".
              </h3>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Content style={{ height: "100%", margin: 10 }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={18} style={{ marginBottom: 30 }}>
              <SearchUserInput></SearchUserInput>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24}>
              <Panel shaded bordered bodyFill>
                <UserList users={props.friends}></UserList>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        <Footer></Footer>
      </Container>
    );
  }
};

export default Home;
