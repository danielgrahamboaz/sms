import { Menu, Popover } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import Table from "../../../base-components/Table";
import Lucide from "../../../base-components/Lucide";
import ProgrammeService from "../../../services/ProgrammeService";
import { useEffect, useState } from "react";
import { FormCheck, FormInput, FormSelect } from "../../../base-components/Form";
import { Programme } from "../../../types/entities";
import { Level } from "../../../types/enums";


const index = () => {
    const [programmes, setProgrammes] = useState<Programme[]>([]);
    const [programme, setProgramme] = useState({
        name: "",
        level: "",
    });
    const [programme_, setProgramme_] = useState({
        name: "",
        level: "",
    });
    const [level, setLevel] = useState("");
    const [levelU, setLevelU] = useState("");
    const [error, setError] = useState("");

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState<number[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgramme({ ...programme, [e.target.name]: e.target.value });
    };

    const handleChange_ = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgramme_({ ...programme_, [e.target.name]: e.target.value });
    };

    const handleSelect = (e: any) => {
        setLevel(e.target.value);
        setProgramme({ ...programme, level: e.target.value });
        console.log("selected level", level)
    }

    const handleSelectU_ = (e: any) => {
        setLevelU(e.target.value);
        setProgramme_({ ...programme_, level: e.target.value });
        console.log("selected levelU_", levelU)
    }

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(programmes?.map((item: Programme) => item?.id));
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

    const fetchProgrammes = () => {
        ProgrammeService.getAllProgrammes().then((response) => {
            console.log("programmes: ", response);
            setProgrammes(response);
        });
    }

    const saveProgramme = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!programme.name || programme.level === '') {
            setError("Please fill in all fields")
            return;
        }

        console.log(programme, level);

        ProgrammeService.createProgramme(programme).then((res) => {
            setError("")
            console.log(res);
            fetchProgrammes()
        }).catch((res) => {
            console.log("error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })

    };

    const updateProgramme = async (id: any) => {
        if (!programme_.name || programme_.level === '') {
            setError("Please fill in all fields")
            return;
        }

        ProgrammeService.updateProgramme(id, programme_).then((response) => {
            setError("")
            console.log("Programme updated: ", response);
            fetchProgrammes()
        }).catch((res) => {
            console.log("update error: ", res);

            if (res.response.status === 401 || res.response.status === 400) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        })
    }

    const deleteProgramme = async (id: any) => {
        ProgrammeService.deleteProgramme(id).then((response) => {
            setError("")
            console.log("Programme deleted: ", response);
            fetchProgrammes()
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
            deleteProgramme(id)
        })
        setError("")
    }

    useEffect(() => {
        fetchProgrammes();
    }, []);

    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Programmes</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Popover className="inline-block">
                        {({ close }) => (
                            <>
                                <Popover.Button as={Button} variant="primary">
                                    Add A Programme
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
                                                placeholder="New Programme"
                                                name="name"
                                                value={programme.name}
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
                                                onClick={(e: React.MouseEvent) => saveProgramme(e)}
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
                                <Lucide icon="BookmarkPlus" className="w-4 h-4 mr-2" /> New Class
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
            {/* BEGIN: Programme Table Layout */}
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
                            {
                                programmes?.length > 0 ?
                                    programmes.map((programme, index) => (
                                        <Table.Tr key={programme.id}>
                                            <Table.Td>
                                                <span>{index + 1}</span>
                                            </Table.Td>
                                            <Table.Td>
                                                <span>{programme.name}</span>
                                            </Table.Td>
                                            <Table.Td>
                                                <span>{programme?.level === "ELEMENTARY" && Level.ELEMENTARY || programme?.level === "HIGH_SCHOOL" && Level.HIGH_SCHOOL}</span>
                                            </Table.Td>
                                            <Table.Td>

                                                <div className="flex items-center">
                                                    <FormCheck.Input
                                                        id={programme?.id.toString()}
                                                        type="checkbox"
                                                        className="mr-2 border border-gray-500"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClick(e)}
                                                        checked={isCheck.includes(programme?.id)}
                                                    />

                                                    <Popover className="inline-block">
                                                        {({ close }) => (
                                                            <>
                                                                <Popover.Button as={Button} onClick={() => {
                                                                    setError("")
                                                                    setLevelU(programme?.level);
                                                                    setProgramme_({ ...programme_, name: programme?.name, level: programme?.level });
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
                                                                                placeholder="Science"
                                                                                name="name"
                                                                                value={programme_.name}
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
                                                                                onClick={() => updateProgramme(programme.id)}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </>
                                                        )}
                                                    </Popover>

                                                    <button className="flex items-center ml-3 text-danger" onClick={() => deleteProgramme(programme.id)}>
                                                        <Lucide icon="Trash2" className="w-4 h-4 mr-2" /> Delete
                                                    </button>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    )) : <Table.Tr>
                                        <Table.Td colSpan={4}>
                                            <div className="flex items-center justify-center">
                                                <div className="text-center">
                                                    <Lucide icon="BookOpen" className="w-16 h-16 text-theme-1 mx-auto mt-3" />
                                                    <div className="text-gray-600 mt-2">No programmes found</div>
                                                </div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                            }

                        </Table.Tbody>
                    </Table>
                </div>
            </div>
            {/* END: Programme Table Layout */}
        </div>
    )
}

export default index