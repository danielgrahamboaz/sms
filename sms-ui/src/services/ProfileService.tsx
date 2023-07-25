import axios from "axios";
import { config } from "../constants";

const UPDATE_USER_URL = config.API_URL + '/api/auth/staff/update';
const UPDATE_PASSWORD_URL = config.API_URL + '/api/auth/update-password';

class ProfileService {

    static async update(user: { id: string; username: string; email: string; }) {
        const response = await axios.put(`${UPDATE_USER_URL}/${user.id}`, {
            username: user.username,
            email: user.email,
        });
        return response.data;
    }

    static async updatePassword(user: { id: string; password: string; }) {
        const response = await axios.put(`${UPDATE_PASSWORD_URL}/${user.id}`, {
            newPassword: user.password,
        });
        return response.data;
    }
}

export default ProfileService;