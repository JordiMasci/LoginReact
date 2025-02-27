import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useState } from "react";
import { createUser, updateUser } from "../stores/userSlice";
import { useNavigate } from "react-router-dom";
import { profileById } from "../stores/profileSlice";

const foto_1 = "https://i.postimg.cc/hQdcrG0d/foto-1.jpg";
const foto_2 = "https://i.postimg.cc/NL9sYNwj/foto-2.jpg";
const foto_3 = "https://i.postimg.cc/18PsGsV8/foto-3.jpg";
const foto_4 = "https://i.postimg.cc/23sz54zF/foto-4.jpg";
const foto_5 = "https://i.postimg.cc/4mpXHmyC/foto-5.jpg";
const foto_6 = "https://i.postimg.cc/pmZxk4Kq/foto-6.jpg";
const foto_7 = "https://i.postimg.cc/wtjzr2VH/foto-7.jpg";
const foto_8 = "https://i.postimg.cc/4K2GRcLc/foto-8.jpg";
const foto_9 = "https://i.postimg.cc/xJk2fdh4/foto-9.jpg";

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

  // Setto button grigio --> solo colore
  const [focus, setFocus] = useState(false);

  // Setto button a disabled
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checked" ? checked : value;
    setFormData((prevData) => {
      const updateForm = { ...prevData, [name]: inputValue };

      validateForm(updateForm);

      return updateForm;
    });
  };

  // Validazione valori Form inseriti
  const validateForm = (updateForm) => {
    const nameValid = updateForm.name.length > 0;
    const emailValid =
      updateForm.email.includes("@") && updateForm.email.includes(".");
    const passwordValid = updateForm.password.length >= 8;

    setFocus(nameValid && emailValid && passwordValid);
    setDisabled(!nameValid || !emailValid || !passwordValid);
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

  // const validateForm
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
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2
                 focus:ring-blue-500 focus:outline-none"
                rows="3"
                placeholder="Descrizione profilo..."
              ></textarea>
            </div>

            {/* Pulsante di invio */}
            <button
              disabled={disabled}
              type="submit"
              className={`w-full py-2 rounded-lg transition text-white
                ${
                  focus
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-200  dark:bg-gray-600"
                }`}
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
