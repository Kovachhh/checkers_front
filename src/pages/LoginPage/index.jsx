import React, { useState } from "react";
import { Form, Input, Button, Layout, Row, Col } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { VALIDATION } from "../../consts/validation";
import { onLogin } from "../../api/auth";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);

    const result = await onLogin({ email, password });

    if (result) {
      navigate("/");
    }

    setIsLoading(false);
  };

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={6}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            name="login-form"
            initialValues={{
              remember: true,
              email: "admin@gmail.com",
              password: "123456",
            }}
            onFinish={onSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: VALIDATION.FIELD_REQUIRED,
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Електронна пошта" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: VALIDATION.FIELD_REQUIRED,
                },
              ]}
            >
              <Input
                prefix={<KeyOutlined />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between" align="middle">
                <Link to="/signup">Реєстрація</Link>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Увійти
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};
