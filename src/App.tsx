import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import OverlayLoader from "./atoms/OverlayLoader";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import Signup from "./components/Signup/Signup";
import { globalConstants } from "./global";
import { Authentication } from "./state/atoms/authentication";
import { Overlay } from "./state/atoms/overlay";

function App() {
  const [method, setMethod] = useState(globalConstants.method.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(Authentication);
  const showOverlay = useRecoilValue(Overlay);

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
      {showOverlay && <OverlayLoader height="50" width="50" />}
    </div>
  );
}

export default App;
