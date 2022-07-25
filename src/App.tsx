import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./App.css";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Signup from "./components/Signup/Signup";
import { globalConstants } from "./global";
import { Authentication } from "./state/atoms/authentication";

function App() {
  const [method, setMethod] = useState(globalConstants.method.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(Authentication);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className={`flex flex-col w-screen h-screen`}>
      {isAuthenticated ? (
        <Main />
      ) : (
        <div className={`flex flex-col`}>
          {method === globalConstants.method.LOGIN ? (
            <Login setMethod={setMethod} />
          ) : (
            <Signup setMethod={setMethod} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
