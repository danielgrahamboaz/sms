import React, { useEffect, useState } from 'react'
import { FormInput } from '../../../base-components/Form';
import Lucide from '../../../base-components/Lucide';
import Button from '../../../base-components/Button';
import { Menu } from '../../../base-components/Headless';
import Table from '../../../base-components/Table';
import CourseService from '../../../services/CourseService';
import { useAuth } from '../../../contexts/AuthContext';

const index = () => {
    const [courses, setCourses] = useState<any>([])
    const [deleteModalPreview, setDeleteModalPreview] = useState(false);

    const { user } = useAuth();

    const fetchCoursesByProgram = async () => {
        CourseService.getCoursesByProgrammeId(user.programme.id).then((response) => {
            console.log("Programme Courses: ", response);
            setCourses(response)
        })
    }

    // Print
    const onPrint = () => {
        // if (tabulator.current) {
        //     tabulator.current.print();
        // }
    };

    // Export
    const onExportCsv = () => {
        // if (tabulator.current) {
        //     tabulator.current.download("csv", "data.csv");
        // }
    };

    const onExportJson = () => {
        // if (tabulator.current) {
        //     tabulator.current.download("json", "data.json");
        // }
    };

    const onExportXlsx = () => {
        // if (tabulator.current) {
        //     (window as any).XLSX = xlsx;
        //     tabulator.current.download("xlsx", "data.xlsx", {
        //         sheetName: "Products",
        //     });
        // }
    };

    const onExportHtml = () => {
        // if (tabulator.current) {
        //     tabulator.current.download("html", "data.html", {
        //         style: true,
        //     });
        // }
    };

    useEffect(() => {

        fetchCoursesByProgram()
    }, [])

    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Courses</h2>
                <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                    <div className="relative w-56 text-slate-500">
                        <FormInput
                            type="text"
                            className="w-56 pr-10 !box"
                            placeholder="Search..."
                        />
                        <Lucide
                            icon="Search"
                            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                        />
                    </div>
                </div>
            </div>
            {/* BEGIN: Courses Table Layout */}
            <div className="p-5 mt-5 intro-y box">
                <div className="overflow-x-auto">
                    <div className="flex mt-5 sm:mt-0">
                        <Button
                            id="tabulator-print"
                            variant="outline-secondary"
                            className="w-1/2 mr-2 sm:w-auto"
                            onClick={onPrint}
                        >
                            <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                        </Button>
                        <Menu className="w-1/2 sm:w-auto">
                            <Menu.Button
                                as={Button}
                                className="w-full sm:w-auto"
                            >
                                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 ml-auto sm:ml-2"
                                />
                            </Menu.Button>
                            <Menu.Items className="w-40">
                                <Menu.Item onClick={onExportCsv}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export CSV
                                </Menu.Item>
                                <Menu.Item onClick={onExportJson}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                                    JSON
                                </Menu.Item>
                                <Menu.Item onClick={onExportXlsx}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                                    XLSX
                                </Menu.Item>
                                <Menu.Item onClick={onExportHtml}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                                    HTML
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="whitespace-nowrap">#</Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Description
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Programme
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {courses?.length > 0 ?
                                courses?.map((course: any, index: number) => (
                                    <Table.Tr key={course?.name + "#" + index}>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td><span className='hover:underline hover:font-medium text-primary cursor-pointer'>{course?.name}</span></Table.Td>
                                        <Table.Td> {course?.description}  </Table.Td>
                                        <Table.Td>{course?.programme.name}</Table.Td>

                                    </Table.Tr>
                                )) : <Table.Tr>
                                    <Table.Td colSpan={5} className="text-center">No Courses Found</Table.Td>
                                </Table.Tr>
                            }
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
            {/* END: Courses Table Layout */}
        </div>
    )
}

export default index;