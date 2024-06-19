import React, { useState, useEffect } from "react";
import { userRoles } from "../enums/userRoles";

const UserObj = ({ user, setUserData }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setRole(user.role || "");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`rounded-lg p-6 shadow-sm`}>
      <div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-black'
          >
            Email
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='mt-2'>
      <div className='flex items-center justify-between'>
          <label
            htmlFor='role'
            className='block text-sm font-medium leading-6 text-black'
          >
            Role
          </label>
        </div>
        <div>
        <select
          id='role'
          name='role'
          required
          className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
          value={role}
          onChange={handleInputChange}
        >
          <option value=''>Select Role</option>
          {Object.values(userRoles).map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {roleOption}
            </option>
          ))}
        </select>
        </div>
      </div>
    </div>
  );
};

export default UserObj;
