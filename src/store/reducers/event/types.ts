import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";

export interface EventState {
    guests: IUser[]
    events: IEvent[]
}

export enum EventActionEnum {
    SET_GUEST = 'SET_GUEST',
    SET_EVENT = 'SET_EVENT',
}

export interface SetGuestsAction {
    type: EventActionEnum.SET_GUEST
    payload: IUser[]
}

export interface SetEventsAction {
    type: EventActionEnum.SET_EVENT
    payload: IEvent[]
}

export type EventActions =
    SetGuestsAction |
    SetEventsAction

