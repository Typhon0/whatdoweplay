/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext } from "react";
import {
  Loader,
  Container,
  Header,
  FlexboxGrid,
  Content,
  Panel,
  Footer,
  IconButton
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
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import { NoGamesInCommonModal } from "../Modals/NoGamesInCommonModal/NoGamesInCommonModal";
interface IProps {
  user: User;
}

interface IState {
  friends: Array<User>;
  Loading: boolean;
  selected: string[];
  gamesInCommon: Game[];
  noGameInCommonModalOpen: boolean;
  currentSteamId: string;
}

class RootLayout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      friends: new Array<User>(),
      Loading: false,
      selected: [],
      gamesInCommon: new Array<Game>(),
      noGameInCommonModalOpen: false,
      currentSteamId: undefined
    };
    this.cleanResult = this.cleanResult.bind(this)
    this.handleSetSteamId = this.handleSetSteamId.bind(this)
    this.closeModals = this.closeModals.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
  }

  cleanResult = () => {
    this.setState({ friends: [], gamesInCommon: [], selected: [] });
  };

  resetSearch() {
    this.cleanResult();
    this.handleSetSteamId(this.state.currentSteamId);
  }

  handleSetSteamId = async (id: string) => {
    this.cleanResult();
    this.setState({ Loading: true });
    const friends = await getUserFriends(id);
    const friendsResolved = await resolveFriends(friends);
    this.setState({
      friends: friendsResolved,
      Loading: false,
      currentSteamId: id
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user == null) {
      if (this.props.user && this.state.friends?.length == 0) {
        this.handleSetSteamId(this.props.user.steamid);
      }
    }
  };

  closeModals() {
    this.setState({ noGameInCommonModalOpen: false })
  }

  render() {
    
    const handleNext = async () => {
      this.setState({ Loading: true })
      const games: Array<Game> = await getOwnedGamesForUsers([...this.state.selected, this.state.currentSteamId]);
      if (games?.length == 0) {
        this.setState({
          noGameInCommonModalOpen: true,
          Loading: false
        });
      } else {
        this.setState({ gamesInCommon: games, Loading: false });
      }
    };

    const setSelected = (selected) => {
      this.setState({ selected });
    };

    return (

      <Container>
        {this.state.Loading && <Loader size="lg" center style={{zIndex:9999}}/>}
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
                  handleSetSteamId={this.handleSetSteamId}
                  cleanResult={this.cleanResult}
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
                        icon={<ArrowRightIcon></ArrowRightIcon>}
                        placement="right"
                        disabled={this.state.selected.length == 0}
                      >
                        Next
                      </IconButton>
                    </FlexboxGrid>
                    <FlexboxGrid.Item colspan={24}>
                      <UserListGrid
                        selected={this.state.selected}
                        setSelected={setSelected}
                        users={this.state.friends}
                      />
                    </FlexboxGrid.Item>
                  </Panel>
                )}

              {this.state.friends?.length > 0 &&
                this.state.gamesInCommon.length > 0 && (

                  <GameListGrid resetSearch={this.resetSearch} gamesInCommon={this.state.gamesInCommon} />
                )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <NoGamesInCommonModal handleClose={this.closeModals} open={this.state.noGameInCommonModalOpen}></NoGamesInCommonModal>
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default RootLayout;
