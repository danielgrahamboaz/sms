import clsx from 'clsx'
import React, { useState } from 'react'
import Button from '../../../base-components/Button'
import { FormCheck, FormInput, FormSelect } from '../../../base-components/Form'
import Loader from "../../../components/Loader"
import { useAuth } from "../../../contexts/AuthContext"
import { useLoading } from '../../../contexts/LoadingContext'
import { User } from '../../../hooks/useUser'
import UserLoginService from '../../../services/UserLoginService'
import { v4 } from 'uuid'
import { setCookie } from '../../../utils/cookies'

const index = () => {

  const [staff, setStaff] = useState({
    usernameOrEmail: '',
    password: '',
    role: ''
  })

  const [role, setRole] = useState("");

  const [error, setError] = useState("");

  const { loading, setLoading } = useLoading()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({ ...staff, [e.target.name]: e.target.value })
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setStaff({ ...staff, role: e.target.value })
    console.log("role selected: ", staff);
  };

  const staffLogin = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!staff.usernameOrEmail || !staff.password || !staff.role || role === "") {
      setError("Some fields are empty!");
      return;
    }

    UserLoginService.staffLogin(staff).then((res: any) => {
      setLoading(true)

      setTimeout(() => {
        console.log("staff login", res)
        setLoading(false)
        setCookie("secret", staff.password + "r/d/m" + v4());
        const loggedInUser = {
          ...res.user,
          chats: { ...res.chats }
        }
        login(loggedInUser);
      }, 1500)
    }).catch(res => {
      console.log("error: ", res)
      setLoading(false)

      if (res.response.status === 400) {
        setError(res.response.data)
      } else if (res.response.status === 404) {
        setError(res.response.data.message)
      } else {
        setError(res.response.data.message)
        console.log("error default: ", res.response.status)
      }

    });

  }


  return (
    loading ? <Loader /> :
      <div
        className={clsx([
          "sm:-mx-8 p-3 min-h-screen sm:px-8 pb-8 lg:overflow-hidden bg-primary dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
        ])}
      >

        <div className="flex items-center justify-center mt-12">
          <h2 className="text-3xl font-medium intro-y text-white">Scolar Admin - Sign In</h2>
        </div>
        <div className='container relative z-10 sm:px-10 pb-8 justify-center flex'>
          <div className="py-5 mt-5 intro-y px-5 mx-auto my-auto bg-white rounded-md shadow-md box sm:py-10 w-full sm:w-3/4 lg:w-2/4 xl:w-auto">

            {/* BEGIN: Login Form */}
            <div className="px-12">
              <div className="text-center intro-x text-slate-400 xl:hidden">
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
                  name='usernameOrEmail'
                  value={staff.usernameOrEmail}
                  onChange={(e) => handleChange(e)}
                  className="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                  placeholder="Username or Email"
                  autoComplete='off'
                />
                <FormInput
                  type="password"
                  name='password'
                  value={staff.password}
                  onChange={(e) => handleChange(e)}
                  className="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  placeholder="Password"
                  autoComplete='new-password'
                />
                <FormSelect className="mt-2 sm:mr-2" aria-label="Select Your Role" value={role} onChange={handleSelect}>
                  <option value={""}>Select Your Role</option>
                  <option value={"TEACHER"}>Teacher</option>
                  <option value={"STAFF"}>Staff</option>
                  <option value={"ADMIN"}>Super Admin</option>
                </FormSelect>
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
                <a href="">Forgot Password?</a>
              </div>
              <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
                <Button
                  variant="primary"
                  className="w-full px-4 py-3 align-top"
                  onClick={(e: React.MouseEvent) => staffLogin(e)}
                >
                  Login
                </Button>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
  )
}

export default index