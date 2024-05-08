import React from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Row, Col, Button } from 'antd';

export const Header = ({ name }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Layout.Header style={{ 'background': 'green'}}>
      <Row justify="space-between">
        <Col>
            <span style={{ color: 'white', fontSize: '18px' }}>
                { name }
            </span>
        </Col>
        <Col>
          <Button onClick={onLogout}>
            Вихід
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};
