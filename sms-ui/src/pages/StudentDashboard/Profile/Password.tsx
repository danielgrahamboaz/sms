import { useState } from "react";
import Button from "../../../base-components/Button";
import { FormInline, FormInput, FormLabel } from "../../../base-components/Form";
import ProfileService from "../../../services/ProfileService";
import { useAuth } from "../../../contexts/AuthContext";
import { useLoading } from "../../../contexts/LoadingContext";
import Loader from "../../../components/Loader";

const Password = ({ user }: { user: any }) => {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [userU, setUserU] = useState({
        id: user.id,
        password: ""
    })

    const [error, setError] = useState("")

    const { logout } = useAuth()
    const { loading, setLoading } = useLoading();

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setError("Passwords do not match")
        } else {
            setError("")
            setUserU({ ...userU, password: e.target.value })
        }
    };

    const savePassword = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!userU.password) {
            setError("Some fields are empty!");
            return
        }

        ProfileService.updatePassword(userU).then((res: any) => {
            setLoading(true);

            setTimeout(() => {
                console.log("new profile: ", res);
                logout(user)
                setLoading(false);
            }, 1500);
        }).catch(res => {
            console.log("error: ", res);
            if (res.response.status === 401) {
                setError(res.response.data)
            } else {
                setError(res.response.data.message)
            }
        });
    }

    return (
        loading ? <Loader /> :
            <div className="col-span-12 intro-y box 2xl:col-span-6">
                <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">Change Password</h2>
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
                            New Password
                        </FormLabel>
                        <FormInput id="horizontal-form-1" type="password" placeholder="xxxxxxxx" value={password} autoComplete="off" onChange={handleChangePassword} />
                    </FormInline>
                    <FormInline className="mt-5">
                        <FormLabel htmlFor="horizontal-form-1" className="sm:w-20">
                            Confirm Password
                        </FormLabel>
                        <FormInput id="horizontal-form-1" type="password" placeholder="xxxxxxxxx" value={confirmPassword} autoComplete="off" onChange={handleChangeConfirmPassword} />
                    </FormInline>

                    <div className="mt-5 sm:ml-20 sm:pl-5 float-right mb-5">
                        <Button variant="primary" onClick={(e: React.MouseEvent) => savePassword(e)}>Save</Button>
                    </div>
                </div>
            </div>
    )
}

export default Password