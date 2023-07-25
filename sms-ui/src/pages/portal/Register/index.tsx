import clsx from 'clsx'
// import illustrationUrl from "../../../assets/images/illustration.svg";
import illustrationUrl from "../../../assets/images/signup-illustration.svg"
import logoUrl from "../../../assets/images/logo.svg";
import { FormCheck, FormInput, FormSelect } from '../../../base-components/Form';
import Button from '../../../base-components/Button';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import UserRegisterService from '../../../services/UserRegisterService';
import { useNavigate } from 'react-router-dom';

import { useLoading } from '../../../contexts/LoadingContext';
import Loader from "../../../components/Loader"

const index = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: [''],
    });

    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { loading, setLoading } = useLoading();

    // console.log("current role: ", role)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
        setUser({ ...user, role: [e.target.value] })
        console.log("role selected: ", user);
    };

    const saveUser = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!user.username || !user.password || !user.password || user.role[0] === '') {
            return
        }

        console.log(user, role);

        UserRegisterService.registerUser(user).then((res: object) => {
            setLoading(true)

            setTimeout(() => {
                console.log(res);
                setLoading(false)
                navigate('/confirm');
            }, 1500)
        }).catch(res => {
            console.log("error: ", res.response.data);
            setError(res.response.data);
        });



    };

    return (
        loading ? <Loader /> :
            <div
                className={clsx([
                    "-m-3 sm:-mx-8 p-3 sm:px-8 relative min-h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
                    "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
                    "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
                ])}
            >
                <div className="container relative z-10 sm:px-10">
                    <div className="block grid-cols-2 gap-4 xl:grid">
                        {/* BEGIN: Register Info */}
                        <div className="flex-col hidden min-h-screen xl:flex">
                            <a href="" className="flex items-center pt-5 -intro-x">
                                <img
                                    alt="Sample Dash Image"
                                    className="w-6"
                                    src={logoUrl}
                                />
                                <span className="ml-3 text-lg text-white"> Scolar </span>
                            </a>
                            <div className="my-auto">
                                <img
                                    alt="Sample Dash Image"
                                    className="w-1/2 -mt-16 -intro-x"
                                    src={illustrationUrl}
                                />
                                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                                    We are a school of <br />
                                    reference. Register now!
                                </div>
                                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                                    Get outstanding education for your kids at Scolar.
                                </div>
                            </div>
                        </div>
                        {/* END: Register Info */}
                        {/* BEGIN: Register Form */}
                        <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                                    Sign Up
                                </h2>
                                <div className="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
                                    Get outstanding education for your kids at Scolar.
                                </div>
                                {/* BEGIN: Error Msg */}
                                {error && (
                                    <div className="intro-x mt-5">
                                        <div className="bg-danger/20 text-red-800 font-normal rounded-md p-2">
                                            {error}
                                        </div>
                                    </div>
                                )}
                                {/* END: Error Msg */}
                                <div className="mt-8 intro-x">
                                    <FormInput
                                        type="text"
                                        className="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                                        placeholder="Username"
                                        name='username'
                                        value={user.username}
                                        onChange={(e) => handleChange(e)}
                                        autoComplete='off'
                                    />
                                    <FormInput
                                        type="text"
                                        className="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                                        placeholder="Email"
                                        name='email'
                                        value={user.email}
                                        onChange={(e) => handleChange(e)}
                                        autoComplete='off'

                                    />
                                    <FormSelect className="mt-2 sm:mr-2" name='role' value={role} aria-label="Select Your Role" onChange={(e) => handleSelect(e)}>
                                        <option value={""}>Select Your Role</option>
                                        <option value={"PARENT"}>Parent</option>
                                        <option value={"STUDENT"}>Student</option>
                                    </FormSelect>
                                    <FormInput
                                        type="password"
                                        className="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                                        placeholder="Password"
                                        name='password'
                                        value={user.password}
                                        onChange={(e) => handleChange(e)}
                                        autoComplete='new-password'

                                    />

                                </div>
                                <div className="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                                    <FormCheck.Input
                                        id="remember-me"
                                        type="checkbox"
                                        className="mr-2 border"
                                    />
                                    <label
                                        className="cursor-pointer select-none"
                                        htmlFor="remember-me"
                                    >
                                        I agree to the Scolar
                                    </label>
                                    <a className="ml-1 text-primary dark:text-slate-200" href="">
                                        Privacy Policy
                                    </a>
                                    .
                                </div>
                                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                                    <Button
                                        variant="primary"
                                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                                        onClick={(e: React.MouseEvent) => saveUser(e)}
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                                        onClick={() => navigate("/login")}
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* END: Register Form */}
                    </div>
                </div>
            </div>
    )
}

export default index