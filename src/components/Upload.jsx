import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);

  const handleFileChange = async (e) => {
    setResult(null)
    setUploading(true);
    const file = e.target.files[0];
    setImage(file)
    if (file) {
      try {
        const storageRef = ref(storage, `photos/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        console.log("done", imageUrl);
        setImageURL(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImageDiagnose = async (e) => {
    setResult(null)
    e.preventDefault();
    setDiagnosing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result.split(",")[1];
      try {
        const response = await axios.post("https://susya.onrender.com", {
          image: base64Image,
        });
        console.log(response.data);
        const { disease, plant, remedy } = response.data;
        setResult({ disease, plant, remedy });

        // Determine whether the plant is infected or healthy
        const status = disease ? "Infected" : "Healthy";
        setResult((prevResult) => ({ ...prevResult, status }));
      } catch (error) {
        console.error("Error diagnosing image:", error);
      } finally {
        setDiagnosing(false);
      }
    };
    reader.readAsDataURL(image);
  };

  // download report as text file
  const downloadReport = () => {
    const blob = new Blob([`Status: ${result.status}\nDisease: ${result.disease}\nPlant: ${result.plant}\nRemedy: ${result.remedy}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnosis-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // URL for additional tips based on the disease
  const getTipsUrl = (disease) => {
    if (disease) {
      return `https://www.apsnet.org/edcenter/disimpactmngmnt/topc/EpidemiologyTemporal/Pages/ManagementStrategies.aspx`; // Replace with actual URLs
    } else {
      return 'https://www.elitetreecare.com/2021/02/maintaining-plant-health-tips/'; 
    }
  };

  return (
    <section className="md:w-[80%] font-mulish w-[90%] mx-auto my-20 rounded-sm shadow-lg bg-white">
      <div className="relative">
        <span className="mx-auto z-[0] bg-[#F7FAFE] block md:block hidden rounded-md h-[67px] w-[259px]"></span>
        <h1 className="text-center font-roboto absolute top-0 left-1/2 transform -translate-x-1/2 md:text-[40px] z-60 mx-auto text-[18px] font-[700]">
          Upload a Picture
        </h1>
      </div>

      <div className="text-[#111111] font-[500] space-y-8 py-10 px-5">
        <h3 className="text-[20px] md:text-[25px]">Your Crop / Plant Health Report</h3>
        <p className="text-[18px] font-[400]">
          Based on the image you provided, here are the details of your crop's health status.
        </p>
        <div
          style={{
            backgroundImage: imageURL ? `url(${imageURL})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="bg-[#F6F7F9] md:w-[483px] h-[205px] flex items-center">
          <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileUpload"
            className="border cursor-pointer w-[40%] mx-auto text-center">
            <span className="mx-auto block border border-[#90BFA8] rounded-[6px] text-[#90BFA8] shadow-lg py-4 px6">
              {uploading
                ? "Uploading..."
                : imageURL
                ? "Change Image"
                : "Upload Image"}
            </span>
          </label>
        </div>
        <button
          onClick={handleImageDiagnose}
          className="font-roboto rounded-lg text-white px-10 py-3 bg-primary"
          disabled={diagnosing}>
          {diagnosing ? "Diagnosing..." : "Diagnose"}
        </button>
      </div>
      {result && (
        <div className="mx-5 p-5 rounded-lg shadow-lg">
          <h3 className="text-[20px] md:text-[25px] font-bold mb-4">Diagnosis Result</h3>
          <ol className="mb-4 space-y-4 list-decimal list-inside ml-3">
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Status</p>{" "}
              <small
                className={
                  result.status === "Infected"
                    ? "text-red-600 block ml-5"
                    : "text-green-600 block ml-5"
                }>
                {result.status}
              </small>
            </li>
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Disease</p>
              <small className="block ml-5">{result.disease ? result.disease : "None"}</small>
            </li>
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Plant</p>
              <small className="block ml-5">{result.plant}</small>
            </li>
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Remedy</p>
              <small className="block ml-5">{result.remedy}</small>
            </li>
          </ol>
          {result.status === "Infected" && (
            <div className="p-4 bg-red-100 border border-red-400 rounded-md">
              <h4 className="font-bold text-red-700">Infection Alert!</h4>
              <p>{result.remedy}</p>
            </div>
          )}
          <div className="mt-5 flex space-x-4">
            <button
              onClick={downloadReport}
              className="px-10 py-4 bg-primary font-bold text-white rounded-md shadow-md"
            >
              Download Report
            </button>
            <a
              href={getTipsUrl(result.disease)}
              className="px-6 py-2 bg-white text-primary flex items-center  rounded-md border border-primary text-white rounded-md shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get More Tips
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Upload;
