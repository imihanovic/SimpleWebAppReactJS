import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../jsHooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../jsHooks/users/useLogout";
import { userRoles } from "../enums/userRoles";

const NavigationBar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className='bg-black p-2 mb-4'>
      {user && (
        <div className='flex items-center w-full justify-between'>
          <div className='text-lg ml-4'>
            <Link
              to='/home'
              className='block mt-4 lg:inline-block lg:mt-0 text-lg text-purple-700 font-bold hover:text-blue-700 mr-4'
            >
              Products
            </Link>

            <Link
              to='/producers'
              className='block mt-4 lg:inline-block lg:mt-0 text-lg text-purple-700 font-bold hover:text-blue-700 mr-4'
            >
              Producers
            </Link>
            {user.role === userRoles.Admin && (
              <Link
                to='/users'
                className='block mt-4 lg:inline-block lg:mt-0 text-lg text-purple-700 font-bold hover:text-blue-700 mr-4'
              >
                Users
              </Link>
            )}
          </div>
          <div className='flex items-center'>
            <Link
              to='/cart'
              className='block mt-4 lg:inline-block lg:mt-0 text-lg text-yellow-700 font-bold hover:text-blue-700 mr-4'
            >
              Cart <i className='bi bi-cart-check-fill bi-lg mr-4 text-xl '></i>
            </Link>
            <p className='block mt-4 lg:inline-block lg:mt-0 text-lg text-white font-bold mr-4'>
              {user.email}
            </p>
            <button
              onClick={logoutUser}
              className='block mt-4 lg:inline-block lg:mt-0 text-lg text-red-700 font-bold hover:text-blue-700 mr-4'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
