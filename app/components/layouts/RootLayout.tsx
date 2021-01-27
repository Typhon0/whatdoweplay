import React from "react";
import {
    Loader,
    Container,
    Header,
    FlexboxGrid,
    Content,
    Panel,
    Footer,
    Button,
    Icon,
    IconButton,
} from "rsuite";
import { RadioContext } from "rsuite/lib/RadioGroup";
import { getOwnedGamesForUsers, getUserFriends, resolveFriends } from "../../services/api";
import { SearchUserInput } from "../SearchUserInput/SearchUserInput";
import { UserListGrid } from "../UserListGrid/UserListGrid";
import { intersectionBy } from 'lodash';
import { GameListGrid } from "../GameListGrid/GameListGrid";

const RootLayout = (props) => {
    const [friends, setFriends] = React.useState(undefined);
    const [Loading, setLoading] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [gamesInCommon, setGamesInCommon] = React.useState([]);

    const handleSetSteamId = async (id: number) => {

        setLoading(true)
        setSelected([...selected, id])
        const friends = await getUserFriends(id);
        const friendsResolved = await resolveFriends(friends.data.friendslist.friends);
        setFriends(friendsResolved.data.response.players)
        setLoading(false)
    }

    const handleNext = async (event: React.SyntheticEvent<Element, Event>) => {
        console.log(event.target)
        console.log(selected)
        const games: any = await getOwnedGamesForUsers(selected)
        const gamesArray = games.map((user) => user.games);
        const filtered = intersectionBy(gamesArray, 'appid');
        console.log(filtered[0])
        setGamesInCommon(filtered[0])
    }
    const cleanResult = () => {
        setFriends([])
        setGamesInCommon([])
        setSelected([])
    }

    return (
        <Container>
            {Loading && (
                <Loader size="md" center />

            )}
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
                        <SearchUserInput handleSetSteamId={handleSetSteamId} cleanResult={cleanResult} ></SearchUserInput>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={24}>

                        {friends?.length > 0 && gamesInCommon.length == 0 && (
                            <Panel shaded bordered bodyFill>
                                <FlexboxGrid justify="end" style={{ margin: 10 }}>
                                    <IconButton onClick={handleNext} icon={<Icon icon="arrow-right" />} placement="right">
                                        Next
                                            </IconButton>
                                </FlexboxGrid>
                                <UserListGrid selected={selected} setSelected={setSelected} users={friends}></UserListGrid>
                            </Panel>
                        )}

                        {friends?.length > 0 && gamesInCommon.length > 0 && (
                            <Panel shaded bordered bodyFill>
                                <GameListGrid gamesInCommon={gamesInCommon}></GameListGrid>
                            </Panel>
                        )}




                    </FlexboxGrid.Item>

                </FlexboxGrid>
            </Content>
            <Footer></Footer>
        </Container>
    );

};

export default RootLayout;
