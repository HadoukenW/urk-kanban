import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="lg:px-30 lg:py-30 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-18">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-8 text-purple font-bold text-6xl">
                Такой страницы не существует
              </h1>
              <p className="my-8 text-purple text-3xl">
                Перейдите на{" "}
                {isAuthenticated ? "homepage" : "login"}, куда вам необходимо
                перейти.
              </p>
              {isAuthenticated ? (
                <Link to="/">
                  <button className="text-2xl sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                    Вернуться на главную страницу
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="text-2xl sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                    Авторизация
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default ErrorPage;
