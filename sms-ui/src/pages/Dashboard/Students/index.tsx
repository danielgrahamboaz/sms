import _ from "lodash";
import fakerData from "../../../utils/faker";
import Button from "../../../base-components/Button";
import Pagination from "../../../base-components/Pagination";
import { FormInput, FormSelect } from "../../../base-components/Form";
import Lucide from "../../../base-components/Lucide";
import { Menu } from "../../../base-components/Headless";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import profileImg from "../../../assets/images/placeholders/blank-profile.png"
import AdmissionService from "../../../services/AdmissionService";

const index = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<any>({} as any)

  const navigate = useNavigate()

  const fetchAdmittedStudents = () => {
    AdmissionService.getAdmittedStudents().then((response) => {
      console.log("response: ", response)
      setStudents(response.data)
    }).catch(error => {
      console.log("fetch admitted error: ", error)
    })
  }

  useEffect(() => {
    fetchAdmittedStudents()

  }, [])

  useEffect(() => {
    console.log("searchTerm: ", searchTerm);
  }, [searchTerm])

  return (
    <div>
      <h2 className="mt-10 text-lg font-medium intro-y">Admitted Students</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md" onClick={() => navigate("/portal/admissions/add")}>
            Add New Student
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" /> Send
                Message
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Users Layout */}
        {students?.length > 0 ?
          students?.map((student: any) => (
            <div key={student.student.id} className="col-span-12 intro-y md:col-span-6">
              <div className="box">
                <div className="flex flex-col items-center p-5 lg:flex-row">
                  <div className="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                    <img
                      alt="Profile picture"
                      className="rounded-full"
                      src={profileImg}
                    />
                  </div>
                  <div className="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
                    <a href="" className="font-medium">
                      {student.student.firstName + " " + student.student.lastName}
                    </a>
                    <div className="text-slate-500 text-xs mt-0.5">
                      {student.student.grade.name}
                    </div>
                  </div>
                  <div className="flex mt-4 lg:mt-0">
                    <Button variant="primary" className="px-3 py-1 mr-2">
                      <Lucide icon="Phone" className="w-4 h-4 mr-1" />
                      <span>Call</span>
                    </Button>
                    <Button variant="outline-primary" className="px-2 py-1">
                      Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )) :
          <div className="col-span-12 intro-y md:col-span-6">
            <p>No Student Found</p>
          </div>
        }
        {/* BEGIN: Users Layout */}
        {/* END: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
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
        {/* END: Pagination */}
      </div>
    </div>
  )
}

export default index;
