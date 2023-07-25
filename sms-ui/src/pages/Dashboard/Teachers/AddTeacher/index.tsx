import React, { useEffect, useState, useRef } from 'react'
import { FormHelp, FormInput, FormLabel, FormSelect } from '../../../../base-components/Form'
import { Gender } from '../../../../types/enums'
import CourseService from '../../../../services/CourseService'
import Button from '../../../../base-components/Button'
import TeacherService from '../../../../services/TeacherService'
import Notification, { NotificationElement } from '../../../../base-components/Notification'
import { useLoading } from '../../../../contexts/LoadingContext'

const index = () => {
    // Basic non sticky notification
    const basicNonStickyNotification = useRef<NotificationElement>();
    const basicNonStickyNotificationToggle = () => {
        // Show notification
        basicNonStickyNotification.current?.showToast();
    };
    const [teacher, setTeacher] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        gender: '',
        course_id: 0,
    })
    const [courses, setCourses] = useState([])
    const [selectedGender, setSelectedGender] = useState('')
    const [selectedCourse, setSelectedCourse] = useState(0)
    const [error, setError] = useState('')

    const { setLoading2 } = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleSelectGender = (e: any) => {
        setSelectedGender(e.target.value)
        setTeacher({ ...teacher, gender: e.target.value });
        console.log("selected gender: ", e.target.value)
    }

    const handleSelectCourse = (e: any) => {
        setSelectedCourse(e.target.value)
        setTeacher({ ...teacher, course_id: e.target.value });
        console.log("selected course: ", e.target.value)
    }

    const fetchCourses = async () => {
        CourseService.getAllCourses().then((res) => {
            console.log("courses reponse: ", res)
            setCourses(res)
        }).catch((error) => {
            console.log("course fetching error: ", error)
        })
    }

    const saveTeacher = () => {

        let teacher_ = { ...teacher, gender: selectedGender, course_id: parseInt(selectedCourse.toString()) }
        console.log("teacher_: ", teacher_)

        if (teacher_.address === "" || teacher_.firstName === "" || teacher_.lastName === "" || teacher_.phoneNumber === "" || teacher_.course_id === 0 || teacher_.gender === "") {
            setError("Please fill all the fields")
            return;
        }

        setError("")
        console.log("teacher: ", teacher_)
        setLoading2(true)

        TeacherService.createTeacher(teacher_).then((res) => {
            console.log("teacher created: ", res)
            setTimeout(() => {
                setLoading2(false)
                basicNonStickyNotificationToggle()
            }, 1000);
        }).catch((error) => {
            setLoading2(false)
            console.log("teacher creation error: ", error)
        })
    }

    useEffect(() => {
        fetchCourses()

        setSelectedGender(Gender.Male)
        setTeacher({ ...teacher, gender: Gender.Male })
        console.log("teacher and gender: ", teacher, teacher.gender)

    }, [])

    useEffect(() => {
        console.log("selected course id: ", selectedCourse)
        setTeacher({ ...teacher, course_id: selectedCourse })
    }, [selectedCourse])

    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">New Teacher</h2>
            </div>
            {/* BEGIN: Teacher Layout */}
            <div className='p-8 intro-y box  mt-5'>
                {/* BEGIN: Error Msg */}
                {error && (
                    <div className="intro-x my-3">
                        <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                            {error}
                        </div>
                    </div>
                )}
                {/* END: Error Msg */}
                <div className=" grid grid-cols-2 gap-4 gap-y-5">
                    <div className='col-span-2 intro-y sm:col-span-1'>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <FormInput id="firstName" name='firstName' value={teacher?.firstName} onChange={e => handleChange(e)} type="text" placeholder="First Name" />
                    </div>
                    <div className="col-span-2 intro-y sm:col-span-1">
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <FormInput id="lastName" name='lastName' value={teacher?.lastName} onChange={e => handleChange(e)} type="text" placeholder="Last Name" />
                    </div>
                    <div className='col-span-2 intro-y sm:col-span-1'>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <FormInput id="email" name='email' type="email" value={teacher?.email} onChange={e => handleChange(e)} placeholder="E-mail" />
                    </div>

                    <div className="col-span-2 intro-y sm:col-span-1">
                        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                        <FormInput id="phoneNumber" name='phoneNumber' value={teacher?.phoneNumber} onChange={e => handleChange(e)} type="text" placeholder="+1 234 5678" />
                    </div>
                    <div className='col-span-2 intro-y sm:col-span-1'>
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <FormInput id="address" name='address' type="text" value={teacher?.address} onChange={e => handleChange(e)} placeholder="Address" />
                    </div>
                    <div className="col-span-2 intro-y sm:col-span-1">
                        <FormLabel htmlFor="input-wizard-6">Gender</FormLabel>
                        <FormSelect id="input-wizard-6" onChange={(e) => handleSelectGender(e)} name='gender' value={teacher?.gender}>
                            <option value={Gender.Male}>Male</option>
                            <option value={Gender.Female}>Female</option>
                        </FormSelect>
                    </div>
                    <div className="col-span-2 intro-y sm:col-span-1">
                        <FormLabel htmlFor="input-wizard-6">Course</FormLabel>
                        <FormSelect id="input-wizard-6" onChange={(e) => handleSelectCourse(e)} name='course' value={teacher?.course_id}>
                            <option value={0}>Select a course</option>
                            {courses?.length > 0 &&
                                courses?.map((course: any) => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))
                            }
                        </FormSelect>
                    </div>
                    <div className='col-span-2 intro-y sm:col-span-1'>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormInput id="password" name='password' type="text" value={teacher?.lastName} placeholder="" />
                    </div>
                </div>

                <div className='mt-5 text-right'>
                    <Button onClick={() => saveTeacher()} className='w-full sm:w-24' variant='primary'>Save</Button>
                </div>
            </div>

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
                    Teacher added successfully!
                </div>
                <a className="mt-1 font-medium text-primary dark:text-slate-400 sm:mt-0 sm:ml-40" href="/portal/teachers">
                    Review Changes
                </a>
            </Notification>
            {/* END: Basic Non Sticky Notification Content */}
        </div>
    )
}

export default index