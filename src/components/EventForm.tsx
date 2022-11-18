import React, {FC, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/formatDate";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[]
    submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = ({guests, submit}) => {
    const [event, setEvent] = useState<IEvent>({
        author: "",
        guest: "",
        date: "",
        description: ""
    } as IEvent)

    const {user} = useTypedSelector(state => state.authReducer)

    const selectDate = (date: Moment | null) => {
        if (date) setEvent({...event, date: formatDate(date.toDate())})
    }

    const submitForm = () => {
        submit({...event, author: user.username})
    }

    return (
        <Form
            onFinish={submitForm}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
        >
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
                valuePropName={event.guest}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                    placeholder='Введите описание'
                />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие для прошедших дат!')]}
            >
                <DatePicker
                    onChange={date => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Гость"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    onChange={(guest: string) => setEvent({...event, guest})}
                    options={guests.map(guest => ({value: guest.username, label: guest.username,}))}
                />
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};