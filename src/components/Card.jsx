import { Link, Outlet } from "react-router-dom";

function Card({ userId, img, name, description }) {
  return (
    <div
      className="max-w-sm mx-auto bg-white shadow-lg 
    rounded-2xl overflow-hidden border border-gray-200 
    hover:scale-105 transition-transform duration-300 min-h-[300px]"
    >
      <img className="w-full h-48 object-cover" src={img} alt={name} />
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {name}
        </h2>
        <p className="text-gray-600 mt-2 text-center">{description}</p>
        <div className="mt-4 flex justify-center">
          <Link to={`${userId}`} key={userId}>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg
           hover:bg-blue-600 transition cursor-pointer"
            >
              Modifica
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
