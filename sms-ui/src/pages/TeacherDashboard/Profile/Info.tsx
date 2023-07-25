import { useEffect } from "react";
import Button from "../../../base-components/Button";
import { FormInline, FormInput, FormLabel } from "../../../base-components/Form";
import Lucide from '../../../base-components/Lucide';

const Info = ({ user, photo }: { user: any; photo: any; }): JSX.Element => {

    useEffect(() => {
        console.log("user teacher: ", user);
    }, [])

    return (
        <div className="col-span-12 intro-y box 2xl:col-span-6">
            <div className="p-5 flex flex-col pb-8 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items- justify-center flex-1 px-5 lg:justify-start">
                    <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                        <img
                            alt="Midone Tailwind HTML Admin Template"
                            className="rounded-full"
                            src={photo}
                        />
                        <div className="absolute bottom-0 right-0 flex items-center justify-center p-2 mb-1 mr-1 rounded-full bg-primary">
                            <Lucide icon="Camera" className="w-4 h-4 cursor-pointer text-white" />
                        </div>
                    </div>
                    <div className="ml-5 mt-4">
                        <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal capitalize">
                            {user?.username}
                        </div>
                        <div className="text-slate-500">{user?.course?.name.toUpperCase() + " " + user?.role[0]}</div>
                        <div className="text-blue-800 dark:text-indigo-300">{user?.email}</div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <FormInline>
                    <FormLabel htmlFor="horizontal-form-1" className="sm:w-20">
                        Email
                    </FormLabel>
                    <FormInput id="horizontal-form-1" type="email" placeholder="example@gmail.com" disabled value={user?.email} autoComplete="off" />
                </FormInline>
                <FormInline className="mt-5">
                    <FormLabel htmlFor="horizontal-form-1" className="sm:w-20">
                        Username
                    </FormLabel>
                    <FormInput id="horizontal-form-1" type="text" placeholder="example@gmail.com" disabled value={user?.username} autoComplete="off" />
                </FormInline>
                <FormInline className="mt-5">
                    <FormLabel htmlFor="horizontal-form-2" className="sm:w-20" >
                        Course
                    </FormLabel>
                    <FormInput id="horizontal-form-2" type="text" disabled value={user?.course?.name} />
                </FormInline>

                <div className="mt-5 sm:ml-20 sm:pl-5 float-right mb-5">
                    <Button variant="secondary">Change</Button>
                </div>
            </div>
        </div>
    )
}

export default Info