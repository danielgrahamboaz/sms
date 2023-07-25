import { Menu, Popover } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import Table from "../../../base-components/Table";
import Lucide from "../../../base-components/Lucide";
import { FormCheck, FormInput, FormSelect } from "../../../base-components/Form";
import React, { useEffect, useState } from "react";
import GradeService from "../../../services/GradeService";
import { GradeU, Level } from "../../../types/enums";

const index = () => {
    const [grades, setGrades] = useState<any>([])
    const [gradeU, setGradeU] = useState({
        name: "",
        level: "",
    });
    const [gradeU_, setGradeU_] = useState({
        name: "",
        level: "",
    });
    const [level, setLevel] = useState("");
    const [levelU, setLevelU] = useState("");
    const [error, setError] = useState("");

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState<number[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGradeU({ ...gradeU, [e.target.name]: e.target.value });
    };

    const handleChange_ = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGradeU_({ ...gradeU_, [e.target.name]: e.target.value });
    };

    const handleSelect = (e: any) => {
        setLevel(e.target.value);
        setGradeU({ ...gradeU, level: e.target.value });
        console.log("selected level", level)
    }

    const handleSelectU = (e: any) => {
        setLevelU(e.target.value);
        setGradeU({ ...gradeU, level: e.target.value });
        console.log("selected levelU", levelU)
    }

    const handleSelectU_ = (e: any) => {
        setLevelU(e.target.value);
        setGradeU_({ ...gradeU_, level: e.target.value });
        console.log("selected levelU_", levelU)
    }

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(grades?.map((item: GradeU) => item?.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, parseInt(id)]);
        console.log("isCheck", e.target.id, e.target.checked)
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== parseInt(id)));
        }
    };

    const saveGrade = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!gradeU.name || gradeU.level === '') {
            setError("Please fill in all fields")
            return;
        }

        console.log(gradeU, level);

        GradeService.createGrade(gradeU).then((res) => {
            setError("")
            console.log(res);
            fetchGrades()
        }).catch((res) => {
            console.log("error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })

    };

    const fetchGrades = async () => {
        GradeService.getAllGrades().then((response) => {
            setError("")
            console.log("Grades: ", response);
            setGrades(response)
        }).catch((res) => {
            console.log("error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })
    }

    const updateGrade = async (id: any) => {
        if (!gradeU_.name || gradeU_.level === '') {
            setError("Please fill in all fields")
            return;
        }

        GradeService.updateGrade(id, gradeU_).then((response) => {
            setError("")
            console.log("Grade updated: ", response);
            fetchGrades()
        }).catch((res) => {
            console.log("update error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })
    }

    const deleteGrade = async (id: any) => {
        GradeService.deleteGrade(id).then((response) => {
            setError("")
            console.log("Grade deleted: ", response);
            fetchGrades()
        }).catch((res) => {
            console.log("delete error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })
    }

    const bulkDelete = async () => {
        if (isCheck.length === 0) {
            setError("Please select a class to delete")
            console.log("Please select a class to delete")
            return;
        }

        isCheck.forEach((id) => {
            deleteGrade(id)
        })
        setError("")
    }

    useEffect(() => {
        fetchGrades()
    }, [])


    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Classes</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Popover className="inline-block">
                        {({ close }) => (
                            <>
                                <Popover.Button as={Button} variant="primary">
                                    Add A Class
                                </Popover.Button>
                                <Popover.Panel placement="bottom-end">
                                    {/* BEGIN: Error Msg */}
                                    {error && (
                                        <div className="intro-x mt-5">
                                            <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                                                {error}
                                            </div>
                                        </div>
                                    )}
                                    {/* END: Error Msg */}
                                    <div className="p-2">
                                        <div>
                                            <div className="text-xs text-left">Name</div>
                                            <FormInput
                                                type="text"
                                                className="flex-1 mt-2"
                                                placeholder="Class 2"
                                                name="name"
                                                value={gradeU.name}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <div className="text-xs text-left">Level</div>
                                            <FormSelect className="mt-2 sm:mr-2" name='level' value={level} aria-label="Select Your Role" onChange={(e) => handleSelect(e)}>
                                                <option value={""}>Select a level</option>
                                                <option value={"ELEMENTARY"}>Elementary</option>
                                                <option value={"HIGH_SCHOOL"}>Secondary</option>
                                            </FormSelect>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    close();
                                                }}
                                                className="w-32 ml-auto"
                                            >
                                                Close
                                            </Button>
                                            <Button
                                                variant="primary"
                                                className="w-32 ml-2"
                                                onClick={(e: React.MouseEvent) => saveGrade(e)}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </>
                        )}
                    </Popover>
                    <Menu className="ml-auto sm:ml-0">
                        <Menu.Button as={Button} className="px-2 font-normal !box">
                            <span className="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Plus" className="w-4 h-4" />
                            </span>
                        </Menu.Button>
                        <Menu.Items className="w-40">
                            <Menu.Item>
                                <Lucide icon="BookOpen" className="w-4 h-4 mr-2" /> New Course
                            </Menu.Item>
                            <Menu.Item>
                                <Lucide icon="BookmarkPlus" className="w-4 h-4 mr-2" /> New Programme
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
            {/* BEGIN: Grades Table Layout */}
            <div className="p-5 mt-5 intro-y box">
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="whitespace-nowrap">#</Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Name
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap">
                                    Level
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap flex items-center">
                                    <FormCheck.Input
                                        id="select-all"
                                        type="checkbox"
                                        className="mr-2 border border-gray-500"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectAll(e)}
                                        checked={isCheckAll}
                                    />
                                    <Menu>
                                        <Menu.Button as={'div'} className="flex items-center ml-3">
                                            <span>Bulk Actions</span>
                                            <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                                        </Menu.Button>
                                        <Menu.Items className="w-48" placement="bottom-start">

                                            <Menu.Item onClick={() => bulkDelete()}>
                                                <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                                                Delete Selected Items
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {grades.length > 0 ?
                                grades?.map((grade: any, index: number) => (
                                    <Table.Tr key={grade?.name + "#" + grade?.id}>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td>{grade?.name}</Table.Td>
                                        <Table.Td>{grade?.level === "ELEMENTARY" && Level.ELEMENTARY || grade?.level === "HIGH_SCHOOL" && Level.HIGH_SCHOOL}</Table.Td>
                                        <Table.Td>
                                            <div className="flex items-center">
                                                <FormCheck.Input
                                                    id={grade?.id}
                                                    type="checkbox"
                                                    className="mr-2 border border-gray-500"
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClick(e)}
                                                    checked={isCheck.includes(parseInt(grade?.id))}
                                                />

                                                <Popover className="inline-block">
                                                    {({ close }) => (
                                                        <>
                                                            <Popover.Button as={Button} onClick={() => {
                                                                setError("")
                                                                setLevelU(grade?.level);
                                                                setGradeU_({ ...gradeU_, name: grade?.name, level: grade?.level });
                                                            }} className="flex items-center border-0 shadow-none">
                                                                <Lucide icon="FileEdit" className="w-4 h-4 mr-2" /> Edit
                                                            </Popover.Button>
                                                            <Popover.Panel className="absolute z-100" placement={index >= 5 ? 'top-start' : 'top-start'}>
                                                                {/* BEGIN: Error Msg */}
                                                                {error && (
                                                                    <div className="intro-x mt-5">
                                                                        <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                                                                            {error}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {/* END: Error Msg */}
                                                                <div className="p-2">
                                                                    <div>
                                                                        <div className="text-xs text-left">Name</div>
                                                                        <FormInput
                                                                            type="text"
                                                                            className="flex-1 mt-2"
                                                                            placeholder="Class 2"
                                                                            name="name"
                                                                            value={gradeU_.name}
                                                                            onChange={(e) => handleChange_(e)}
                                                                        />
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <div className="text-xs text-left">Level</div>
                                                                        <FormSelect className="mt-2 sm:mr-2" name='levelU' value={levelU} aria-label="Select Your Role"
                                                                            onChange={(e) => handleSelectU_(e)}>
                                                                            <option value={""}>Select a level</option>
                                                                            <option value={"ELEMENTARY"}>Elementary</option>
                                                                            <option value={"HIGH_SCHOOL"}>Secondary</option>
                                                                        </FormSelect>
                                                                    </div>
                                                                    <div className="flex items-center mt-3">
                                                                        <Button
                                                                            variant="secondary"
                                                                            onClick={() => {
                                                                                close();
                                                                            }}
                                                                            className="w-32 ml-auto"
                                                                        >
                                                                            Close
                                                                        </Button>
                                                                        <Button
                                                                            variant="primary"
                                                                            className="w-32 ml-2"
                                                                            onClick={() => updateGrade(grade.id)}
                                                                        >
                                                                            Save
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </>
                                                    )}
                                                </Popover>

                                                <button className="flex items-center ml-3 text-danger" onClick={() => deleteGrade(grade.id)}>
                                                    <Lucide icon="Trash2" className="w-4 h-4 mr-2" /> Delete
                                                </button>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                )) :
                                <Table.Tr>
                                    <Table.Td colSpan={4} className="text-center">No data found</Table.Td>
                                </Table.Tr>
                            }
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
            {/* END: Grades Table Layout */}
        </div>
    )
}

export default index;