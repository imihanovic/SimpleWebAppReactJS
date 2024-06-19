import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useEditPassword from "../../jsHooks/users/useEditPassword";

const EditPassword = () => {
  const { id } = useParams();
  const { updatePassword: update, error: updateError } = useEditPassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await update(id, currentPassword, newPassword);
      navigate("/users");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-3xl font-bold leading-9 tracking-tight text-black'>
          Edit Password
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className={`rounded-lg p-6 shadow-sm`}>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='currentPassword'
                  className='block text-sm font-medium leading-6 text-black'
                >
                  Enter current password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='currentPassword'
                  name='currentPassword'
                  type='text'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium leading-6 text-black'
                >
                  Enter new password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='newPassword'
                  name='newPassword'
                  type='text'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm '
          >
            Edit
          </button>
        </form>
        {updateError && <div className='error text-red-400'>{updateError}</div>}
      </div>
    </div>
  );
};

export default EditPassword;
