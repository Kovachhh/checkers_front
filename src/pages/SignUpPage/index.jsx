import React, { useState } from 'react';
import { Form, Input, Button, Layout, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { VALIDATION } from '../../consts/validation';
import { onSignUp } from '../../api/auth';

export const SignUpPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async ({ email, login, password }) => {
        setIsLoading(true);

        const result = onSignUp({ email, login, password });

        if (result) {
          navigate('/');
        }

        setIsLoading(false);
      };

    return (
        <Layout>
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col span={6}>
                    <Form
                        style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}
                        name="login-form"
                        initialValues={{
                            remember: true,
                            email: 'admin@gmail.com',
                            login: 'admin',
                            password: '123456',
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
                        {
                            type: 'email',
                            message: VALIDATION.INVALID_EMAIL,
                          },
                        ]}
                    >
                        <Input 
                            prefix={<MailOutlined />} 
                            placeholder="Електронна пошта" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="login"
                        rules={[
                        {
                            required: true,
                            message: VALIDATION.FIELD_REQUIRED,
                        },
                        {
                            min: 4,
                            message: VALIDATION.MIN_WIDTH,
                          },
                          {
                            max: 32,
                            message: VALIDATION.MAX_WIDTH,
                          }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Логін" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: VALIDATION.FIELD_REQUIRED,
                        },
                        {
                            min: 4,
                            message: VALIDATION.MIN_WIDTH,
                          },
                          {
                            max: 32,
                            message: VALIDATION.MAX_WIDTH,
                          }
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
                            <Link to="/login">Авторизація</Link>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Зареєструватися
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
            </Row>
        </Layout>
    )
}
