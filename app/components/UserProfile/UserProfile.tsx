import { NextPage } from "next";
import React from "react";
import { Avatar, Col, Grid, Row } from "rsuite";
import { logout } from "../../services/api";
import styles from "./UserProfile.module.scss";
interface IProps {
  user: any;
}

export const UserProfile: NextPage<IProps> = (props: IProps) => {
  return (
    <Grid fluid className={styles.grid}>
      <Row>
        <Col>
          <Avatar
            onClick={() => window.open(props.user.profileurl, "_blank")}
            size="lg"
            src={props.user.avatarfull}
          />
        </Col>
        <Col>
          <h6>{props.user.personaname}</h6>
          <a
            onClick={() => {
              logout().then(() => {
                window.location.reload();
              });
            }}
          >
            <p>Logout</p>
          </a>
        </Col>
      </Row>
    </Grid>
  );
};
