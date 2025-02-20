import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { profileById } from "./stores/profileSlice";

function App() {
  const user = useSelector((state) => state.users.currentUser);

  const [editing, setEditing] = useState(false);
  const [change, setChange] = useState(
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Minima, perferendis!"
  );

  // PROVA CORRELAZIONE PROFILE-ID --> USERS
  // In questo modo troviamo il legame della tabella profile rispetto l'utente connesso
  const profile = useSelector((state) => profileById(state, user?.profileId));
  // console.log("questo è profile", profile);

  // MODIFICA BUTTON
  const handleChangeText = () => setEditing(true);

  const handleCancel = () => setEditing(false);

  const handleSavingChange = (e) => setChange(e.target.value);

  const handleConfirm = () => setEditing(false);

  const handleCancelText = () => setChange("");

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
            <div>
              {/* EDITO TESTO */}
              {editing ? (
                <textarea
                  onChange={handleSavingChange}
                  type="text-area"
                  name="text"
                  value={change}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] h-[150px] p-2.5
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <div className="h-[50px]">
                  <p className="p-[20px] text-[20px]  rounded-2xl text-white text-center">
                    {change}
                  </p>
                </div>
              )}
              {/* FINE EDITING */}

              {!editing ? (
                <div className="flex justify-center gap-4 pb-[10px]">
                  {profile.changeText && (
                    <button
                      onClick={handleChangeText}
                      className="cursor-pointer mt-[30px] text-white bg-blue-700 hover:bg-green-800 
                               focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full
                               sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700
                              dark:focus:ring-green-800"
                    >
                      Modifica
                    </button>
                  )}
                  {profile.changeText && (
                    <button
                      onClick={handleCancelText}
                      className="cursor-pointer mt-[30px] text-white bg-blue-700 hover:bg-red-800 focus:ring-4 
                               focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm 
                               w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600
                              dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Elimina
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex justify-center gap-4 pb-[10px]">
                  <button
                    onClick={handleConfirm}
                    className="cursor-pointer mt-[30px] text-white bg-blue-700 hover:bg-green-800 
                               focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full
                              sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700
                             dark:focus:ring-green-800"
                  >
                    Conferma
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cursor-pointer mt-[30px] text-white bg-blue-700 hover:bg-red-800 focus:ring-4 
                               focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm 
                               w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600
                              dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Annulla
                  </button>
                </div>
              )}
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
