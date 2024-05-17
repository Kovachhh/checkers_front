import React, { cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/user";
import { Col, Row } from "antd";
import { Sphere } from "../../components/WebGL/sphere";
import { Canvas } from "@react-three/fiber";

export const AuthContainer = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const checkUser = async () => {
    const result = await getUser(user?.userId);

    if (!result) return navigate("/login");

    setIsLoading(false);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Canvas
            style={{ height: "64px", width: "100%" }}
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
      </Row>
    );

  return <>{cloneElement(props.children)}</>;
};
