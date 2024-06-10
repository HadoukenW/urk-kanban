import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginUser, googleLogin } from "../../store/slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const data = await dispatch(
      LoginUser({ email: values.email, password: values.password })
    );
    if (data?.payload?.token) {
      toast.success("Авторизация прошла успешно!");
      navigate("/");
    } else {
      setMessage(data?.payload?.message || "Что-то пошло не так");
      return toast.error(data?.payload?.message || "Что-то пошло не так");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const continueWithGoogle = async (credential) => {
    const userData = jwtDecode(credential.credential);

    const data = await dispatch(
      googleLogin({
        clientId: credential.clientId,
        username: userData.name,
        email: userData.email,
        profilePicture: userData.picture,
        email_verified: userData.email_verified,
      })
    );

    if (data?.payload?.token) {
      toast.success("Авторизация прошла успешно!");
      navigate("/");
      setMessage("");
    } else {
      toast.error("Что-то пошло не так");
    }
  };
  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-10 text-4xl font-semibold text-heading -900 max-w-[400px] w-full justify-between"
          >
            <img
              className="w-21 h-20 mr-2"
              src="https://preco.ru/assets/theme/img/logo.svg"
              alt="logo"
            />
            УРК тайм-трекер
          </a>
          <div className="w-full bg-white rounded-lg shadow max-w-2xl py-3 ">
            <div className="space-y-8 p-12">
              <h1 className="font-bold leading-tight tracking-tight text-heading text-4xl ">
                Авторизация
              </h1>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xl font-medium text-purple "
                  >
                    Почта
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-purple -900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-4 "
                    placeholder="name@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block relative mb-2 text-xl font-medium text-purple -900 "
                  >
                    Пароль
                    <FaEye
                      onClick={() => setShow(!show)}
                      className={`absolute right-4 top-14 text-3xl hover:text-blue-600 
                      ${show ? "text-blue-600" : "text-gray-500"}
                      cursor-pointer`}
                    />
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    placeholder="Пароль"
                    className="bg-gray-50 border border-gray-300 text-purple -900 sm:text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-4 "
                    required
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center ">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-5 mt-1 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                    />
                  </div>
                  <div className="ml-3 text-xl">
                    <label
                      htmlFor="terms"
                      className="font-light text-purple -500 "
                    >
                      Я принимаю {" "}
                      <a
                        className="font-medium text-blue-600 hover:underline "
                        href="#"
                      >
                        условия пользовательского соглашения
                      </a>
                    </label>
                  </div>
                </div>
                {message && (
                  <div className="text-red-500 text-center font-medium">
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center text-white
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 "
                  }
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-4 text-center `}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="animate-spin-fast text-2xl "
                    />
                  ) : (
                    "Войти"
                  )}
                </button>
                <p className="text-xl font-light text-purple -500 ">
                  Создать новый аккаунт?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Зарегистрироваться
                  </Link>
                </p>
              </form>
              <div className="flex items-center mt-0">
                <div className="h-[1.4px] w-[100%] bg-gray-300"></div>
                <div className="mx-2 text-pruple">or</div>
                <div className="h-[1.4px] w-[100%] bg-gray-300"></div>
              </div>
              <div className="w-full flex items-center justify-center">
                <GoogleLogin
                  size="large"
                  shape="pill"
                  text="продолжить_с"
                  width={250}
                  onSuccess={(credentialResponse) => {
                    continueWithGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Что-то пошло не так");
                    toast.error("Что-то пошло не так");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;