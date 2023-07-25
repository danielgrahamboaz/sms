import axios from "axios";
import { config } from "../constants";

const USER_LOGIN_URL = config.API_URL + '/api/auth/login';
const STAFF_LOGIN_URL = config.API_URL + '/api/auth/staff-login';


class UserLoginService {

    static async login(usernameOrEmail: string, password: string) {
        const response = await axios.post(USER_LOGIN_URL, {
            usernameOrEmail: usernameOrEmail,
            password: password
        });
        return response.data;
    }


    static async staffLogin(staff: { usernameOrEmail: string; password: string; role: string; }) {
        const response = await axios.post(STAFF_LOGIN_URL, {
            usernameOrEmail: staff.usernameOrEmail,
            password: staff.password,
            role: staff.role,
        });
        return response.data;
    }
}

export default UserLoginService;