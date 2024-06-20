import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Col, Button } from "antd";
import { COLORS } from "../../consts/colors";
import { LogoutOutlined } from "@ant-design/icons";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "../WebGL/sphere";

export const Header = ({ name }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout.Header style={{ background: COLORS.THEME }}>
      <Row justify="space-between">
        <Col span={0.5}>
          <Canvas
            style={{ height: "64px", width: "50px" }}
            camera={{
              fov: 120,
              position: [0, 0, 3],
            }}
          >
            <ambientLight intensity={0.1} />
            <directionalLight position={[1, 1, 1]} intensity={0.8} />
            <Sphere />
          </Canvas>
        </Col>
        <Col span={4}>
          <span style={{ color: "white", fontSize: "18px" }}>Шашки онлайн</span>
        </Col>
        <Col span={1} offset={16}>
          <span style={{ color: "white", fontSize: "18px" }}>{name}</span>
        </Col>
        <Col span={1}>
          <Button onClick={onLogout} icon={<LogoutOutlined />}>
            Вихід
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};
