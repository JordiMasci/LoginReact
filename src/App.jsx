import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { profileById } from "./stores/profileSlice";
import Navbar from "./components/Navbar";

import { changeName } from "./stores/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);
  // const profile = useSelector((state) => state.profiles.value);

  const profileCurrentUser = useSelector((state) =>
    profileById(state, user?.profileId)
  );

  const handleChangeName = () => {
    const newName = prompt("Modifica Nome", user.name);
    dispatch(changeName(newName));
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {user ? (
          <>
            <Navbar></Navbar>
            <h1 className="text-3xl italic pt-[30px] pb-[10px] text-white">
              {user.gender == "f" ? "BENVENUTA" : "BENVENUTO"}
            </h1>

            <div className="flex gap-3">
              <p className="text-lg text-white">{user.name}</p>

              <span onClick={handleChangeName} className="cursor-pointer ">
                <i
                  className="fa-solid fa-pen-to-square hover:scale-120
                 transition-transform duration-300 text-white"
                ></i>
              </span>
            </div>

            <img
              src={user.img}
              alt=""
              className="w-[200px] rounded-[50%] py-[30px]"
            />
            <div>
              {/* EDITO TESTO */}

              <div className="h-[50px]">
                <p
                  className="p-[20px] text-[20px]  rounded-2xl
                 text-white text-center"
                >
                  Privilegi utente:{" "}
                  <span className="italic font-bold">
                    {profileCurrentUser.name}
                  </span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-500 bold text-4xl">Utente non autenticato</p>
        )}
      </div>
    </>
  );
}

export default App;
