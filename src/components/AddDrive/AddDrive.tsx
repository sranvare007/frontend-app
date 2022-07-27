import React, { useState } from "react";
import { globalConstants } from "../../global";
import { NetworkManager } from "../../network/networkManager";
import { useSetRecoilState } from "recoil";
import { Overlay } from "../../state/atoms/overlay";

function AddDriveDetails() {
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rolesHiring, setRolesHiring] = useState("");
  const [eligibilityCriteria, setEligibilityCriteria] = useState("");
  const [minCtcProvided, setMinCtcProvided] = useState("");
  const [maxCtcProvided, setMaxCtcProvided] = useState("");
  const [batchRecruitingFor, setBatchRecruitingFor] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const addDriveDetails = async () => {
    try {
      setShowOverlay(true);
      const response = await networkManager.insertRecruitmentDetails(
        "/recruitment",
        {
          id,
          companyName,
          rolesHiring,
          eligibilityCriteria,
          minCtcProvided,
          maxCtcProvided,
          batchRecruitingFor,
          jobLocation,
          minCGPA,
        }
      );
      if (response.status !== globalConstants.status.SUCCESS) {
        setError(response.serverMessage);
      } else {
        setSuccessMessage("Inserted drive details successfully");
      }
      setShowOverlay(false);
    } catch (error: any) {
      setError(error.message);
      setShowOverlay(false);
    }
  };

  const getAddDriveDetailsForm = () => {
    return (
      <div
        className={`w-1/2 flex flex-col items-center justify-center font-rajdhani font-medium text-white`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addDriveDetails();
          }}
          className={`w-full`}
        >
          <fieldset
            className={`flex flex-col w-full items-center border-[1px] border-white px-6 rounded-md`}
          >
            <legend>Details:</legend>
            <label htmlFor="Id" className={`font-semibold`}>
              Registration Id<sup>*</sup> :
            </label>
            <br />
            <input
              type="number"
              id="Id"
              name="Id"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <label htmlFor="companyName" className={`font-semibold mt-2`}>
              Company Name<sup>*</sup> :
            </label>
            <br />
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <label htmlFor="roles" className={`font-semibold mt-2`}>
              Roles Hiring for<sup>*</sup> :
            </label>
            <br />
            <input
              type="text"
              id="roles"
              name="roles"
              value={rolesHiring}
              onChange={(e) => {
                setRolesHiring(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <label htmlFor="eligibility" className={`font-semibold  mt-2`}>
              Eligibility Criteria<sup>*</sup> :
            </label>
            <br />
            <input
              type="text"
              id="eligibility"
              name="eligibility"
              value={eligibilityCriteria}
              onChange={(e) => {
                setEligibilityCriteria(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <br />
            <label htmlFor="minCtc" className={`font-semibold  mt-2`}>
              Min CTC Provided<sup>*</sup> :
            </label>
            <br />
            <input
              type="number"
              id="minCtc"
              name="minCtc"
              value={minCtcProvided}
              onChange={(e) => {
                setMinCtcProvided(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <label htmlFor="maxCtc" className={`font-semibold  mt-2`}>
              Max CTC Provided<sup>*</sup> :
            </label>
            <br />
            <input
              type="text"
              id="maxCtc"
              name="maxCtc"
              value={maxCtcProvided}
              onChange={(e) => {
                setMaxCtcProvided(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <label htmlFor="batchRecruiting" className={`font-semibold  mt-2`}>
              Batch Recruiting For<sup>*</sup> :
            </label>
            <br />
            <input
              type="number"
              id="batchRecruiting"
              name="batchRecruiting"
              value={batchRecruitingFor}
              onChange={(e) => {
                setBatchRecruitingFor(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <label htmlFor="jobLocations" className={`font-semibold  mt-2`}>
              Job Locations<sup>*</sup> :
            </label>
            <br />
            <input
              type="text"
              id="jobLocations"
              name="jobLocations"
              value={jobLocation}
              onChange={(e) => {
                setJobLocation(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <label htmlFor="minCGPA" className={`font-semibold  mt-2`}>
              Min CGPA required<sup>*</sup> :
            </label>
            <br />
            <input
              type="text"
              id="minCGPA"
              name="minCGPA"
              value={minCGPA}
              onChange={(e) => {
                setMinCGPA(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />
            <br />
            <input
              type="submit"
              value="Submit"
              className={`w-3/4 py-2 my-8 border-[1px] border-white cursor-pointer hover:bg-blue-300`}
              onClick={(e) => {
                e.preventDefault();
                setError("");
                setSuccessMessage("");
                if (
                  companyName.trim() === "" ||
                  eligibilityCriteria.trim() === "" ||
                  rolesHiring.trim() === "" ||
                  minCtcProvided.trim() === "" ||
                  maxCtcProvided.trim() === "" ||
                  jobLocation.trim() === ""
                ) {
                  setError("Please enter valid values");
                  return;
                }
                addDriveDetails();
              }}
            />
          </fieldset>
        </form>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col items-center w-full bg-blue-400 mt-16 py-10 px-4 rounded-t-3xl`}
    >
      {error && (
        <div
          className={`w-1/3 flex flex-row justify-center px-6 py-2 border-red-800 bg-red-300 mb-2`}
        >
          <p className={`text-center font-rajdhani font-semibold text-red-800`}>
            {error}
          </p>
        </div>
      )}
      {successMessage && (
        <div
          className={`w-1/3 flex flex-row justify-center px-6 py-2 border-[1px] rounded-md border-green-800 bg-green-200 mb-2`}
        >
          <p
            className={`text-center font-rajdhani font-semibold text-green-800`}
          >
            {successMessage}
          </p>
        </div>
      )}
      {getAddDriveDetailsForm()}
    </div>
  );
}

export default AddDriveDetails;
