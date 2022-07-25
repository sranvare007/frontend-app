import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  MaterialSymbolsAccountBalance,
  MaterialSymbolsLogout,
} from "../../atoms/icons";
import { Authentication } from "../../state/atoms/authentication";

function Navbar() {
  const setIsAuthenticated = useSetRecoilState(Authentication);
  return (
    <div
      className={`w-full flex flex-row items-center px-6 py-3 bg-blue-400 text-white font-rajdhani font-semibold`}
    >
      <div className={`w-full flex flex-row items-center justify-between`}>
        <Link to={"/info"}>
          <div className={`flex flex-row items-center cursor-pointer`}>
            <MaterialSymbolsAccountBalance height="24px" width="24px" />
            <p className={`ml-4`}>T&P Cell Database management</p>
          </div>
        </Link>
        <div className={`flex flex-row items-center`}>
          <Link to={`/add`}>
            <span className={`hover:opacity-80 cursor-pointer px-4`}>
              Add Data
            </span>
          </Link>
          <Link to={`/info`}>
            <span className={`hover:opacity-80 cursor-pointer px-4`}>
              Manage Data
            </span>
          </Link>
          <Link to={`/eligible`}>
            <span className={`hover:opacity-80 cursor-pointer px-4`}>
              Get eligible candidates
            </span>
          </Link>
          <Link to={`/upcoming`}>
            <span className={`hover:opacity-80 cursor-pointer px-4`}>
              List upcoming drives
            </span>
          </Link>
          <Link to={`/email`}>
            <span className={`hover:opacity-80 cursor-pointer px-4`}>
              Send out emails
            </span>
          </Link>
          <div
            className={`flex flex-row items-center hover:opacity-80 cursor-pointer`}
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("jwt");
            }}
          >
            <p className={`mr-2`}>Logout</p>
            <MaterialSymbolsLogout height="24" width="24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
