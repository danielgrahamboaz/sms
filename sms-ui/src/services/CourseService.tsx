import axios from "axios";
import { config } from "../constants";

const COURSE_API_URL = config.API_URL + '/api/courses';

class CourseService {
    static async getAllCourses() {
        const response = await axios.get(COURSE_API_URL);
        return response.data;
    }

    static async getCourseById(id: number) {
        const response = await axios.get(`${COURSE_API_URL}/${id}`);
        return response.data;
    }

    static async createCourse(course: object) {
        const response = await axios.post(`${COURSE_API_URL}/add`, course);
        return response.data;
    }

    static async updateCourse(id: number, course: object) {
        const response = await axios.put(`${COURSE_API_URL}/update/${id}`, course);
        return response.data;
    }

    static async deleteCourse(id: number) {
        const response = await axios.delete(`${COURSE_API_URL}/delete/${id}`);
        return response.data;
    }

    static async getCoursesByProgrammeId(id: number) {
        const response = await axios.get(`${COURSE_API_URL}/programme/${id}`);
        return response.data;
    }
}

export default CourseService;