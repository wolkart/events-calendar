import {AuthActions} from "./auth/AuthActions";
import {EventActions} from "./event/EventActions";

export const actions = {
    ...AuthActions,
    ...EventActions
}