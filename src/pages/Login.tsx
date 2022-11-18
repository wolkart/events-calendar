import React, {FC} from 'react';
import {Card, Layout, Row} from "antd";
import {LoginForm} from "../components/LoginForm";

const Login: FC = () => {
    return (
        <Layout>
            <Row
                justify="center"
                align="middle"
                style={{height: "calc(100vh - 64px)"}}
            >
                <Card>
                    <LoginForm/>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;