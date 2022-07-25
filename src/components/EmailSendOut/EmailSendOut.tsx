import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Loader from "../../atoms/Loader";
import { NetworkManager } from "../../network/networkManager";
import { Overlay } from "../../state/atoms/overlay";

function EmailSendOut() {
  const [admissionYear, setAdmissionYear] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailText, setEmailText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [ctcOffered, setCtcOffered] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const setShowOverlay = useSetRecoilState(Overlay);
  const networkManager = new NetworkManager();

  const sendOutEmail = async () => {
    try {
      setShowOverlay(true);
      const htmlText = `<div style="font-family:Verdana">
      <h1>Upcoming drive for ${companyName}</h1>
      <p>Dear Student,</p>
      <p>We are please to inform you that we have an upcoming recruitment drive for ${companyName} for the role of Software developer on ${date}. The offered CTC is ${ctcOffered} and eligibility for the recruitment is as follows:</p>
      <p>${eligibility}</p>
      <p>Thanks and Regards,</p>
      <p>TPO</p></div>`;
      const response = await networkManager.sendOutEmail("/mail", {
        admissionYear,
        emailSubject,
        emailText,
        htmlText,
      });
      if (response.status !== "SUCCESS") {
        setError(response.serverMessage);
        setShowOverlay(false);
      } else {
        setSuccessMessage("Sent out mail successfully.");
        setShowOverlay(false);
      }
    } catch (error: any) {
      setError(error.message);
      setShowOverlay(false);
    }
  };

  const getEmailInput = () => {
    return (
      <div
        className={`w-1/2 flex flex-col items-center justify-center font-rajdhani font-medium text-white`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendOutEmail();
          }}
          className={`w-full`}
        >
          <fieldset
            className={`flex flex-col w-full items-center border-[1px] border-white px-6 rounded-md`}
          >
            <legend>Email Details:</legend>
            <label htmlFor="admYear" className={`font-semibold`}>
              Admission Year:
            </label>
            <br />
            <input
              type="text"
              id="admYear"
              name="admYear"
              value={admissionYear}
              onChange={(e) => {
                setAdmissionYear(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="subject" className={`font-semibold`}>
              Subject:
            </label>
            <br />
            <input
              type="text"
              id="subject"
              name="subject"
              value={emailSubject}
              onChange={(e) => {
                setEmailSubject(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="emailText" className={`font-semibold`}>
              Email Text:
            </label>
            <br />
            <input
              type="text"
              id="emailText"
              name="emailText"
              value={emailText}
              onChange={(e) => {
                setEmailText(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="companyName" className={`font-semibold`}>
              Company Name:
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

            <label htmlFor="ctcOffered" className={`font-semibold`}>
              CTC Offered:
            </label>
            <br />
            <input
              type="text"
              id="ctcOffered"
              name="ctcOffered"
              value={ctcOffered}
              onChange={(e) => {
                setCtcOffered(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="eligibility" className={`font-semibold`}>
              Eligibility:
            </label>
            <br />
            <input
              type="text"
              id="eligibility"
              name="eligibility"
              value={eligibility}
              onChange={(e) => {
                setEligibility(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <label htmlFor="date" className={`font-semibold`}>
              Date:
            </label>
            <br />
            <input
              type="text"
              id="date"
              name="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className={`w-3/4 rounded-sm py-1 px-4 text-black`}
            />
            <br />

            <input
              type="submit"
              value="Submit"
              className={`w-3/4 py-2 mb-8 border-[1px] border-white cursor-pointer hover:bg-blue-300`}
              onClick={(e) => {
                e.preventDefault();
                setError("");
                setSuccessMessage("");
                if (
                  emailSubject.trim() === "" ||
                  emailText === "" ||
                  admissionYear === ""
                ) {
                  setError("Please enter valid values");
                  return;
                }
                sendOutEmail();
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
      {getEmailInput()}
    </div>
  );
}

export default EmailSendOut;
