import axios from "axios";
import { config } from "../constants";

const USER_REGISTER_URL = config.API_URL + '/api/auth/register';


class UserRegisterService {
    static async registerUser(user: object) {
        const response = await axios.post(USER_REGISTER_URL, user);
        console.log("response: ", response);
        return response.data;
    }
}

export default UserRegisterService;