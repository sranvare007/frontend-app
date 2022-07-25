import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { NetworkManager } from "../../network/networkManager";
import { Overlay } from "../../state/atoms/overlay";

type StudentDetails = {
  firstName: string;
  middleName: string;
  lastName: string;
  registrationId: number;
  course: string;
  admissionYear: number;
  averageCGPA: number;
  photoUrl: string;
};

function Profile() {
  const [studentInfo, setStudentInfo] = useState<StudentDetails>();
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const { id } = useParams();

  const fetchData = async () => {
    setShowOverlay(true);
    const response = await networkManager.getStudentDetails(`/student/${id}`);
    // @ts-ignore
    setStudentInfo(JSON.parse(response.data));
    setShowOverlay(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentInfoView = () => {
    return (
      <div className={`flex flex-row items-center justify-between`}>
        <div
          className={`flex flex-col font-rajdhani font-bold text-base text-white`}
        >
          <p>
            Registration id:{" "}
            <span className={`font-medium`}>{studentInfo?.registrationId}</span>
          </p>
          <p>
            Name:{" "}
            <span className={`font-medium`}>
              {studentInfo?.firstName} {studentInfo?.middleName}{" "}
              {studentInfo?.lastName}
            </span>
          </p>
          <p>
            Course: <span className={`font-medium`}>{studentInfo?.course}</span>
          </p>
          <p>
            Admission Year:{" "}
            <span className={`font-medium`}>{studentInfo?.admissionYear}</span>
          </p>
          <p>
            Average CGPA:{" "}
            <span className={`font-medium`}>{studentInfo?.averageCGPA}</span>
          </p>
        </div>
        <img
          src={studentInfo?.photoUrl}
          className={`w-48 h-48`}
          alt={"profile"}
        />
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col w-full h-full bg-blue-400 mt-16 pt-6 px-4 rounded-t-3xl`}
    >
      {getStudentInfoView()}
    </div>
  );
}

export default Profile;
