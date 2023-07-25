import clsx from "clsx";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { useEffect, useState } from "react";
import CourseService from "../../services/CourseService";
import TeacherService from "../../services/TeacherService";
import AdmissionService from "../../services/AdmissionService";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [coursesCount, setCoursesCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [admissionsCount, setAdmissionsCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard";

    CourseService.getAllCourses().then((res) => {
      console.log("courses reponse: ", res);
      setCoursesCount(res.length);
    }).catch((error) => {
      console.log("course fetching error: ", error);
    });


    TeacherService.getTeachers().then((res) => {
      console.log("teachers reponse: ", res.data);
      setTeachersCount(res.data.length);
    }).catch((error) => {
      console.log("teacher fetching error: ", error);
    })

    AdmissionService.getAdmissions().then((res) => {
      console.log("admissions reponse: ", res.data);
      setAdmissionsCount(res.data.length);
    }).catch((error) => {
      console.log("admission fetching error: ", error);
    })

  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                General Report
              </h2>
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y" onClick={() => navigate("/portal/students")}>
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="Users"
                        className="w-[28px] h-[28px] text-primary"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-primary py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="33% Higher than last month"
                        >
                          33%
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      0
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Students
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y" onClick={() => navigate("/portal/admissions")}>
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="FileSpreadsheet"
                        className="w-[28px] h-[28px] text-pending"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-warning py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="2% Lower than last month"
                        >
                          2%
                          <Lucide
                            icon="ChevronDown"
                            className="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {admissionsCount}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Pending Admissions
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y" onClick={() => navigate("/portal/teachers")}>
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="UserCheck"
                        className="w-[28px] h-[28px] text-info"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-info py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="12 teachers added recently"
                        >
                          +12{" "}
                          <Lucide icon="Check" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {teachersCount}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Teachers
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y" onClick={() => navigate("/portal/courses")}>
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="BookOpen"
                        className="w-[28px] h-[28px] text-success"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="2 Members joined lately"
                        >
                          +02{" "}
                          <Lucide icon="Check" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {coursesCount}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
        </div>
      </div>
    </div>
  );
}

export default Main;
