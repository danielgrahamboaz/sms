import _ from "lodash";
import fakerData from "../../../utils/faker";
import Button from "../../../base-components/Button";
import Pagination from "../../../base-components/Pagination";
import {
    FormCheck,
    FormInput,
    FormLabel,
    FormSelect,
} from "../../../base-components/Form";
import Lucide from "../../../base-components/Lucide";
import { Menu } from "../../../base-components/Headless";
import FileIcon from "../../../base-components/FileIcon";
import { useNavigate } from "react-router-dom";
import CourseFilesService from "../../../services/CourseFilesService";
import { useEffect, useState } from "react";
import pdfIcon from "../../../assets/images/pdf-file.png";
import wordIcon from "../../../assets/images/word-file.png";
import { formatBytes } from "../../../utils/sizeformat";
import { useAuth } from "../../../contexts/AuthContext";

const index = () => {
    const [programmeFiles, setProgrammeFiles] = useState([]);

    const navigate = useNavigate()
    const { user } = useAuth()

    const fetchtProgrammeCourseFiles = () => {
        CourseFilesService.getFilesByCourseId(user.programme.id).then((res) => {
            console.log("All Student files: ", res)
            setProgrammeFiles(res.data)
        }).catch((err) => {
            console.log("error fetching files: ", err)
        })
    }

    useEffect(() => {
        fetchtProgrammeCourseFiles()

        console.log("current user: ", user)
    }, [])

    return (
        <div className="grid grid-cols-12 gap-6 mt-8">
            <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
                <h2 className="mt-2 mr-auto text-lg font-medium intro-y">
                    File Manager
                </h2>
                {/* BEGIN: File Manager Menu */}
                <div className="p-5 mt-6 intro-y box sticky left-0 top-0">
                    <div className="mt-1">
                        <a
                            href=""
                            className="flex items-center px-3 py-2 font-medium text-white rounded-md bg-primary"
                        >
                            <Lucide icon="Image" className="w-4 h-4 mr-2" /> Assignments
                        </a>
                        <a
                            href=""
                            className="flex items-center px-3 py-2 mt-2 rounded-md"
                        >
                            <Lucide icon="File" className="w-4 h-4 mr-2" /> Course Outlines
                        </a>


                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-darkmode-400">
                        <a href="" className="flex items-center px-3 py-2 rounded-md">
                            <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                            Course Outlines
                        </a>
                        <a
                            href=""
                            className="flex items-center px-3 py-2 mt-2 rounded-md"
                        >
                            <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                            Past Questions
                        </a>
                        <a
                            href=""
                            className="flex items-center px-3 py-2 mt-2 rounded-md"
                        >
                            <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                            Tutorials
                        </a>
                        <a
                            href=""
                            className="flex items-center px-3 py-2 mt-2 rounded-md"
                        >
                            <div className="w-2 h-2 mr-3 rounded-full bg-danger"></div>
                            Timetable
                        </a>

                    </div>
                </div>
                {/* END: File Manager Menu */}
            </div>
            <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
                {/* BEGIN: File Manager Filter */}
                <div className="flex flex-col-reverse items-center intro-y sm:flex-row">
                    <div className="relative w-full mt-3 mr-auto sm:w-auto sm:mt-0">
                        <Lucide
                            icon="Search"
                            className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-500"
                        />
                        <FormInput
                            type="text"
                            className="w-full px-10 sm:w-64 !box"
                            placeholder="Search files"
                        />
                        <Menu className="absolute inset-y-0 right-0 flex items-center mr-3">
                            <Menu.Button
                                as="a"
                                role="button"
                                className="block w-4 h-4"
                                href="#"
                            >
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 cursor-pointer text-slate-500"
                                />
                            </Menu.Button>
                            <Menu.Items
                                placement="bottom-start"
                                className="pt-2 w-[478px] -ml-[228px] -mt-0.5"
                            >
                                <div className="grid grid-cols-12 gap-4 p-3 gap-y-3">
                                    <div className="col-span-6">
                                        <FormLabel htmlFor="input-filter-1" className="text-xs">
                                            File Name
                                        </FormLabel>
                                        <FormInput
                                            id="input-filter-1"
                                            type="text"
                                            className="flex-1"
                                            placeholder="Type the file name"
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <FormLabel htmlFor="input-filter-4" className="text-xs">
                                            Class
                                        </FormLabel>
                                        <FormSelect id="input-filter-4" className="flex-1">
                                            <option>10</option>
                                            <option>25</option>
                                            <option>35</option>
                                            <option>50</option>
                                        </FormSelect>
                                    </div>
                                    <div className="flex items-center col-span-12 mt-3">
                                        <Button variant="secondary" className="w-32 ml-auto">
                                            Create Filter
                                        </Button>
                                        <Button variant="primary" className="w-32 ml-2">
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <div className="flex w-full sm:w-auto">
                        <Button variant="primary" className="mr-2 shadow-md" onClick={() => navigate("/student/files/upload")}>
                            Upload New Files
                        </Button>

                    </div>
                </div>
                {/* END: File Manager Filter */}
                {/* BEGIN: Directory & Files */}
                <div className="grid grid-cols-12 gap-3 mt-5 intro-y sm:gap-6">
                    {programmeFiles.length > 0 ?
                        programmeFiles.map((file: any, index) => (
                            <div
                                key={file?.name + "#" + index}
                                className="col-span-6 intro-y sm:col-span-4 md:col-span-3 2xl:col-span-2"
                            >
                                <div className="relative px-3 pt-8 pb-5 rounded-md file box sm:px-5 zoom-in">
                                    <div className="absolute top-0 left-0 mt-3 ml-3">
                                        <FormCheck.Input
                                            className="border"
                                            type="checkbox"
                                            checked={false}
                                            onChange={() => { }}
                                        />
                                    </div>
                                    {(() => {
                                        console.log("file?.fileType: ", file?.fileType);
                                        if (file?.fileType == "Empty Folder")
                                            return (
                                                <FileIcon
                                                    className="w-3/5 mx-auto"
                                                    variant="empty-directory"
                                                />
                                            );
                                        else if (file.fileType.includes("document")) {
                                            console.log("considering documents")
                                            return (
                                                <FileIcon
                                                    className="w-3/5 mx-auto"
                                                    variant="image"
                                                    src={wordIcon}
                                                />
                                            );
                                        }
                                        else if (file.fileType.includes("pdf")) {
                                            console.log("considering pdf")
                                            return (
                                                <FileIcon
                                                    className="w-3/5 mx-auto"
                                                    variant="image"
                                                    src={pdfIcon}
                                                />
                                            );
                                        }
                                        else if (file.fileType.includes("jpeg") || file.fileType.includes("png") || file.fileType.includes("jpg")) {
                                            console.log("considering images")
                                            return (
                                                <FileIcon
                                                    className="w-3/5 mx-auto"
                                                    variant="image"
                                                    src={file.path}
                                                />
                                            );
                                        }

                                        else {
                                            console.log("considering others")
                                            return (
                                                <FileIcon
                                                    className="w-3/5 mx-auto"
                                                    variant="directory"
                                                    type={file.fileType}
                                                />
                                            );
                                        }
                                    })()}
                                    <a
                                        href={file.path}
                                        className="block mt-4 font-medium text-center truncate hover:text-primary"
                                        target="_blank"
                                    >
                                        {
                                            file.name.split("/")[file.name.split("/").length - 1]
                                        }
                                    </a>
                                    <div className="text-slate-500 text-xs text-center mt-0.5">
                                        {formatBytes(file.size)}
                                    </div>
                                    <Menu className="absolute top-0 right-0 mt-3 ml-auto mr-2">
                                        <Menu.Button as="a" className="block w-5 h-5" href="#">
                                            <Lucide
                                                icon="MoreVertical"
                                                className="w-5 h-5 text-slate-500"
                                            />
                                        </Menu.Button>
                                        <Menu.Items className="w-40">
                                            <Menu.Item>
                                                <Lucide icon="Users" className="w-4 h-4 mr-2" /> Share
                                                File
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            </div>
                        )) :
                        <div className="col-span-12 h-80 flex justify-center items-center">
                            <div>
                                <Lucide icon="FileX" className="w-16 h-16 mx-auto text-gray-500" />
                                <p className="mt-3 font-light text-gray-500">No Program File uploaded yet!</p>
                            </div>
                        </div>
                    }
                </div>
                {/* END: Directory & Files */}
                {/* BEGIN: Pagination */}
                {programmeFiles.length > 0 &&
                    <div className="flex flex-wrap items-center mt-6 intro-y sm:flex-row sm:flex-nowrap">
                        <Pagination className="w-full sm:w-auto sm:mr-auto">
                            <Pagination.Link>
                                <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link>
                                <Lucide icon="ChevronLeft" className="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link>...</Pagination.Link>
                            <Pagination.Link>1</Pagination.Link>
                            <Pagination.Link active>2</Pagination.Link>
                            <Pagination.Link>3</Pagination.Link>
                            <Pagination.Link>...</Pagination.Link>
                            <Pagination.Link>
                                <Lucide icon="ChevronRight" className="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link>
                                <Lucide icon="ChevronsRight" className="w-4 h-4" />
                            </Pagination.Link>
                        </Pagination>
                        <FormSelect className="w-20 mt-3 !box sm:mt-0">
                            <option>10</option>
                            <option>25</option>
                            <option>35</option>
                            <option>50</option>
                        </FormSelect>
                    </div>
                }
                {/* END: Pagination */}
            </div>
        </div>
    )
}

export default index