import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";

// export default class UserService {
//     static async getUsers(): Promise<AxiosResponse<IUser[]>> {
//         return axios.get<IUser[]>('./users.json')
//     }
// }

const UsersService = {
    getUsers: (): IUser[] => {
        return JSON.parse(localStorage.getItem('allUsers') ?? "[]")
    },
    setUsers: (users: IUser[]) => {
        localStorage.setItem('allUsers', JSON.stringify(users))
    }
}

export default UsersService