import { useState } from "react";
import Button from "../../../base-components/Button";
import { FormInline, FormInput, FormLabel } from "../../../base-components/Form";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileService from "../../../services/ProfileService";
import { useLoading } from "../../../contexts/LoadingContext";
import Loader from "../../../components/Loader";

const Account = ({ user }: { user: any }): JSX.Element => {
    const [userU, setUserU] = useState({
        id: user?.id,
        username: user?.username,
        email: user?.email,
    });

    const [error, setError] = useState("");

    const { logout } = useAuth();
    const { loading, setLoading } = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserU({ ...userU, [e.target.name]: e.target.value });
    };

    const saveUser = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!userU.username || !userU.email) {
            setError("Please fill in all fields");
            return
        }

        ProfileService.update(userU).then((res: any) => {
            setLoading(true)

            setTimeout(() => {
                console.log(res);
                logout(user);
                setLoading(false)
            }, 1500)
        }).catch((res: any) => {
            console.log(res);
            if (res.response.status === 401) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        });
    };

    return (
        loading ? <Loader /> :
            <div className="col-span-12 intro-y box 2xl:col-span-6">
                <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">Account Settings</h2>
                </div>

                <div className="p-5 pb-8 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                    {/* BEGIN: Error Msg */}
                    {error && (
                        <div className="intro-x mt-3 mb-5">
                            <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                                {error}
                            </div>
                        </div>
                    )}
                    <FormInline>
                        <FormLabel htmlFor="horizontal-form-1" className="sm:w-20">
                            Email
                        </FormLabel>
                        <FormInput id="horizontal-form-1" type="email" placeholder="example@gmail.com" value={userU.email} name="email" onChange={handleChange} autoComplete="off" />
                    </FormInline>
                    <FormInline className="mt-5">
                        <FormLabel htmlFor="horizontal-form-1" className="sm:w-20">
                            Username
                        </FormLabel>
                        <FormInput id="horizontal-form-1" type="text" placeholder="username" onChange={handleChange} name="username" value={userU.username} autoComplete="off" />
                    </FormInline>

                    <div className="mt-5 sm:ml-20 sm:pl-5 float-right mb-5">
                        <Button variant="primary" onClick={(e: React.MouseEvent) => saveUser(e)}>Save</Button>
                    </div>
                </div>
            </div>
    )
}

export default Account