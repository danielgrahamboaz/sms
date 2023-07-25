import axios from "axios";
import { config } from "../constants";
import { Teacher } from "../types/entities";

const TEACHER_API_URL = config.API_URL + '/api/teachers';

class TeacherService {

    static async getTeachers() {
        return axios.get(`${TEACHER_API_URL}`);
    }

    static async getTeacher(id: number) {
        return axios.get(`${TEACHER_API_URL}/${id}`);
    }

    static async createTeacher(data: any) {
        return axios.post(`${TEACHER_API_URL}/add`, data);
    }

}

export default TeacherService;