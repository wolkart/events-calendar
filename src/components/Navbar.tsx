import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from '../router';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const router = useNavigate()
    const {logout} = useActions()
    const {isAuth, user} = useTypedSelector(state => state.authReducer)

    return (
        <Layout.Header>
            <Row justify="end">
                <Menu theme="dark" mode="horizontal" selectable={false}>
                    {isAuth ?
                        <>
                            <span style={{color: 'white', fontWeight: 'bold', marginRight: '10px'}}>
                                {user.username}
                            </span>
                            <Menu.Item
                                key={1}
                                onClick={logout}
                            >
                                Выйти
                            </Menu.Item>
                        </>
                        :
                        <>
                            <span style={{color: 'white', fontWeight: 'bold', marginRight: '10px'}}>
                                Гость
                            </span>
                            <Menu.Item
                                key={1}
                                onClick={() => router(RouteNames.LOGIN)}
                            >
                                Логин
                            </Menu.Item>
                        </>}
                </Menu>
            </Row>
        </Layout.Header>
    );
};

export default Navbar;