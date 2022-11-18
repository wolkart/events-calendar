import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

export const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.authReducer)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()

    const submit = () => {
      login(username, password)
    }

    const submitFailed = () => {
      alert('Пошел вон!')
    }

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={submit}
            onFinishFailed={submitFailed}
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

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
            {error && <span style={{color: 'red'}}>{error}</span>}
        </Form>
    );
};