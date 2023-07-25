export type Student = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    gender: string;
    dateOfBirth: string;
    enrollDate: string;
    level: string;
    grade_id: number;
    programme_id: number;
}

export type Parent = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
    parentType: string;
}

export type AdmissionForm = {
    parent: Parent,
    student: Student,
    admissionYear: string;
}

export type Programme = {
    id: number;
    name: string;
    level: string;
}

export type Teacher = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    course: {
        id: number;
        name: string;
    },
    gender: string;
}

export type ApprovalObject = {
    admission_id: number;
    admissionStatus: boolean;
}

export type CourseFile = {
    name: string;
    path: string;
    fileType: string;
    size: number;
    course_id: number;
    user_id: number;
}