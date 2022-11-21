import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import {AuthForm} from "../components/LoginForm";
import Title from 'antd/lib/typography/Title';

const Registration: FC = () => {
    return (
        <Layout>
            <Row
                justify="center"
                align="middle"
                style={{height: "calc(100vh - 64px)"}}
            >
                <Card>
                    <Row justify="center">
                        <Title level={3}>Регистрация</Title>
                    </Row>
                    <AuthForm/>
                </Card>
            </Row>
        </Layout>
    );
};

export default Registration;