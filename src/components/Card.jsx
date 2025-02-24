function Card({ userId, img, name, description }) {
  return (
    <div
      className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl 
      cursor-pointer overflow-hidden border border-gray-200 hover:scale-105 
      transition-transform duration-300"
    >
      <div className="flex justify-center">
        <img className="w-[50%] h-48 object-cover" src={img} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg
           hover:bg-blue-600 transition"
        >
          Scopri di più
        </button>
      </div>
    </div>
  );
}

export default Card;
