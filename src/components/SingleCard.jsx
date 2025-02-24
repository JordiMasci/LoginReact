import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { profileById } from "../stores/profileSlice";

function SingleCard() {
  const { cardId } = useParams();
  const user = useSelector((state) => state.users.currentUser);
  // PROVA CORRELAZIONE PROFILE-ID --> USERS
  // In questo modo troviamo il legame della tabella profile rispetto l'utente connesso
  const profile = useSelector((state) => profileById(state, user?.profileId));
  console.log(profile);

  const userId = useSelector((state) =>
    state.users.value.find((singleUser) => singleUser.id == cardId)
  );

  if (!userId) {
    return (
      <>
        <div className="flex justify-center">
          <h1 className="text-red-900 text-3xl">Utente non trovato</h1>
        </div>
      </>
    );
  }
  //   console.log(userId);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <img
              src={userId.img}
              alt={userId.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300"
            />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {userId.name}
            </h1>
            <p className="text-gray-500 text-lg">{userId.email}</p>
          </div>

          {/* Descrizione utente */}
          <div className="text-center">
            <p className="text-lg text-gray-700 mt-4">{userId.description}</p>
          </div>

          {/* Info generali */}
          <div className="flex justify-between text-gray-700">
            <div className="flex justify-center space-x-2 w-full">
              <span className="font-medium">Genere:</span>
              <span>{userId.gender === "f" ? "Femminile" : "Maschile"}</span>
            </div>
          </div>

          {/* Altre informazioni */}
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg
             hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Modifica
            </button>
            <button
              className="bg-gray-600 text-white px-6 py-2 rounded-lg
             hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Elimina
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCard;
