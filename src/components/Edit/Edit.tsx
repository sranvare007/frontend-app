// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { globalConstants } from "../../global";
import { NetworkManager } from "../../network/networkManager";
import { useSetRecoilState } from "recoil";
import { Overlay } from "../../state/atoms/overlay";

function EditStudentData() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [course, setCourse] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [averageCGPA, setAverageCGPA] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const { id } = useParams();

  const populateStudentDetails = async () => {
    setShowOverlay(true);
    const studentDetails = await networkManager.getStudentDetails(
      `/student/${id}`
    );
    const {
      firstName,
      middleName,
      lastName,
      admissionYear,
      course,
      emailId,
      phoneNumber,
      averageCGPA,
      photoUrl,
    } = JSON.parse(studentDetails.data);
    setFirstName(firstName);
    setMiddleName(middleName);
    setLastName(lastName);
    setAdmissionYear(admissionYear);
    setCourse(course);
    setEmailId(emailId);
    setPhoneNumber(phoneNumber);
    setAverageCGPA(averageCGPA);
    setPhotoUrl(photoUrl);
    setShowOverlay(false);
  };

  useEffect(() => {
    populateStudentDetails();
  }, []);

  const editStudentDetails = async () => {
    try {
      setShowOverlay(true);
      const response = await networkManager.editStudentDetails(
        `/student/${id}`,
        {
          firstName,
          middleName,
          lastName,
          admissionYear,
          course,
          emailId,
          phoneNumber,
          averageCGPA,
          photoUrl,
        }
      );
      if (response.status !== globalConstants.status.SUCCESS) {
        setError(response.serverMessage);
      } else {
        setSuccessMessage("Edited student details successfully");
      }
      setShowOverlay(false);
    } catch (error: any) {
      setError(error.message);
      setShowOverlay(false);
    }
  };

  const uploadImage = () => {
    if (photo == null) return;
    const fileName = v4();
    const imageRef = ref(storage, `images/${fileName}`);
    uploadBytes(imageRef, photo)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => setPhotoUrl(url));
      })
      .catch((err) => {
        console.log(err.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const getEditStudentForm = () => {
    return (
      <div
        className={`w-1/2 flex flex-col items-center justify-center font-rajdhani font-medium text-white`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editStudentDetails();
          }}
          className={`w-full`}
        >
          <fieldset
            className={`flex flex-col w-full items-center border-[1px] border-white px-6 rounded-md`}
          >
            <legend>Details:</legend>
            <label htmlFor="fname" className={`font-semibold`}>
              First name:
            </label>
            <br />
            <input
              type="text"
              id="fname"
              name="fname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="mname" className={`font-semibold`}>
              Middle name:
            </label>
            <br />
            <input
              type="text"
              id="mname"
              name="mname"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="lname" className={`font-semibold`}>
              Last name:
            </label>
            <br />
            <input
              type="text"
              id="lname"
              name="lname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="admYear" className={`font-semibold`}>
              Admission Year:
            </label>
            <br />
            <input
              type="number"
              id="admYear"
              name="admYear"
              value={admissionYear}
              onChange={(e) => {
                setAdmissionYear(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="course" className={`font-semibold`}>
              Course:
            </label>
            <br />
            <input
              type="text"
              id="course"
              name="course"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="averageCGPA" className={`font-semibold`}>
              Average CGPA
            </label>
            <br />
            <input
              type="number"
              id="averageCGPA"
              name="averageCGPA"
              value={averageCGPA}
              onChange={(e) => {
                setAverageCGPA(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="emailId" className={`font-semibold`}>
              Email Id:
            </label>
            <br />
            <input
              type="text"
              id="emailId"
              name="emailId"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="phoneNumber" className={`font-semibold`}>
              Phone Number:
            </label>
            <br />
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="photo" className={`font-semibold`}>
              Upload Photo:
            </label>
            <br />
            <div className={`flex flex-row items-center`}>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => {
                  e.preventDefault();
                  // @ts-ignore
                  setPhoto(e.target.files[0]);
                }}
                className={`w-1/2 border-blue-300 border-2 py-1 px-1 rounded-sm text-black`}
              />
              <button
                onClick={uploadImage}
                className={`ml-3 border-blue-300 px-2 py-2 hover:bg-blue-300 border-2 rounded-md`}
              >
                Upload
              </button>
              <img src={photoUrl} className={`h-48 w-48 ml-3`} alt="profile" />
            </div>
            <br />

            <input
              type="submit"
              value="Update"
              className={`w-3/4 py-2 mb-8 border-[1px] border-white cursor-pointer hover:bg-blue-300`}
              onClick={(e) => {
                e.preventDefault();
                setError("");
                setSuccessMessage("");
                if (
                  firstName.trim() === "" ||
                  lastName === "" ||
                  admissionYear === "" ||
                  course === ""
                ) {
                  setError("Please enter valid values");
                  return;
                }
                editStudentDetails();
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
      {getEditStudentForm()}
    </div>
  );
}

export default EditStudentData;
