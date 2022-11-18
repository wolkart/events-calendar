import {EventActionEnum, EventActions, EventState} from "./types";

const initialState: EventState = {
    guests: [],
    events: []
}

export const eventReducer = (state = initialState, action: EventActions): EventState => {
    switch (action.type) {
        case EventActionEnum.SET_GUEST:
            return {...state, guests: action.payload}
        case EventActionEnum.SET_EVENT:
            return {...state, events: action.payload}
        default:
            return state
    }
}