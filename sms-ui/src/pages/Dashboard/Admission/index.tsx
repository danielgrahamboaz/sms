import React, { useEffect, useState } from 'react'
import Lucide from '../../../base-components/Lucide'
import { useNavigate } from 'react-router-dom'
import Button from "../../../base-components/Button";
import { Dialog, Menu } from "../../../base-components/Headless";
import Table from "../../../base-components/Table";
import AdmissionService from '../../../services/AdmissionService';
import { Level } from '../../../types/enums';

const index = () => {
    const [admissions, setAdmissions] = useState<any>([])
    const [error, setError] = useState("")
    const [admitted, setAdmitted] = useState(false)

    const navigate = useNavigate()

    const fetchAdmissions = async () => {
        AdmissionService.getAdmissions().then((response) => {
            setError("")
            console.log("Admissions: ", response.data);
            setAdmissions(response.data)
        }).catch((res) => {
            console.log("error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })
    }

    const approveAdmission = (id: number, status: boolean) => {
        let approvalObject = { admission_id: id, admissionStatus: true }

        AdmissionService.approveAdmission(approvalObject).then((response) => {
            console.log("response: ", response)
            fetchAdmissions()
        }).catch(error => {
            console.log("approve admission error: ", error)
        })
    }

    useEffect(() => {
        fetchAdmissions()
    }, [])

    return (
        <div>
            <div className="flex items-center intro-y mt-8 mb-3">
                <h2 className="mr-auto text-lg font-medium">Admissions</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Button onClick={() => navigate('/portal/admissions/add')} variant="primary" className="mr-2 shadow-md">
                        Admit A Student
                    </Button>
                </div>
            </div>

            {/* BEGIN: Courses Table Layout */}
            <div className="p-5 mt-5 intro-y box">
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="whitespace-nowrap">#</Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Form Number
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Student Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Parent Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Level
                                </Table.Th>
                                <Table.Th className='whitespace-nowrap'>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {admissions?.length > 0 ?
                                admissions?.map((admission: any, index: number) => (
                                    <Table.Tr key={index}>
                                        <Table.Td className="border-b">
                                            <div className="flex items-center">
                                                <div className="font-normal text-theme-1">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="border-b">
                                            <a href="" className="font-normal text-primary hover:underline whitespace-nowrap">
                                                {admission.formNumber}
                                            </a>
                                        </Table.Td>
                                        <Table.Td className="border-b">
                                            <div className="font-normal whitespace-nowrap">
                                                {admission.student.firstName + " " + admission.student.lastName}
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="border-b">
                                            <div className="font-normal whitespace-nowrap">
                                                {admission.parent.firstName + " " + admission.parent.lastName}
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="border-b">
                                            <div className="font-normal whitespace-nowrap">
                                                <span>{admission?.level === "ELEMENTARY" && Level.ELEMENTARY || admission?.level === "HIGH_SCHOOL" && Level.HIGH_SCHOOL}</span>
                                            </div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div className="font-normal whitespace-nowrap">
                                                {
                                                    admission?.admissionStatus ? <button className='bg-primary/20 text-white font-normal py-1 rounded shadow px-3'>Admitted</button> :
                                                        <button className='bg-primary text-white font-normal px-4 py-1 rounded hover:bg-primary/80 shadow' onClick={() => approveAdmission(admission.id, admission.admissionStatus)}>Admit</button>
                                                }
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                )) : (
                                    <Table.Tr>
                                        <Table.Td colSpan={5} className="text-center">No Admissions Yet</Table.Td>
                                    </Table.Tr>
                                )}
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default index