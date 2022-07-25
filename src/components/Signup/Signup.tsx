import React, { SetStateAction, useState } from "react";
import { useSetRecoilState } from "recoil";
import { globalConstants } from "../../global";
import { NetworkManager } from "../../network/networkManager";
import { Authentication } from "../../state/atoms/authentication";
import { Overlay } from "../../state/atoms/overlay";

type SignupProps = {
  setMethod: React.Dispatch<SetStateAction<string>>;
};

function Signup({ setMethod }: SignupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay)
  const setIsAuthenticated = useSetRecoilState(Authentication);
  const networkManager = new NetworkManager();

  return (
    <div
      className={`w-screen h-screen flex flex-row items-center justify-center bg-[#F8F9D7]`}
    >
      <div className={`flex flex-col items-center w-1/3 shadow-md bg-white`}>
        <div className="flex flex-row items-center justify-center w-full bg-[#CEC9C8] py-3 rounded-tl-md rounded-tr-md">
          <p className={`font-rajdhani font-bold text-2xl text-black`}>
            Signup
          </p>
        </div>
        <div className={`w-full flex flex-col items-center py-6 px-6`}>
          {errorMessage && (
            <p
              className={`w-full text-center bg-red-300 rounded-sm py-1 font-rajdhani text-red-800 text-lg mb-2.5 border-red-800 border-[1px]`}
            >
              {errorMessage}
            </p>
          )}
          <p className={`font-rajdhani text-xl text-black`}>Username</p>
          <input
            type={"text"}
            value={username}
            placeholder={"Enter Username..."}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className={`font-rajdhani shadow-xl px-2 py-1.5 w-full rounded-sm`}
          />
          <p className={`font-rajdhani text-xl text-black mt-6`}>Password</p>
          <input
            type={"password"}
            value={password}
            placeholder={"Enter Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={`font-rajdhani shadow-xl px-2 py-1.5 w-full rounded-sm`}
          />
          <button
            className={`w-full py-2 bg-[#CEC9C8] text-black font-rajdhani font-medium rounded-sm mt-8`}
            onClick={async () => {
              setErrorMessage("");
              setShowOverlay(true)
              if (username.trim() === "" || password.trim() === "") {
                setErrorMessage("Please enter a valid username and password.");
                setShowOverlay(false)
                return;
              }
              const response = await networkManager.signupUser("/signup", {
                username,
                password,
              });
              if (response.status === globalConstants.status.FAILED) {
                setErrorMessage(response.clientMessage as string);
              } else {
                // @ts-ignore
                localStorage.setItem("jwt", response.data.jwt as string);
                setIsAuthenticated(true);
              }
              setShowOverlay(false)
            }}
          >
            Signup
          </button>
        </div>
        <div className={`w-full flex flex-row items-center justify-center`}>
          <div
            className={`flex flex-row items-center h-px w-5/12 bg-black`}
          ></div>
          <p className={`font-rajdhani text-2xl text-black mx-2`}>OR</p>
          <div
            className={`flex flex-row items-center h-px w-5/12 bg-black`}
          ></div>
        </div>
        <div className={`w-full px-6 pb-4`}>
          <button
            className={`w-full py-2 bg-blue-400 text-white font-rajdhani font-medium rounded-sm mt-8`}
            onClick={() => {
              setErrorMessage("");
              setMethod(globalConstants.method.LOGIN);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
