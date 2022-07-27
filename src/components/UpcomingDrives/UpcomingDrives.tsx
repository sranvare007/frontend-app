import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { NetworkManager } from "../../network/networkManager";
import { Overlay } from "../../state/atoms/overlay";

type DriveDetails = {
  id: number;
  companyName: string;
  rolesHiring: [string];
  eligibilityCriteria: string;
  minCtcProvided: number;
  maxCtcProvided: number;
};

function UpcomingDrives() {
  const [upcomingDrives, setUpcomingDrives] = useState<DriveDetails[]>([]);
  const [error, setError] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const fetchRecruitmentList = async () => {
    try {
      setShowOverlay(true);
      const response = await networkManager.getRecruitmentList("/recruitment");
      // @ts-ignore
      setUpcomingDrives(response.data.recruitment);
      setShowOverlay(false);
    } catch (error: any) {
      setError(error.message);
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    fetchRecruitmentList();
  }, []);

  const getUpcomingDrivesListView = () => {
    if (upcomingDrives.length === 0) {
      return (
        <div className={`w-full h-full flex justify-center items-center`}>
          <div className={`flex flex-col`}>
            <p className={`font-rajdhani font-bold text-xl text-white`}>
              No data available!
            </p>
            <div
              className={`flex flex-row items-center justify-end mr-4 mb-4 font-rajdhani text-white mt-4`}
            >
              <Link to={"/add-recruitment"}>
                <button
                  className={`w-max rounded-md px-4 py-2.5 border border-white hover:bg-blue-300`}
                >
                  Add details
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`w-full h-full flex flex-col font-rajdhani font-medium text-white`}
        >
          <div className={`flex flex-row items-center justify-end mr-4 mb-4`}>
            <Link to={"/add-recruitment"}>
              <button
                className={`w-max rounded-md px-4 py-2.5 border border-white hover:bg-blue-300`}
              >
                Add details
              </button>
            </Link>
          </div>
          <div
            className={`grid grid-cols-12 py-2 items-center font-bold text-base mb-2`}
          >
            <div className={`col-start-1 col-end-2`}>
              <p className={`text-center`}>Id</p>
            </div>
            <div className={`col-start-2 col-end-6`}>
              <p className={`text-center`}>Company Name</p>
            </div>
            <div className={`col-start-6 col-end-8`}>
              <p className={`text-center`}>Roles Hiring</p>
            </div>
            <div className={`col-start-8 col-end-12`}>
              <p className={`text-center`}>Eligibility</p>
            </div>
            <div className={`col-start-12 col-end-13`}>
              <p className={`text-center`}>CTC</p>
            </div>
          </div>
          {upcomingDrives.map((item, index) => (
            <Link to={`/recruitment-info/${item.id}`} key={index}>
              <div
                className={`grid grid-cols-12 py-2.5 items-center border-b-[1px] border-white hover:bg-blue-300`}
              >
                <div className={`col-start-1 col-end-2`}>
                  <p className={`text-center`}>{item.id}</p>
                </div>
                <div className={`col-start-2 col-end-6`}>
                  <p className={`text-center`}>{item.companyName}</p>
                </div>
                <div className={`col-start-6 col-end-8`}>
                  <p className={`text-center`}>{item.rolesHiring.join(", ")}</p>
                </div>
                <div className={`col-start-8 col-end-12`}>
                  <p className={`text-center`}>{item.eligibilityCriteria}</p>
                </div>
                <div
                  className={`col-start-12 col-end-13 flex flex-row justify-center`}
                >
                  <p className={`text-center`}>
                    {item.minCtcProvided} - {item.maxCtcProvided}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full bg-blue-400 mt-16 py-10 px-4 rounded-t-3xl h-full`}
    >
      {getUpcomingDrivesListView()}
    </div>
  );
}

export default UpcomingDrives;
