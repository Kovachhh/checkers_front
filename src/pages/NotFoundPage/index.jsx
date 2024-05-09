import React from "react";
import { Result, Layout, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={6} flex={1}>
          <Result
            status="404"
            title="404"
            subTitle="Сторінка не знайдена"
            extra={
              <Button type="primary">
                <Link to="/">На головну</Link>
              </Button>
            }
          />
        </Col>
      </Row>
    </Layout>
  );
};
