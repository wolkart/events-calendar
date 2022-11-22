import React from "react";
import Login from "../pages/Login";
import Events from "../pages/Events";
import Registration from "../pages/Registration";

export interface IRoute {
    path: string
    component: React.ComponentType
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    EVENTS = '/',
    NAVIGATE = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.REGISTRATION, exact: true, component: Registration},
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENTS, exact: true, component: Events}
]