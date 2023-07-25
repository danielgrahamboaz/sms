import React, { useEffect, useRef, useState } from 'react'
import { FormInput, FormLabel } from '../../../../base-components/Form'
import TomSelect from '../../../../base-components/TomSelect';
import Button from '../../../../base-components/Button';
import { ClassicEditor } from '../../../../base-components/Ckeditor';
import CourseService from '../../../../services/CourseService';
import GradeService from '../../../../services/GradeService';
import ProgrammeService from '../../../../services/ProgrammeService';
import Notification, { NotificationElement } from '../../../../base-components/Notification';
import { useLoading } from '../../../../contexts/LoadingContext';
import Loader from '../../../../components/Loader';

const index = () => {
    // Basic non sticky notification
    const basicNonStickyNotification = useRef<NotificationElement>();
    const basicNonStickyNotificationToggle = () => {
        // Show notification
        basicNonStickyNotification.current?.showToast();
    };
    const editorConfig = {
        toolbar: {
            items: ["bold", "italic", "link"],
        },
    };

    const [course, setCourse] = useState({
        name: "",
        description: "<p>Description of the course.</p>",
        programme_id: 0,
        grades: [0]
    })
    const [error, setError] = useState("")
    const [editorData, setEditorData] = useState("<p>Description of the course.</p>");
    const [selectedProgramme, setSelectedProgramme] = useState("1");
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [grades, setGrades] = useState([]);
    const [programmes, setProgrammes] = useState([]);

    const { loading, setLoading } = useLoading();

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourse({ ...course, name: e.target.value });
    };

    const saveCourse = (e: React.MouseEvent) => {
        e.preventDefault()

        // setCourse({ ...course, description: editorData.toString(), programme_id: parseInt(selectedProgramme), grades: selectedClasses.map(Number) })
        let course_ = { name: course.name, description: editorData.toString(), programme_id: parseInt(selectedProgramme), grades: selectedClasses.map(Number) }
        console.log("course object: ", course_, selectedClasses)

        if (!course_.name || !course_.description || !course_.programme_id || course_.grades[0] === 0) {
            setError("Some fields are empty.")
            console.log("course fields empty: ", course, selectedProgramme)
            window.scrollTo(0, 0);
            return;
        }

        // setLoading(true)

        CourseService.createCourse(course_).then((response) => {
            setLoading(true)
            setTimeout(() => {
                basicNonStickyNotificationToggle();
                console.log("Course: ", response);
                setLoading(false)
            }, 1000)
        }).catch((res) => {
            console.log("Error: ", res);
            window.scrollTo(0, 0);

            if (res.response.status === 400) {
                console.log("status: ", res.response.status);

                let msg = "Error: " + res.response.data.toString();

                setError(msg);

                console.log("SET ERROR: ", error)
            } else {
                console.log("status 2: ", res?.response?.status);

                setError("Server Error!");
            }
        })
    }

    useEffect(() => {
        // fetch all grades
        const fetchGrades = async () => {
            GradeService.getAllGrades().then((response) => {
                console.log("Grades: ", response);
                setGrades(response)
            })
        }
        fetchGrades()

        // fetch all programmes
        const fetchProgrammes = async () => {
            ProgrammeService.getAllProgrammes().then((response) => {
                console.log("Programmes: ", response);
                setProgrammes(response);
                setSelectedProgramme(response[0].id.toString())
            })
        }
        fetchProgrammes()

    }, [])

    useEffect(() => {
        console.log("selectedClasses: ", selectedClasses)
    }, [selectedClasses])

    useEffect(() => {
        console.log("selectedProgramme: ", selectedProgramme)
    }, [selectedProgramme])


    return (
        loading ? <Loader /> :
            <div>
                <div className="flex items-center mt-8 intro-y">
                    <h2 className="mr-auto text-lg font-medium">Courses</h2>
                </div>
                {/* BEGIN: Programme Table Layout */}
                <div className="grid grid-cols-12 gap-6 mt-5">
                    <div className="col-span-12 intro-y lg:col-span-6">

                        <div className="p-5 intro-y box">
                            {/* BEGIN: Error Msg */}
                            {error && (
                                <div className="intro-x my-3">
                                    <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                                        {error}
                                    </div>
                                </div>
                            )}
                            {/* END: Error Msg */}
                            <div>
                                <FormLabel htmlFor="crud-form-1">Course Name</FormLabel>
                                <FormInput
                                    id="crud-form-1"
                                    type="text"
                                    className="w-full"
                                    placeholder="Input text"
                                    value={course.name}
                                    name='name'
                                    onChange={handleChangeName}
                                />
                            </div>
                            <div className="mt-3">
                                <FormLabel htmlFor="crud-form-2">Programme</FormLabel>
                                <TomSelect
                                    value={selectedProgramme}
                                    onChange={setSelectedProgramme}
                                    options={{
                                        placeholder: "Quick search a Programme",
                                    }}
                                    className="w-full"
                                >
                                    {
                                        programmes?.map((programme, index) => (
                                            <option key={programme['name'] + "#" + index} value={programme['id']}>{programme['name']}</option>
                                        ))
                                    }
                                </TomSelect>
                            </div>
                            <div>
                                <label>Class</label>
                                <div className="mt-2">
                                    <TomSelect value={selectedClasses} onChange={setSelectedClasses} multiple options={{
                                        placeholder: "Select Classes",
                                    }} className="w-full">
                                        {grades.length > 0 ?
                                            grades?.map((grade, index) => (
                                                <option key={grade['name'] + "#" + index} value={grade['id']}>{grade['name']}</option>
                                            )) : (
                                                <option value="0">No Classes</option>
                                            )}
                                    </TomSelect>
                                </div>
                                <div className="mt-3">
                                    <label>Description</label>
                                    <div id="courseEditor" className="mt-2">
                                        <ClassicEditor
                                            value={editorData}
                                            onChange={setEditorData}
                                            config={editorConfig}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-right">
                                    <Button onClick={(e: React.MouseEvent) => saveCourse(e)} type="button" variant="primary" className="w-24">
                                        Save
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* END: Programme Table Layout */}

                {/* BEGIN: Basic Non Sticky Notification Content */}
                <Notification getRef={(el) => {
                    basicNonStickyNotification.current = el;
                }}
                    options={{
                        duration: 3000,
                    }}
                    className="flex flex-col sm:flex-row"
                >
                    <div className="font-medium">
                        Yay! Course Added!
                    </div>
                    <a className="mt-1 font-medium text-primary dark:text-slate-400 sm:mt-0 sm:ml-40" href="/portal/courses">
                        Review Changes
                    </a>
                </Notification>
                {/* END: Basic Non Sticky Notification Content */}
            </div>
    )
}

export default index