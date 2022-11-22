import React, {FC, useEffect, useState} from 'react';
import {EventCalendar} from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import {EventForm} from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Events: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {fetchUsers, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.eventReducer)
    const {user} = useTypedSelector(state => state.authReducer)

    useEffect(() => {
        fetchUsers(user)
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setIsModalOpen(false)
        createEvent(event)
        success(event)
    }

    const success = (event: IEvent) => {
        const modal = Modal.success({
            content: `Событие ${event.description} успешно создано!`,
        });

        setTimeout(() => {
            modal.destroy()
        }, 2000)
    };

    return (
        <Layout style={{height: "calc(100vh - 64px)"}}>
            <EventCalendar events={events}/>
            <Row justify="center" style={{paddingTop: "20px"}}>
                <Button
                    onClick={() => setIsModalOpen(true)}
                >
                    Добавить событие
                </Button>
            </Row>
            <Modal
                title="Добавить событие"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <EventForm
                    guests={guests}
                    submit={(event) => addNewEvent(event)}
                />
            </Modal>
        </Layout>
    );
};

export default Events;