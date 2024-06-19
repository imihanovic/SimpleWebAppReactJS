import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../jsHooks/users/useRegister";
import { userRoles } from "../enums/userRoles";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, response } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password, confirmPassword);
  };
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-3xl font-bold leading-9 tracking-tight text-black-800'>
          Register
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-black'
              >
                Email*
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-black'
              >
                Password*
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-black'
              >
                Confirm Password*
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='confirmpassword'
                name='confirmpassword'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 leading-6 text-black hover:bg-green-500 font-bold'
            >
              Register
            </button>
          </div>
        </form>
        {response && response.error && (
          <div className='error text-red-400'>{response.error}</div>
        )}

        <p className='mt-10 text-center text-sm text-purple-800'>
          <Link
            to='/login'
            className='font-semibold leading-6  hover:text-blue-700'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
