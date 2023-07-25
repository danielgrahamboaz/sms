import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import ParentLayout from "../layouts/ParentLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import HomeLayout from "../layouts/HomeLayout";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Dashboard/Students";
import Admission from "../pages/Dashboard/Admission";
import Parent from "../pages/portal/Parent";
import StaffLogin from "../pages/portal/StaffLogin";
import Student from "../pages/portal/Student";
import Register from "../pages/portal/Register";
import Login from "../pages/portal/Login";
import Confirm from "../pages/portal/Register/confirm"
import Grades from "../pages/Dashboard/Grades";
import Courses from "../pages/Dashboard/Courses";
import AddCourse from "../pages/Dashboard/Courses/AddCourse";
import EditCourse from "../pages/Dashboard/Courses/EditCourse";
import Programmes from "../pages/Dashboard/Programmes";
import ErrorPage from "../pages/ErrorPage";
import Teachers from "../pages/Dashboard/Teachers";
import Home from "../pages/Home";
import TeacherDashboard from "../pages/TeacherDashboard";
import ParentDashboard from "../pages/ParentDashboard";
import StudentDashboard from "../pages/StudentDashboard"
import AdminProfile from "../pages/Dashboard/Profile"
import AddAdmission from "../pages/Dashboard/Admission/Add"
import AddTeacher from "../pages/Dashboard/Teachers/AddTeacher"
import TeacherProfile from "../pages/TeacherDashboard/Profile"
import ParentProfile from "../pages/ParentDashboard/Profile"
import StudentProfile from "../pages/StudentDashboard/Profile"
import TeacherCourse from "../pages/TeacherDashboard/Course"
import TeacherStudents from "../pages/TeacherDashboard/Students"
import TeacherFiles from "../pages/TeacherDashboard/FileSystem"
import TeacherFileUpload from "../pages/TeacherDashboard/FileSystem/UploadFile"
import StudentCourses from "../pages/StudentDashboard/Courses"
import StudentFiles from "../pages/StudentDashboard/FileSystem"
import StudentFilesUpload from "../pages/StudentDashboard/FileSystem/UploadFile"
import Chats from "../pages/Dashboard/Chat"
import TeacherChats from "../pages/TeacherDashboard/Chat"

function Router() {
  const routes = [
    // Dashboard Portal routes
    {
      path: "/portal/",
      element: <SideMenu />,
      children: [
        {
          path: "profile",
          element: <AdminProfile />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "students",
          element: <Students />,
        },
        {
          path: "admissions",
          element: <Admission />,
        },
        {
          path: "admissions/add",
          element: <AddAdmission />,
        },
        {
          path: "classes",
          element: <Grades />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "courses/add",
          name: "Add Course",
          element: <AddCourse />,
        },
        {
          path: "courses/edit/:id",
          name: "Edit Course",
          element: <EditCourse />,
        },
        {
          path: "programmes",
          element: <Programmes />,
        },
        {
          path: "chats",
          element: <Chats />,
        },
        {
          path: "teachers",
          children: [
            {
              path: "",
              element: <Teachers />,
            },
            {
              path: "add",
              element: <AddTeacher />,
            },
          ],
        },
        {
          path: "non-teaching-staff",
          element: <Teachers />,
        }
      ],
    },

    // Teacher Dashboard routes
    {
      path: "/teacher/",
      element: <TeacherLayout />,
      children: [
        {
          path: "dashboard",
          element: <TeacherDashboard />,
        },
        {
          path: "profile",
          element: <TeacherProfile />,
        },
        {
          path: "course",
          element: <TeacherCourse />,
        },
        {
          path: "students",
          element: <TeacherStudents />,
        },
        {
          path: "chats",
          element: <TeacherChats />,
        },
        {
          path: "files",
          children: [
            {
              path: "",
              element: <TeacherFiles />,
            },
            {
              path: "upload",
              element: <TeacherFileUpload />,
            }
          ]
        },

      ]
    },

    // Parent Dashboard routes
    {
      path: "/parent/",
      element: <ParentLayout />,
      children: [
        {
          path: "dashboard",
          element: <ParentDashboard />,
        },
        {
          path: "profile",
          element: <ParentProfile />,
        }
      ]
    },

    // Student Dashboard routes
    {
      path: "/student/",
      element: <StudentLayout />,
      children: [
        {
          path: "dashboard",
          element: <StudentDashboard />,
        },
        {
          path: "profile",
          element: <StudentProfile />,
        },
        {
          path: "courses",
          element: <StudentCourses />,
        },
        {
          path: "files",
          children: [
            {
              path: "",
              element: <StudentFiles />,
            },
            {
              path: "upload",
              element: <StudentFilesUpload />,
            },
          ]
        }
      ]
    },

    // Home layout routes
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/staff/login",
          element: <StaffLogin />,
        },
      ],
    },

    // Authentication portal routes
    {
      path: "/parent",
      element: <Parent />,
    },

    {
      path: "/student",
      element: <Student />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/confirm",
      element: <Confirm />
    },
    {
      path: "*",
      element: <ErrorPage />,
    },

  ];

  return useRoutes(routes);
}

export default Router;
