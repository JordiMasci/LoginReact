import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./stores/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };
  // console.log(user);

  return (
    <>
      <div className="flex flex-col items-center">
        {user ? (
          <>
            <Navbar user={user}></Navbar>
            <h1 className="text-3xl italic pt-[30px] pb-[10px]">
              {user.gender == "f" ? "BENVENUTA" : "BENVENUTO"}
            </h1>

            <p className="text-lg">{user.name}</p>
            <img
              src={user.img}
              alt=""
              className="w-[200px] rounded-[50%] py-[30px]"
            />
            <h3 className="pt-[20px]">{user.email}</h3>

            <button
              onClick={handleClick}
              className="cursor-pointer mt-[30px] text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <p className="text-red-500 bold text-4xl">Utente non autenticato</p>
        )}
      </div>
    </>
  );
}

export default App;
