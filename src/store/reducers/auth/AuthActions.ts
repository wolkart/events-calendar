import {IUser} from "../../../models/IUser";
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const AuthActions = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: isAuth}),
    setIsLoading: (payload: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActions.setIsLoading(true))
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const mockUser = response.data.find(user => user.username === username && user.password === password)

                if (mockUser) {
                    dispatch(AuthActions.setError(''))
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("username", mockUser.username)
                    dispatch(AuthActions.setUser(mockUser))
                    dispatch(AuthActions.setIsAuth(true))
                } else {
                    dispatch(AuthActions.setError('Вы ввели не правильный логин или пароль.'))
                }

                dispatch(AuthActions.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActions.setError('Произошла ошибка при логине!'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem("auth")
        localStorage.removeItem("username")
        dispatch(AuthActions.setUser({} as IUser))
        dispatch(AuthActions.setIsAuth(false))
    },
    registration: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActions.setIsLoading(true))
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const existingName = response.data.find(user => user.username === username)

                if (!existingName) {
                    dispatch(AuthActions.setError(''))
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("username", username)
                    dispatch(AuthActions.setUser({username, password}))
                    dispatch(AuthActions.setIsAuth(true))
                } else {
                    dispatch(AuthActions.setError(`Пользаватель с имененм ${existingName.username} уже зарегистрирован.`))
                }

                dispatch(AuthActions.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActions.setError('Произошла ошибка при регистрации!'))
        }
    },
}