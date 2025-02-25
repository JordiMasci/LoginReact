import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { profileById } from "../stores/profileSlice";
import { deleteUser } from "../stores/userSlice";

function Card({ userId, img, name, description, profileCurrentUser, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => profileById(state, user?.profileId));

  const handleDelete = () => {
    if (window.confirm("Sicuro di voler eliminare questo utente?")) {
      dispatch(deleteUser(user.id));
    }
  };

  const isSuperAdmin = profileCurrentUser?.superAdmin;
  const isAdmin = profileCurrentUser?.admin;

  const canEdit = isSuperAdmin || (isAdmin && !profile?.superAdmin);

  return (
    <div
      className="max-w-sm mx-auto bg-white shadow-lg 
    rounded-2xl overflow-hidden border border-gray-200 
    hover:scale-102 transition-transform duration-300 
    min-h-[300px] w-full relative flex flex-col"
    >
      {isSuperAdmin && !profile.superAdmin && (
        <span
          onClick={handleDelete}
          className="h-5 w-5 flex items-center justify-center font-medium 
          absolute top-[2%] right-[3%] cursor-pointer text-black text-[20px]"
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
      )}

      <img
        className="w-full h-48 object-cover rounded-full"
        src={img}
        alt={name}
      />
      <div className="p-4 flex flex-col flex-grow justify-between h-full">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {name}
        </h2>
        <p className="text-gray-600 mt-2 text-center">{description}</p>
        <div className="mt-4 flex justify-center gap-2.5">
          <Link to={`${userId}`} key={userId}>
            <button
              className="px-6 py-2 bg-green-700 text-white rounded-lg
           hover:bg-green-800 transition cursor-pointer"
            >
              Dettaglio
            </button>
          </Link>
          {canEdit && (
            <button
              onClick={() => navigate(`/editUser/${userId}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg
             hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Modifica
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
