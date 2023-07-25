import React, { useEffect, useState } from 'react'
import Table from '../../../base-components/Table'
import { FormCheck } from '../../../base-components/Form'
import { Menu } from '../../../base-components/Headless'
import Lucide from '../../../base-components/Lucide'
import { Teacher } from '../../../types/entities'
import TeacherService from '../../../services/TeacherService'
import { useNavigate } from 'react-router-dom'
import Button from '../../../base-components/Button'

const index = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([])

    const navigate = useNavigate();

    const fetchTeachers = async () => {
        TeacherService.getTeachers().then((res) => {
            console.log("teachers reponse: ", res)
            setTeachers(res.data)
        }).catch((error) => {
            console.log("teacher fetching error: ", error)
        })
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Teachers</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Button onClick={() => navigate('/portal/teachers/add')} variant="primary" className="mr-2 shadow-md">
                        Add New Teacher
                    </Button>
                </div>
            </div>
            {/* BEGIN: Teacher Layout */}
            <div className="p-5 mt-5 intro-y box">
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="whitespace-nowrap">#</Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Full Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Email
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Address
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Phone Number
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Course Name
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {
                                teachers?.map((teacher, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td><span className='text-primary hover:underline hover:cursor-pointer'>{teacher?.firstName + " " + teacher?.lastName}</span></Table.Td>
                                        <Table.Td><a className='hover:text-primary hover:font-bold' href={`mailto:${teacher?.email}`}>{teacher?.email}</a></Table.Td>
                                        <Table.Td>{teacher?.address}</Table.Td>
                                        <Table.Td>{teacher?.phoneNumber}</Table.Td>
                                        <Table.Td>{teacher?.course?.name}</Table.Td>
                                    </Table.Tr>
                                ))
                            }
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
            {/* END: Teacher Layout */}
        </div>
    )
}

export default index