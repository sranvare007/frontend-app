import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { NetworkManager } from "../../network/networkManager";
import { Overlay } from "../../state/atoms/overlay";

type RecruitmentDetailsType = {
  id: String;
  companyName: String;
  rolesHiring: String;
  eligibilityCriteria: String;
  minCtcProvided: String;
  maxCtcProvided: String;
  batchRecruitingFor: String;
  jobLocation: String;
  minCGPA: String;
};

function RecruitmentDetails() {
  const [recruitmentInfo, setRecruitmentInfo] =
    useState<RecruitmentDetailsType>();
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const { id } = useParams();

  const fetchData = async () => {
    setShowOverlay(true);
    const response = await networkManager.getRecruitmentDetails(
      `/recruitment/${id}`
    );
    // @ts-ignore
    setRecruitmentInfo(JSON.parse(response.data));
    setShowOverlay(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRecruitmentInfoView = () => {
    return (
      <div className={`flex flex-row items-center justify-between`}>
        <div
          className={`flex flex-col font-rajdhani font-bold text-base text-white ml-10`}
        >
          <ul className={`list-disc`}>
            <li>
              <p className={`my-2.5`}>
                Id: <span className={`font-medium`}>{recruitmentInfo?.id}</span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Company Name:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.companyName}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Eligibility Criteria:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.eligibilityCriteria}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Roles Hiring:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.rolesHiring}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Minimum CTC:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.minCtcProvided}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Max CTC:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.maxCtcProvided}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Batch Recruiting for:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.batchRecruitingFor}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Job Location:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.jobLocation}
                </span>
              </p>
            </li>
            <li>
              <p className={`my-2.5`}>
                Min CGPA:{" "}
                <span className={`font-medium`}>
                  {recruitmentInfo?.minCGPA}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col w-full h-full bg-blue-400 mt-16 pt-6 px-4 rounded-t-3xl`}
    >
      {getRecruitmentInfoView()}
    </div>
  );
}

export default RecruitmentDetails;
