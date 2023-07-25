export enum ParentType {
    Father = "FATHER",
    Mother = "MOTHER",
    Guardian = "GUARDIAN",
}

export enum Gender {
    Male = "MALE",
    Female = "FEMALE"
}

export enum Level {
    ELEMENTARY = "Elementary School",
    HIGH_SCHOOL = "Secondary School",
}


export type GradeU = {
    id: number;
    name: string;
    level: string;
};