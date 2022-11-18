import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const EventActions = {
    setGuest: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUEST, payload}),
    setEvent: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENT, payload}),
    fetchUsers: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActions.setGuest(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]

            json.push(event)
            dispatch(EventActions.setEvent(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(event => event.author === username || event.guest === username)

            dispatch(EventActions.setEvent(currentUserEvents))
        } catch (e) {
            console.log(e)
        }
    }
}