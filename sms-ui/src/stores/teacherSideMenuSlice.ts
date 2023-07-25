import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      pathname: "/teacher/dashboard",
      title: "Dashboard",
    },
    {
      icon: "Book",
      pathname: "/teacher/course",
      title: "Course",
    },
    {
      icon: "Users",
      pathname: "/teacher/students",
      title: "Students",
    },
    {
      icon: "MessageSquare",
      pathname: "/teacher/chats",
      title: "Chats"
    },
    {
      icon: "FolderOpen",
      pathname: "/teacher/files",
      title: "Files",
    },
    {
      icon: "Settings",
      pathname: "/teacher/profile",
      title: "Settings",
    },



  ],
};

export const teacherMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const teacherSideMenu = (state: RootState) => state.teacherSideMenu.menu;

export default teacherMenuSlice.reducer;
