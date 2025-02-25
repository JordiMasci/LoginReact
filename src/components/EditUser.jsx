import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../stores/userSlice";
import { profileById } from "../stores/profileSlice";
import { space } from "postcss/lib/list";

function EditUser() {
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);

  // Seleziona l'utente da modificare in base al cardId
  const user = useSelector((state) =>
    state.users.value.find((singleUser) => singleUser.id == cardId)
  );

  const profile = useSelector((state) => profileById(state, user?.profileId));
  //   console.log("Profile", profile);

  // profilo del currentUser (privilegi)
  const profileCurrentUser = useSelector((state) =>
    profileById(state, currentUser?.profileId)
  );
  //   console.log("profile", profileCurrentUser);

  // Stato locale per i campi del form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [profileId, setProfileId] = useState();

  // Pre-popoliamo il form quando l'utente viene caricato
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDescription(user.description);
      setProfileId(user.profileId);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch dell'azione per aggiornare l'utente
    dispatch(updateUser({ id: user.id, name, email, description, profileId }));
    // Dopo l'aggiornamento, naviga alla pagina degli utenti
    navigate("/users");
  };

  if (!user || !profileCurrentUser.changeData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-2xl">Utente non trovato/abilitato</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen p-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-black mb-4 text-center">
            Modifica Utente
          </h2>

          <div className="flex justify-center">
            <img src={user.img} alt="" className="rounded-full w-[250px]" />
          </div>
          <div>
            <label className="block text-black mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md text-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Descrizione</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 px-2 rounded-md
               text-black"
              rows="4"
              required
            ></textarea>
          </div>

          {/* PROVA */}
          <div>
            <label className="block  text-gray-700 pb-1.5">Privilegi</label>
            <select
              name="profileId"
              value={profileId}
              className="w-full border border-gray-300 p-2 rounded-md 
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setProfileId(e.target.value)}
            >
              <option value="2">Admin</option>
              <option value="3">Utente</option>
            </select>
          </div>

          <div className="flex justify-between">
            <p>
              Genere:{" "}
              <span className="italic">
                {user.gender === "f" ? "Donna" : "Uomo"}
              </span>
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUser;
