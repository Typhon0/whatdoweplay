import Head from "next/head";

import {
  InputGroup,
  Input,
  Icon,
  FlexboxGrid,
  Container,
  Header,
  Footer,
  Content,
  Navbar,
  Nav,
} from "rsuite";
import 'rsuite/lib/styles/themes/dark/index.less';

export default function Home() {
  return (
    <Container>
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
      <Content style={{ height: "100%" }}>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={18}>
            <InputGroup size="lg" inside style={{ width: "100%" }}>
              <Input placeholder={"steamId or custom URL"} />
              <InputGroup.Button>
                <Icon icon="search" />
              </InputGroup.Button>
            </InputGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer></Footer>
    </Container>
  );
}
