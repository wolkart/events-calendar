import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter: FC = () => {
    const {isAuth} = useTypedSelector(state => state.authReducer)

    return (
        isAuth ?
        <Routes>
            {privateRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component/>}
                />
            ))}
            <Route
                path={RouteNames.LOGIN}
                element={<Navigate replace to={RouteNames.EVENTS}/>}
            />
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component/>}
                />
            ))}
            <Route
                path={RouteNames.NAVIGATE}
                element={<Navigate replace to={RouteNames.LOGIN}/>}
            />
        </Routes>
    );
}

export default AppRouter