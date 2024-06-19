import React, { useState, useEffect } from "react";
import useEditUser from "../../jsHooks/users/useEditUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGetUserById from "../../jsHooks/users/useGetUserById";
import UserObj from "../../reuseable/UserObj";

const EditUser = () => {
  const { id } = useParams();
  const { fetchedUser: getUser, error: getError } = useGetUserById(id);
  const { editUser: update, error: updateError } = useEditUser();
  const [fetchedUser, setFetchedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (getUser) {
      setFetchedUser((prevData) => ({
        ...prevData,
        email: getUser.email,
        role: getUser.role,
      }));
    }
  }, [getUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fetchedUser) {
      await update(id, fetchedUser);
      navigate("/users");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-3xl font-bold leading-9 tracking-tight text-black'>
          Edit User
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm justify-center'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <>
            <UserObj user={fetchedUser} setUserData={setFetchedUser} />
            <button
              type='submit'
              className='flex w-50 justify-center rounded-md bg-green-600 px-3 py-1.5 leading-6 text-black hover:bg-green-500 font-bold'
            >
              Edit
            </button>
          </>
        </form>
        {(getError || updateError) && (
          <div className='error text-red-400'>{getError || updateError}</div>
        )}
      </div>
    </div>
  );
};

export default EditUser;
