import React, { cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/user";
import { Col, Row, Spin } from "antd";

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
          <Spin spinning={isLoading} size="large" />
        </Col>
      </Row>
    );

  return <>{cloneElement(props.children)}</>;
};
