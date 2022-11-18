import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {FC} from "react";
import {Moment} from "moment";
import {formatDate} from "../utils/formatDate";

interface EventCalendarProps {
    events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    const dateCellRender = (value: Moment) => {
        const formattedDate = formatDate(value.toDate())
        const currentDayEvents = events.filter(event => event.date === formattedDate)

        return (
            currentDayEvents.map((event, index) => (
                <div key={index}>{event.description}</div>
            ))
        );
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};
