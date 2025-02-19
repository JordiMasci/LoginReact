import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../stores/slice";
import logo from "../assets/logo.avif";
import "./Login.scss";

function Login() {
  const users = useSelector((state) => state.users.value);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    isChecked: false,
  });

  useEffect(() => {
    if (!currentUser || !users) return;

    if (currentUser.isChecked) {
      const findUser = users.find(
        (user) =>
          user.id == currentUser.id &&
          user.email == currentUser.email &&
          user.password == currentUser.password
      );

      if (findUser) {
        navigate("/home");
        console.log("Credenziali corrette");
      } else {
        navigate("/");
        localStorage.removeItem("currentUser");
        console.log("Credenziali scadute");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setForm((form) => ({
      ...form,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const findUser = users.find((user) => user.email == form.email);

    if (findUser) {
      setError(false);
      dispatch(login(form));
      navigate("/home");
      console.log("Accesso riuscito");
    } else {
      setError(true);
      console.log("Accesso negato");
    }
    setForm({
      email: "",
      password: "",
      isChecked: false,
    });
  };

  // console.log(users);

  return (
    <>
      <span className="LoginContainer">
        <div className="flex justify-center items-center pb-[20px]">
          <img src={logo} alt="" className="w-[300px] rounded-full" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <form
            className="w-full flex flex-col justify-center max-w-sm"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="flex justify-center italic bold">
                <p className="text-red-500 text-md mb-4">
                  Email o password non corretti
                </p>
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                onChange={handleChange}
                value={form.email}
                name="email"
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Inserisci email"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                onChange={handleChange}
                value={form.password}
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  onChange={handleChange}
                  name="isChecked"
                  id="remember"
                  type="checkbox"
                  checked={form.isChecked}
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Accedi
            </button>
          </form>
        </div>
      </span>
    </>
  );
}

export default Login;
