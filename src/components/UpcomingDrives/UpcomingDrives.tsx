import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { NetworkManager } from "../../network/networkManager";
import { Overlay } from "../../state/atoms/overlay";

type DriveDetails = {
  id: number;
  companyName: string;
  rolesHiring: [string];
  eligibilityCriteria: string;
  ctcProvided: number;
};

function UpcomingDrives() {
  const [upcomingDrives, setUpcomingDrives] = useState<DriveDetails[]>([]);
  const [error, setError] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay)
  const networkManager = new NetworkManager();

  const fetchRecruitmentList = async () => {
    try {
      setShowOverlay(true)
      const response = await networkManager.getRecruitmentList("/recruitment");
      // @ts-ignore
      setUpcomingDrives(response.data.recruitment);
      setShowOverlay(false)
    } catch (error: any) {
      setError(error.message);
      setShowOverlay(false)
    }
  };

  useEffect(() => {
    fetchRecruitmentList();
  }, []);

  const getUpcomingDrivesListView = () => {
    if (upcomingDrives.length === 0) {
      return (
        <div className={`w-full h-full flex justify-center items-center`}>
          <p className={`font-rajdhani font-bold text-xl text-white`}>
            No data available!
          </p>
        </div>
      );
    } else {
      return (
        <div
          className={`w-full h-full flex flex-col font-rajdhani font-medium text-white`}
        >
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
            <div
              className={`grid grid-cols-12 py-2.5 items-center border-b-[1px] border-white`}
              key={index}
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
                <p className={`text-center`}>{item.ctcProvided}</p>
              </div>
            </div>
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
