import axios from "axios";
import { config } from "../constants";

const GRADE_API_URL = config.API_URL + "/api/grades";

class GradeService {

    static async getAllGrades() {
        const response = await axios.get(GRADE_API_URL);
        return response.data;
    }

    static async getGradeById(id: number) {
        const response = await axios.get(`${GRADE_API_URL}/${id}`);
        return response.data;
    }

    static async createGrade(grade: object) {
        const response = await axios.post(`${GRADE_API_URL}/add`, grade);
        return response.data;
    }

    static async updateGrade(id: number, grade: object) {
        const response = await axios.put(`${GRADE_API_URL}/update/${id}`, grade);
        return response.data;
    }

    static async deleteGrade(id: number) {
        const response = await axios.delete(`${GRADE_API_URL}/delete/${id}`);
        return response.data;
    }

}

export default GradeService;