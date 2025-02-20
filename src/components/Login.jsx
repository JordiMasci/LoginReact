import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../stores/userSlice";
import logo from "../assets/logo.avif";
import "./Login.scss";

function Login() {
  const users = useSelector((state) => state.users.value);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const [isDisable, setDisable] = useState(true);

  const [focusButton, setFocusButton] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    isChecked: false,
  });

  useEffect(() => {
    if (!currentUser || !users) return;

    if (currentUser) {
      const findUser = users.find(
        (user) =>
          user.id == currentUser.id &&
          user.email == currentUser.email &&
          user.password == currentUser.password
      );

      if (findUser && currentUser.isChecked) {
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

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: inputValue };

      validateForm(updatedForm);

      return updatedForm;
    });
  };

  const validateForm = (updatedForm) => {
    const emailValid =
      updatedForm.email.includes("@") && updatedForm.email.includes(".");
    const passwordValid = updatedForm.password.length >= 8;

    setFocusButton(emailValid && passwordValid);
    setDisable(!emailValid || !passwordValid);
  };

  // SUBMIT VALIDATION
  const handleSubmit = (e) => {
    e.preventDefault();

    const findUser = users.find(
      (user) => user.email == form.email && user.password == form.password
    );

    if (findUser) {
      setError(false);
      dispatch(login(form));
      navigate("/home");
      console.log("Accesso riuscito");
    } else {
      setError(true);
      setFocusButton(false);
      setDisable(true);
      console.log("Accesso negato");
    }
    setForm({
      email: "",
      password: "",
      isChecked: false,
    });
  };

  return (
    <>
      <section className="LoginContainer">
        <div className="flex justify-center items-center pb-[20px]">
          <img src={logo} alt="" className="w-[300px] rounded-full" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <form
            className="w-full flex flex-col justify-center max-w-sm"
            onSubmit={handleSubmit}
          >
            {/* MODALE */}
            {error && (
              <div
                className="fixed inset-0 z-50 flex justify-center items-center w-full h-full"
                onClick={() => setError(false)}
              >
                <div
                  className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                    rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setError(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-[#ff0000]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Password o Email non valide
                    </h3>
                    <button
                      onClick={() => setError(false)}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      RIPROVA
                    </button>
                  </div>
                </div>
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
                onBlur={() => validateForm(form)}
                value={form.email}
                name="email"
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter email"
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
                onBlur={() => validateForm(form)}
                value={form.password}
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter password"
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
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3
                   focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600
                    dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
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
              disabled={isDisable}
              type="submit"
              className={`${
                focusButton
                  ? "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  : "bg-gray-200  dark:bg-gray-600  "
              } text-white font-medium rounded-lg text-sm w-full sm:w-auto 
              px-5 py-2.5 text-center `}
            >
              Accedi
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
