import { useRef, useState } from "react";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";
import {
    TinySliderElement,
} from "../../../base-components/TinySlider";
import fakerData from "../../../utils/faker";
import { useAuth } from "../../../contexts/AuthContext";
import Info from "./Info";
import Account from "./Account";
import Password from "./Password";
import Settings from "./Settings";

function Main() {
    const announcementRef = useRef<TinySliderElement>();
    const newProjectsRef = useRef<TinySliderElement>();
    const todaySchedulesRef = useRef<TinySliderElement>();

    const profileCards = ["Profile", "Account", "Password", "Settings"]

    const [profileCard, setProfileCard] = useState(profileCards[0])

    const prevAnnouncement = () => {
        announcementRef.current?.tns.goTo("prev");
    };
    const nextAnnouncement = () => {
        announcementRef.current?.tns.goTo("next");
    };
    const prevNewProjects = () => {
        newProjectsRef.current?.tns.goTo("prev");
    };
    const nextNewProjects = () => {
        newProjectsRef.current?.tns.goTo("next");
    };
    const prevTodaySchedules = () => {
        todaySchedulesRef.current?.tns.goTo("prev");
    };
    const nextTodaySchedules = () => {
        todaySchedulesRef.current?.tns.goTo("next");
    };

    const { user } = useAuth()

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Profile Layout</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                {/* BEGIN: Profile Menu */}
                <div className="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
                    <div className="mt-5 intro-y box lg:mt-0">
                        <div className="relative flex items-center p-5">
                            <div className="w-12 h-12 image-fit">
                                <img
                                    alt="Midone Tailwind HTML Admin Template"
                                    className="rounded-full"
                                    src={fakerData[0].photos[0]}
                                />
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="text-base font-medium capitalize">
                                    {user?.username}
                                </div>
                                <div className="text-slate-500">{user.role[0]}</div>
                            </div>

                        </div>
                        <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                            <a className={`flex items-center cursor-pointer ${profileCard === 'Profile' && 'text-primary font-medium dark:text-indigo-300'}`} onClick={() => setProfileCard(profileCards[0])}>
                                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Personal
                                Informations
                            </a>
                            <a className={`flex items-center cursor-pointer mt-5 ${profileCard === 'Account' && 'text-primary font-medium dark:text-indigo-300'}`} onClick={() => setProfileCard(profileCards[1])}>
                                <Lucide icon="Box" className="w-4 h-4 mr-2" /> Account Settings
                            </a>
                            <a className={`flex items-center cursor-pointer mt-5 ${profileCard === 'Password' && 'text-primary font-medium dark:text-indigo-300'}`} onClick={() => setProfileCard(profileCards[2])}>
                                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
                            </a>
                            <a className={`flex items-center cursor-pointer mt-5 ${profileCard === 'Settings' && 'text-primary font-medium dark:text-indigo-300'}`} onClick={() => setProfileCard(profileCards[3])}>
                                <Lucide icon="Settings" className="w-4 h-4 mr-2" /> User
                                Settings
                            </a>
                        </div>

                    </div>
                    <div className="p-5 mt-5 text-white intro-y box bg-primary">
                        <div className="flex items-center">
                            <div className="text-lg font-medium">Important Update</div>
                            <div className="px-1 ml-auto text-xs bg-white rounded-md dark:bg-primary dark:text-white text-slate-700">
                                New
                            </div>
                        </div>
                        <div className="mt-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s.
                        </div>
                        <div className="flex mt-5 font-medium">
                            <Button
                                type="button"
                                className="px-2 py-1 ml-auto text-white border-transparent dark:border-transparent"
                            >
                                Dismiss
                            </Button>
                        </div>
                    </div>
                </div>
                {/* END: Profile Menu */}
                <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                    <div className="grid grid-cols-12 gap-6">
                        {
                            profileCard === 'Profile' && <Info photo={fakerData[0].photos[0]} user={user} /> ||
                            profileCard === 'Account' && <Account user={user} /> ||
                            profileCard === 'Password' && <Password user={user} /> ||
                            profileCard === 'Settings' && <Settings />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
