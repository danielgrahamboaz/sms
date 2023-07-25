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
      pathname: "/student/dashboard",
      title: "Dashboard",
    },
    {
      icon: "Library",
      pathname: "/student/courses",
      title: "Courses",
    },
    {
      icon: "Folder",
      pathname: "/student/files",
      title: "Files",
    },
    // {
    //   icon: "Library",
    //   pathname: "/parent/courses",
    //   title: "Courses",
    // },


  ],
};

export const studentMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const studentSideMenu = (state: RootState) => state.studentSideMenu.menu;

export default studentMenuSlice.reducer;
