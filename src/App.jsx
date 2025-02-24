import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";

import { changeName, changeDescription } from "./stores/userSlice";

function App() {
  const user = useSelector((state) => state.users.currentUser);

  // MODIFICA SUPER-ADMIN
  const dispatch = useDispatch();

  const handleChangeName = () => {
    const newName = prompt("Modifica Nome", user.name);
    dispatch(changeName(newName));
  };

  const handleChangeDescription = () => {
    const newDescription = prompt("Modifica descrizione", user.description);
    dispatch(changeDescription(newDescription));
  };
  console.log(user);

  return (
    <>
      <div className="flex flex-col items-center">
        {user ? (
          <>
            <Navbar></Navbar>
            <h1 className="text-3xl italic pt-[30px] pb-[10px]">
              {user.gender == "f" ? "BENVENUTA" : "BENVENUTO"}
            </h1>

            <div className="flex gap-3">
              <p className="text-lg">{user.name}</p>

              <span onClick={handleChangeName} className="cursor-pointer ">
                <i className="fa-solid fa-pen-to-square hover:scale-120 transition-transform duration-300"></i>
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
                <p className="p-[20px] text-[20px]  rounded-2xl text-white text-center">
                  {user.description}
                </p>
              </div>

              {/* FINE EDITING */}

              <div className="flex justify-center gap-4 pb-[10px]">
                <button
                  onClick={handleChangeDescription}
                  className="cursor-pointer mt-[30px] text-white bg-blue-700 hover:bg-green-800 
                               focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full
                               sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700
                              dark:focus:ring-green-800"
                >
                  Modifica
                </button>
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
