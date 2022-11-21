import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input, Row} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {RouteNames} from "../router";
import {useNavigate} from "react-router-dom";

export const AuthForm: FC = () => {
    const router = useNavigate()
    const {error, isLoading} = useTypedSelector(state => state.authReducer)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)
    const {login, setError, registration} = useActions()


    useEffect(() => {
        setRegister(window.location.pathname === RouteNames.REGISTRATION)
    }, [])

    const submit = () => {
        !register
            ? login(username, password)
            : registration(username, password)
    }

    const toRegistration = () => {
        setError('')
        router(RouteNames.REGISTRATION)
    }

    return (
        <Form
            layout={"vertical"}
            onFinish={submit}
        >
            <Form.Item
                label="Ваше имя"
                name="username"
                rules={[rules.required('Введите ваше имя')]}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Введите ваш пароль')]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>

            <Row justify={"center"}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        {register ? 'Зарегистироваться' : 'Войти'}
                    </Button>
                </Form.Item>
            </Row>
            {error &&
                <>
                    <Row><span style={{color: 'red'}}>{error}</span></Row>
                    {!register && <Row justify="center">
                        <Button
                            type="link"
                            onClick={() => toRegistration()}
                        >
                            Регистрация
                        </Button>
                    </Row>}
                </>
            }
        </Form>
    );
};