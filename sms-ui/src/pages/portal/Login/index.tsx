import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from "../../../assets/images/logo.svg";
import illustrationUrl from "../../../assets/images/welcome-illustration.svg";
import Button from '../../../base-components/Button';
import { FormCheck, FormInput } from '../../../base-components/Form';
import Loader from "../../../components/Loader";
import { useAuth } from '../../../contexts/AuthContext';
import { useLoading } from '../../../contexts/LoadingContext';
import { User } from '../../../hooks/useUser';
import UserLoginService from '../../../services/UserLoginService';

const index = () => {
    const [user, setUser] = React.useState({
        usernameOrEmail: '',
        password: '',
    });
    const [error, setError] = React.useState("")

    const navigate = useNavigate();

    const { loading, setLoading } = useLoading();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const loginUser = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!user.usernameOrEmail || !user.password) {
            setError("Please fill in all fields");
            return
        }

        UserLoginService.login(user.usernameOrEmail, user.password).then((res: any) => {
            setLoading(true);

            setTimeout(() => {
                console.log(res.user);
                setLoading(false)
                const loggedUser: User = {
                    ...res.user,
                }
                login(loggedUser);
            }, 1500)
        }).catch(res => {
            console.log("error: ", res.response.data);
            if (res.response.status === 401) {
                setError(res.response.data)
            } else if (res.response.status === 404) {
                setError(res.response.data.message)
            } else {
                setError(res.response.data.message)
            }
        });


    }

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
                        {/* BEGIN: Login Info */}
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
                                    Welcome back! <br />
                                    Glad to have you back.
                                </div>
                                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                                    Checkout the latest by login into your dashboard now.
                                </div>
                            </div>
                        </div>
                        {/* END: Login Info */}
                        {/* BEGIN: Login Form */}
                        <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                                    Sign In
                                </h2>
                                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
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
                                        placeholder="Username or Email"
                                        name='usernameOrEmail'
                                        value={user.usernameOrEmail}
                                        onChange={handleChange}
                                        autoComplete='off'
                                    />
                                    <FormInput
                                        type="password"
                                        className="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                                        placeholder="Password"
                                        name='password'
                                        value={user.password}
                                        onChange={handleChange}
                                        autoComplete='new-password'
                                    />
                                </div>
                                <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                                    <div className="flex items-center mr-auto">
                                        <FormCheck.Input
                                            id="remember-me"
                                            type="checkbox"
                                            className="mr-2 border"
                                        />
                                        <label
                                            className="cursor-pointer select-none"
                                            htmlFor="remember-me"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="/forgot-password">Forgot Password?</a>
                                </div>
                                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                                    <Button
                                        variant="primary"
                                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                                        onClick={(e: React.MouseEvent) => loginUser(e)}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* END: Login Form */}
                    </div>
                </div>
            </div>
    )
}

export default index