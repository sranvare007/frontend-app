import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { MaterialSymbolsDelete, MaterialSymbolsEdit } from "../../atoms/icons";
import Loader from "../../atoms/Loader";
import { NetworkManager } from "../../network/networkManager";
import { Overlay } from "../../state/atoms/overlay";

type StudentDetails = {
  firstName: string;
  middleName: string;
  lastName: string;
  registrationId: number;
  course: string;
  admissionYear: number;
};

function Eligible() {
  const [studentList, setStudentList] = useState<StudentDetails[]>([]);
  const [deleteError, setDeleteError] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const fetchData = async () => {
    setShowOverlay(true);
    let response;

    if (minCGPA) {
      response = await networkManager.getStudentList(
        `student?minCGPA=${minCGPA}`
      );
    } else {
      response = await networkManager.getStudentList("student");
    }
    // @ts-ignore
    setStudentList(response.data.students);
    setShowOverlay(false);
  };

  const deleteStudentDetails = async (registrationId: number) => {
    try {
      setShowOverlay(true);

      const response = await networkManager.deleteStudentDetails(
        `student/${registrationId}`
      );
      fetchData();
      if (response.status !== "200") {
        setDeleteError(response.clientError);
        setShowOverlay(false);
      }
    } catch (error: any) {
      setDeleteError(error.message);
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentListView = () => {
    if (studentList.length === 0) {
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
              <p className={`text-center`}>Registration Id</p>
            </div>
            <div className={`col-start-2 col-end-7`}>
              <p className={`text-center`}>Name</p>
            </div>
            <div className={`col-start-7 col-end-8`}>
              <p className={`text-center`}>Year</p>
            </div>
            <div className={`col-start-8 col-end-11`}>
              <p className={`text-center`}>Course</p>
            </div>
            <div className={`col-start-11 col-end-12`}>
              <p className={`text-center`}>Edit</p>
            </div>
            <div className={`col-start-12 col-end-13`}>
              <p className={`text-center`}>Delete</p>
            </div>
          </div>
          {studentList.map((item, index) => (
            <Link to={`/info/${item.registrationId}`} key={index}>
              <div
                className={`grid grid-cols-12 py-2.5 items-center border-b-[1px] border-white hover:bg-blue-300 cursor-pointer`}
              >
                <div className={`col-start-1 col-end-2`}>
                  <p className={`text-center`}>{item.registrationId}</p>
                </div>
                <div className={`col-start-2 col-end-7`}>
                  <p className={`text-center`}>{`${item.firstName} ${
                    item.middleName != null ? item.middleName : ""
                  } ${item.lastName}`}</p>
                </div>
                <div className={`col-start-7 col-end-8`}>
                  <p className={`text-center`}>{item.admissionYear}</p>
                </div>
                <div className={`col-start-8 col-end-11`}>
                  <p className={`text-center`}>{item.course}</p>
                </div>
                <div
                  className={`col-start-11 col-end-12 flex flex-row justify-center`}
                >
                  <Link to={`/edit/${item.registrationId}`}>
                    <MaterialSymbolsEdit height="25" width="25" />
                  </Link>
                </div>
                <div
                  className={`col-start-12 col-end-13 flex flex-row justify-center`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteStudentDetails(item.registrationId);
                  }}
                >
                  <div className={`cursor-pointer`}>
                    <MaterialSymbolsDelete height="25" width="25" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };
  const getFilterFieldView = () => {
    return (
      <form
        onSubmit={fetchData}
        className={`w-full mb-6 flex flex-row justify-end`}
      >
        <fieldset
          className={`flex flex-col w-1/4 items-center border-[1px] border-white px-6 rounded-md  text-white font-rajdhani`}
        >
          <legend>Details:</legend>
          <label htmlFor="minCGPA" className={`font-semibold`}>
            Enter value for minimum CGPA required:
          </label>
          <br />
          <input
            type="number"
            id="minCGPA"
            name="minCGPA"
            value={minCGPA}
            onChange={(e) => {
              setMinCGPA(e.target.value);
            }}
            className={`w-3/4 rounded-sm py-1 px-4 text-black`}
          />
          <br />

          <input
            type="submit"
            value="Submit"
            className={`w-3/4 py-2 mb-8 border-[1px] rounded-md border-white cursor-pointer hover:bg-blue-300`}
            onClick={(e) => {
              e.preventDefault();
              fetchData();
            }}
          />
        </fieldset>
      </form>
    );
  };

  return (
    <div
      className={`flex flex-col w-full h-full bg-blue-400 mt-16 pt-6 px-4 rounded-t-3xl`}
    >
      <>
        {deleteError && (
          <div
            className={`w-1/3 flex flex-row justify-center px-6 py-2 border-red-800 bg-red-300 mb-2`}
          >
            <p
              className={`text-center font-rajdhani font-semibold text-red-800`}
            >
              {deleteError}
            </p>
          </div>
        )}
        {getFilterFieldView()}
        {getStudentListView()}
      </>
    </div>
  );
}

export default Eligible;
