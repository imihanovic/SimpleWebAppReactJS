import React, { useEffect, useState } from "react";
import useGetUsers from "../../jsHooks/users/useGetUsers";
import { Link } from "react-router-dom";
import { userRoles } from "../../enums/userRoles";
import { useAuthContext } from "../../jsHooks/useAuthContext";

const UsersPage = () => {
  const { user } = useAuthContext();

  const { users: fetchedUsers, loading, error } = useGetUsers();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(fetchedUsers);
  }, [fetchedUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div className='Users'>
      <h1 className='text-5xl font-bold text-darkblue mx-auto mb-4'>Users</h1>
      {user.role === userRoles.Admin && (
        <div className='flex justify-between mb-4'>
          <div></div>
          <Link to={`/register`}>
            <i className='text-green-800 text-xl font-bold hover:text-blue-700 mr-10'>
              New user
            </i>
          </Link>
        </div>
      )}
      <div>
        <table class='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              {user.role === userRoles.Admin && <th scope='col'></th> && <th scope='col'></th>}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((fetched) => (
                <tr
                  key={fetched._id}
                  className='border-b transition duration-300 ease-in-out hover:bg-slate-100 dark:border-slate-200 dark:hover:bg-slate-100'
                >
                  <td className='whitespace-nowrap px-6 py-4'>
                    {fetched.email}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    {fetched.role}
                  </td>
                  {user.role === userRoles.Admin && (
                    <>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <Link to={`/users/edit/${fetched._id}`}>
                        <p className="text-yellow-700">Edit</p>
                        </Link>
                      </td>

                      <td className='whitespace-nowrap px-6 py-4'>
                        <Link to={`/users/editPassword/${fetched._id}`}>
                          <p className="text-yellow-700">Change password</p>
                        </Link>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
