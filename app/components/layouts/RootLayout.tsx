/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import {
  Loader,
  Container,
  Header,
  FlexboxGrid,
  Content,
  Panel,
  Footer,
  IconButton,
  Icon,
} from "rsuite";
import {
  getOwnedGamesForUsers,
  getUserFriends,
  resolveFriends,
} from "../../services/api";
import { SearchUserInput } from "../SearchUserInput/SearchUserInput";
import { UserListGrid } from "../UserListGrid/UserListGrid";
import { GameListGrid } from "../GameListGrid/GameListGrid";
import { UserProfile } from "../UserProfile/UserProfile";

interface IProps {
  user: any;
}

interface IState {
  friends: any;
  Loading: boolean;
  selected: any[];
  gamesInCommon: any[];
}

class RootLayout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      friends: undefined,
      Loading: false,
      selected: [],
      gamesInCommon: [],
    };
  }

  render() {
    const handleSetSteamId = async (id: string) => {
      cleanResult();
      this.setState({ Loading: true, selected: [...this.state.selected, id] });
      const friends = await getUserFriends(id);
      const friendsResolved = await resolveFriends(friends.friendslist.friends);
      this.setState({
        friends: friendsResolved.response.players,
        Loading: false,
      });
    };

    const handleNext = async () => {
      const games: any = await getOwnedGamesForUsers(this.state.selected);
      const gamesArray = games.map((user) => user.games);
      const filtered = intersection(gamesArray);
      this.setState({ gamesInCommon: filtered });
    };

    const cleanResult = () => {
      this.setState({ friends: [], gamesInCommon: [], selected: [] });
    };

    function intersection(inter) {
      const result = [];
      let lists;

      if (inter.length === 1) {
        lists = inter[0];
      } else {
        lists = inter;
      }

      for (let i = 0; i < lists.length; i++) {
        const currentList = lists[i];
        for (let y = 0; y < currentList.length; y++) {
          const currentValue = currentList[y];
          if (
            result.findIndex((item) => item.appid === currentValue.appid) === -1
          ) {
            if (
              lists.filter(
                (obj) =>
                  obj.findIndex((item) => item.appid === currentValue.appid) ==
                  -1
              ).length == 0
            ) {
              result.push(currentValue);
            }
          }
        }
      }
      return result;
    }

    const setSelected = (selected) => {
      this.setState({ selected });
    };

    if (this.props.user && !this.state.friends) {
      handleSetSteamId(this.props.user.steamid);
    }
    return (
      <Container>
        {this.state.Loading && <Loader size="md" center />}
        <Header>
          <FlexboxGrid justify="end">
            {!this.props.user && (
              <a href="/api/auth/login">
                <img src="/steamlogin2.png"></img>
              </a>
            )}
          </FlexboxGrid>

          <FlexboxGrid justify="center">
            <FlexboxGrid.Item style={{ textAlign: "center" }} colspan={6}>
              <h1>What Do We Play ?</h1>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={20}>
              <h3 style={{ textAlign: "center" }}>
                {
                  "Find Steam apps that you have in common with your friends, fast,so you're not wasting time asking, What do we play ? "
                }
              </h3>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Content style={{ height: "100%", margin: 10 }}>
          <FlexboxGrid justify="center">
            {!this.props.user ? (
              <FlexboxGrid.Item colspan={18} style={{ marginBottom: 30 }}>
                <SearchUserInput
                  handleSetSteamId={handleSetSteamId}
                  cleanResult={cleanResult}
                />
              </FlexboxGrid.Item>
            ) : (
              <FlexboxGrid.Item style={{ marginBottom: 30 }}>
                <UserProfile user={this.props.user} />
              </FlexboxGrid.Item>
            )}

            <FlexboxGrid.Item colspan={24}>
              {this.state.friends?.length > 0 &&
                this.state.gamesInCommon.length == 0 && (
                  <Panel shaded bordered bodyFill>
                    <FlexboxGrid justify="end" style={{ margin: 10 }}>
                      <IconButton
                        onClick={handleNext}
                        icon={<Icon icon="arrow-right" />}
                        placement="right"
                      >
                        Next
                      </IconButton>
                    </FlexboxGrid>
                    <UserListGrid
                      selected={this.state.selected}
                      setSelected={setSelected}
                      users={this.state.friends}
                    />
                  </Panel>
                )}

              {this.state.friends?.length > 0 &&
                this.state.gamesInCommon.length > 0 && (
                  <Panel shaded bordered bodyFill>
                    <GameListGrid gamesInCommon={this.state.gamesInCommon} />
                  </Panel>
                )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default RootLayout;
