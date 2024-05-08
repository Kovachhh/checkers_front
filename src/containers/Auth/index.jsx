import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../api/user';
import { Col, Row, Spin } from 'antd';

export const AuthContainer = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const checkUser = async () => {
        const result = await getMe(user.userId);
    
        if(!result) return navigate('/login');
        
        setIsLoading(false);
    }

    useEffect(() => {
        checkUser();
    }, [])

    if(isLoading) return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col>
                <Spin spinning={isLoading} />
            </Col>
        </Row>
    );

    return (
        <>
            {React.cloneElement(props.children)}
        </>
    )
};