import { useEffect, useMemo, useState } from 'react';
import Button from '../../../../base-components/Button';
import { FormLabel, FormSelect } from '../../../../base-components/Form';
import Litepicker from '../../../../base-components/Litepicker';
import GradeService from '../../../../services/GradeService';
import ProgrammeService from '../../../../services/ProgrammeService';
import { AdmissionForm, Parent, Student } from '../../../../types/entities';
import { formatDate } from '../../../../utils/dateformat';

type Programme = {
    id: number;
    name: string;
    level: string;
}

type PageProps = {
    nextPage: () => void,
    prevPage: () => void;
    form: AdmissionForm;
    setAdmissionForm: (admissionForm: any) => void;
    parentForm: Parent;
    studentForm: Student;
}

const Step3 = ({ nextPage, prevPage, form, setAdmissionForm, parentForm, studentForm }: PageProps) => {
    const [grades, setGrades] = useState<any>([])
    const [programmes, setProgrammes] = useState<Programme[]>([]);
    const [error, setError] = useState("");
    const [admitDate, setAdmitDate] = useState("");
    const [admitForm, setAdmitForm] = useState<AdmissionForm>({ ...form, student: studentForm, parent: parentForm })
    const [selectedGrade, setSelectedGrade] = useState<number>(0)
    const [selectedProgramme, setSelectedProgramme] = useState<number>(0)
    const [selectedLevel, setSelectedLevel] = useState<string>("")

    const handleSelectGrade = (e: any) => {
        setSelectedGrade(parseInt(e.target.value));
        console.log("selected grade id; ", e.target.value)
        setAdmitForm({ ...admitForm, student: { ...studentForm, grade_id: parseInt(e.target.value) } })
    }

    const handleSelectProgramme = (e: any) => {
        setSelectedProgramme(parseInt(e.target.value));
        console.log("selected grade id; ", e.target.value)
        setAdmitForm({ ...admitForm, student: { ...studentForm, programme_id: parseInt(e.target.value) } })
    }

    const handleSelectLevel = (e: any) => {
        setSelectedLevel(e.target.value);
        console.log("selected level; ", e.target.value)
        setAdmitForm({ ...admitForm, student: { ...studentForm, level: e.target.value } })
    }


    const fetchGrades = async () => {
        GradeService.getAllGrades().then((response) => {
            setError("")
            console.log("Grades: ", response);
            setGrades(response)
            setSelectedGrade(response[0].id)
            setAdmitForm({ ...admitForm, student: { ...studentForm, grade_id: response[0].id } })
        }).catch((res) => {
            console.log("error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })
    }

    const fetchProgrammes = async () => {
        ProgrammeService.getAllProgrammes().then((response) => {
            console.log("programmes: ", response);
            setProgrammes(response);
            setSelectedProgramme(response[0].id)
            setAdmitForm({ ...admitForm, student: { ...studentForm, programme_id: response[0].id } })
        });
    }

    const saveAdmission = () => {

        console.log("selected Program__: ", selectedProgramme)
        console.log("selected Grade__: ", selectedGrade)
        console.log("selected Level__: ", selectedLevel)

        let sFormData = { student: { ...studentForm, programme_id: selectedProgramme, grade_id: selectedGrade, level: selectedLevel }, admissionYear: admitDate }
        let formData = { ...admitForm, ...sFormData, admissionYear: formatDate(new Date(admitDate)) }

        if (formData.admissionYear === "" || formData.student.programme_id === 0 || formData.student.grade_id === 0 || formData.student === undefined || formData.parent === undefined || formData.student.level === "") {
            console.log("admit form error: ", formData);
            setError("Please fill all fields!")
            return;
        }

        setError("")

        console.log("admit form: ", formData);
        setAdmissionForm(formData);

    }


    useEffect(() => {
        fetchGrades()
        fetchProgrammes()

        console.log("parentForm: ", parentForm)
        console.log("studentForm: ", studentForm)
        console.log("form: ", admitForm);
    }, [])

    useEffect(() => {
        setAdmitForm({ ...admitForm, student: { ...studentForm, grade_id: selectedGrade, programme_id: selectedProgramme } })
        console.log("selected grade: ", selectedGrade);
    }, [selectedGrade])

    useEffect(() => {
        setAdmitForm({ ...admitForm, student: { ...studentForm, grade_id: selectedGrade, programme_id: selectedProgramme } })
        console.log("selected programme: ", selectedProgramme);
    }, [selectedProgramme])

    useEffect(() => {
        setAdmitForm({ ...admitForm, admissionYear: formatDate(new Date(admitDate)) })
        console.log("admit date: ", formatDate(new Date(admitDate)));
    }, [admitDate])

    useEffect(() => {
        setAdmitForm({ ...admitForm, student: { ...studentForm, level: selectedLevel } })
        console.log("selected level: ", selectedLevel);
    }, [selectedLevel])

    return (
        <>
            <div className="text-base font-medium">Programme Selection</div>
            {error && (
                <div className="intro-x mt-5">
                    <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                        {error}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-12 gap-4 mt-5 gap-y-5">
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-2">Grade</FormLabel>
                    <FormSelect id="input-wizard-6" name="grade" onChange={e => handleSelectGrade(e)}>
                        {
                            grades?.map((grade: any) => (
                                <option key={grade.id} value={grade.id}>{grade.name}</option>
                            ))
                        }
                    </FormSelect>
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-3">Programme</FormLabel>
                    <FormSelect id="input-wizard-6" name="programme" onChange={e => handleSelectProgramme(e)}>
                        {
                            programmes?.map((programme: Programme) => (
                                <option key={programme.id} value={programme.id}>{programme.name}</option>
                            ))
                        }
                    </FormSelect>
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-4">Admission Year</FormLabel>
                    <Litepicker
                        value={admitDate}
                        onChange={setAdmitDate}
                        options={{
                            autoApply: false,
                            showWeekNumbers: true,
                            dropdowns: {
                                minYear: 2023,
                                maxYear: null,
                                months: true,
                                years: true,
                            },
                        }}
                        className=""
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-level">Level</FormLabel>
                    <FormSelect id="input-wizard-level" className="" name='level' value={selectedLevel} aria-label="Select the Level" onChange={(e) => handleSelectLevel(e)}>
                        <option value={""}>Select a level</option>
                        <option value={"ELEMENTARY"}>Elementary</option>
                        <option value={"HIGH_SCHOOL"}>Secondary</option>
                    </FormSelect>
                </div>
                <div className="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end">
                    <Button onClick={() => prevPage()} variant="secondary" className="w-24">
                        Previous
                    </Button>
                    <Button onClick={() => saveAdmission()} variant="primary" className="w-24 ml-2">
                        Submit
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Step3