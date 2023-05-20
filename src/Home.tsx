import "./Home.css";
import "./Select.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectYear from "./SelectYear";
import DragDropZone from "./DragDropZone";
import SelectCountry from "./SelectCountry";
import Email from "./Email";

type HomeProps = {
  loginEmail: string;
};

function Home({ loginEmail }: HomeProps) {

    const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState<string>("");
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };
  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const handleEmailValidation = (validation: boolean) => {
    setEmailIsValid(validation);
  };

  const [isFileProcessed, setFileProcessed] = useState<boolean>(false);
  const handleFileProcessing = (isFileProcessed: boolean) => {
    setFileProcessed(isFileProcessed);
  };

  const [uploadError, setUploadError] = useState<boolean>(false);
  const handleFileUploadError = (uploadError: boolean) => {
    setUploadError(uploadError);
    setTimeout(() => {
      setUploadError(!uploadError);
    }, 2500);
  };


  const [submittedFile, setSubmittedFile] = useState<File | undefined>();
  const handleFileSubmission = async (file: File) => {
    setSubmittedFile(file);
  };

  const [isFileProcessing, setFileProcessing] = useState<boolean>(false);

  const clearForm = () => {
    setFileProcessing(false);
    handleFileProcessing(!isFileProcessed);
    setEmail("");
    handleYearChange("");
    handleFileSubmission(null);
  };

  const fileSubmission = async (file: File) => {
    const formData = new FormData();
    formData.append("year", selectedYear);
    formData.append("country", selectedCountry);
    formData.append("email", email);
    formData.append("file", file);

    setFileProcessing(true);

    await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) handleFileUploadError(true);
        else
          response.json().then((data) => {
            console.log(data);
            navigate("/waiting");
          });
      })
      .then(() => clearForm());
  };

  useEffect(() => {
    if (
      submittedFile &&
      (!selectedYear || !selectedCountry || !email || !emailIsValid)
    )
      handleFileUploadError(true);
    else if (submittedFile) fileSubmission(submittedFile);
  }, [submittedFile]);

  return (
    <div className="Home">
      {isFileProcessing && (
        <div className="LoadingDots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
      <div
        className={`SelectContainer ${
          isFileProcessing ? "Select-Container-Low-Opacity" : ""
        }`}
      >
        <SelectYear
          onYearChange={handleYearChange}
          isFileProcessed={isFileProcessed}
          isFileProcessing={isFileProcessing}
        />
        <SelectCountry
          onCountryChange={handleCountryChange}
          isFileProcessed={isFileProcessed}
          isFileProcessing={isFileProcessing}
        />
        <Email
          onEmailChange={handleEmailChange}
          onEmailValidation={handleEmailValidation}
          loginEmail={loginEmail}
          isFileProcessed={isFileProcessed}
          isFileProcessing={isFileProcessing}
        />
      </div>
      <DragDropZone
        onFileSubmitted={handleFileSubmission}
        isFileProcessing={isFileProcessing}
        uploadError={uploadError}
      />
    </div>
  );
}

export default Home;
