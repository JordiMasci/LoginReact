import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useState } from "react";
import { createUser } from "../stores/userSlice";
import { useNavigate } from "react-router-dom";
import { profileById } from "../stores/profileSlice";
import foto_1 from "../assets/foto-1.jpg";
import foto_2 from "../assets/foto-2.jpg";
import foto_3 from "../assets/foto-3.jpg";
import foto_4 from "../assets/foto-4.jpg";
import foto_5 from "../assets/foto-5.jpg";
import foto_6 from "../assets/foto-6.jpg";
import foto_7 from "../assets/foto-7.jpg";
import foto_8 from "../assets/foto-8.jpg";
import foto_9 from "../assets/foto-9.jpg";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.currentUser);

  const profile = useSelector((state) => profileById(state, user?.profileId));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    img: foto_1,
    gender: "f",
    profileId: 3,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checked" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      img: foto_1,
      gender: "f",
      profileId: 3,
      description: "",
    });
    navigate("/users");
  };

  if (!profile.superAdmin) {
    return (
      <>
        <div className="flex justify-center">
          <h1 className="text-red-900 text-3xl">
            Utente non trovato/abilitato
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Crea un Nuovo Utente
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nome */}
            <div>
              <label className="block font-medium text-gray-700">
                Nome{" "}
                <sup className="text-red-900 text-[20px] top-[-0.2rem]">*</sup>
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-gray-700">
                Email{" "}
                <sup className="text-red-900 text-[20px] top-[-0.2rem]">*</sup>
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium text-gray-700">
                Password{" "}
                <sup className="text-red-900 text-[20px] top-[-0.2rem]">*</sup>
              </label>
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Immagine */}
            <div>
              <label className="block font-medium text-gray-700">
                Immagine
              </label>
              <select
                name="img"
                value={formData.img}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={foto_1}>Foto 1</option>
                <option value={foto_2}>Foto 2</option>
                <option value={foto_3}>Foto 3</option>
                <option value={foto_4}>Foto 4</option>
                <option value={foto_5}>Foto 5</option>
                <option value={foto_6}>Foto 6</option>
                <option value={foto_7}>Foto 7</option>
                <option value={foto_8}>Foto 8</option>
                <option value={foto_9}>Foto 9</option>
                {/* Aggiungi altre opzioni per le immagini */}
              </select>
            </div>

            {/* Genere */}
            <div>
              <label className="block font-medium text-gray-700">Genere</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="f"
                    checked={formData.gender === "f"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Femmina
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="m"
                    checked={formData.gender === "m"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Maschio
                </label>
              </div>
            </div>

            {/* Profilo */}
            <div>
              <label className="block font-medium text-gray-700">Profilo</label>
              <select
                name="profileId"
                value={formData.profileId}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="2">Admin</option>
                <option value="3">Utente</option>
              </select>
            </div>

            {/* Descrizione */}
            <div>
              <label className="block font-medium text-gray-700">
                Descrizione
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="3"
                placeholder="Descrizione profilo..."
              ></textarea>
            </div>

            {/* Pulsante di invio */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Crea Utente
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
