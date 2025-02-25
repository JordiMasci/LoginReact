import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { profileById } from "../stores/profileSlice";
import { deleteUser } from "../stores/userSlice";

function SingleCard() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.currentUser);

  // PROVA CORRELAZIONE PROFILE-ID --> USERS
  // In questo modo troviamo il legame della tabella profile rispetto l'utente connesso
  const profile = useSelector((state) => profileById(state, user?.profileId));

  const userId = useSelector((state) =>
    state.users.value.find((singleUser) => singleUser.id == cardId)
  );

  // Profilo (privilegi) utente selezionato
  const profileCurrenteUser = useSelector((state) =>
    profileById(state, userId?.profileId)
  );
  console.log(profileCurrenteUser);

  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente?")) {
      dispatch(deleteUser(userId.id));
      userId.id == user.id ? navigate("/") : navigate("/users");
    }
  };
  //   console.log(userId.id, user.id);

  if (!userId) {
    return (
      <>
        <div className="flex justify-center">
          <h1 className="text-red-900 text-3xl">Utente non trovato</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="text-center">
            <img
              src={userId.img}
              alt={userId.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300"
            />
            {/* Nome utente */}
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
          <div
            className="flex flex-col sm:flex-row justify-between text-gray-700 
          space-y-4 md:space-y-0"
          >
            {/* <!-- Genere --> */}
            <div className="w-full">
              <span className="font-medium">Genere: </span>
              <span>{userId.gender === "f" ? "Femminile" : "Maschile"}</span>
            </div>
            {/* <!-- Privilegi --> */}
            <div className="w-full sm:text-right">
              <p>Privilegi: {profile.name}</p>
            </div>
          </div>

          {/* Altre informazioni */}
          <div className="flex justify-center gap-4">
            {profile.changeData && (
              <button
                onClick={() => navigate(`/editUser/${cardId}`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg
             hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Modifica
              </button>
            )}
            {profile.deleteData && !profileCurrenteUser.superAdmin && (
              <button
                onClick={handleDelete}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg
             hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Elimina
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCard;
