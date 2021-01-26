import React from "react";
import {
    Loader,
    Container,
    Header,
    FlexboxGrid,
    Content,
    Panel,
    Footer,
} from "rsuite";
import { getUserFriends, resolveFriends } from "../../services/api";
import { SearchUserInput } from "../SearchUserInput/SearchUserInput";
import { UserListGrid } from "../UserListGrid/UserListGrid";

const RootLayout = (props) => {
    const [friends, setFriends] = React.useState(undefined);
    const [Loading, setLoading] = React.useState(false);

    const handleSetSteamId = async (id: number) => {

        setLoading(true)
        const friends = await getUserFriends(id);
        const friendsResolved = await resolveFriends(friends.data.friendslist.friends);
        setFriends(friendsResolved.data.response.players)
        setLoading(false)
    }

    const cleanResult = async () => {

        setFriends([])
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

                        {friends?.length > 0 && (
                            <Panel shaded bordered bodyFill>
                                <UserListGrid users={friends}></UserListGrid>
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
