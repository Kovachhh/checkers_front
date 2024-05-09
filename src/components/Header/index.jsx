import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Col, Button } from "antd";
import { COLORS } from "../../consts/colors";
import { LogoutOutlined } from "@ant-design/icons";

export const Header = ({ name }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout.Header style={{ background: COLORS.THEME }}>
      <Row justify="space-between">
        <Col>
          <span style={{ color: "white", fontSize: "18px" }}>{name}</span>
        </Col>
        <Col>
          <Button onClick={onLogout} icon={<LogoutOutlined />}>
            Вихід
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};
